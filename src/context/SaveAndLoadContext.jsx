import {
  collection,
  setDoc,
  doc,
  addDoc,
  getDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useStore } from "../store/Store";
import { shallow } from "zustand/shallow";
import { useAuth } from "./AuthContext";

const selector = (store) => ({
  saveProject: store.saveProject,
  reset: store.reset,
  createNodeFromData: store.createNodeFromData,
  createEdgeFromData: store.createEdgeFromData,
});

const DataContext = createContext({
  saveData: () => {},
  loadData: () => {},
  setName: () => {},
  projectName: "",
  project: {},
  seeFiles: false,
  setSeeFiles: () => {},
  loadProject: () => {},
  removeProject: () => {},
});

const SaveAndLoadProvider = ({ children }) => {
  const store = useStore(selector, shallow);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState({ date: "", name: "" });
  const [projects, setProjects] = useState([]);
  const [seeFiles, setSeeFiles] = useState(false);
  const { user } = useAuth();

  // Sauvegarde des données dans la base de données
  const saveDataDB = async () => {
    if (projectName === "") {
      if (
        window.confirm("Voulez-vous vraiment sauvegarder ce projet sans nom ?")
      ) {
        const data = JSON.stringify(store.saveProject());
        const doc = await addDoc(collection(db, "projects"), {
          name:
            projectName === ""
              ? "Nouveau Projet" + " " + new Date().toLocaleDateString()
              : projectName,
          content: data,
          date:
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString(),
          userID: user.uid,
        });
        setProject({ id: doc.id, name: projectName });

        setProjects([
          ...projects,
          {
            id: doc.id,
            name:
              projectName === " "
                ? "Nouveau Projet" + " " + new Date().toLocaleDateString()
                : projectName,
          },
        ]);
      }
    }
  };
  const setName = (name) => {
    setProjectName(name);
  };

  // fetch des projets de l'utilisateur au clic sur le bouton
  const loadDataDB = async () => {
    const fetchData = async () => {
      //   const maCollection = await getDoc(doc(db, "projects", project.id));

      await store.reset();
      await data.nodes.forEach((node) => {
        console.log(node);
        store.createNodeFromData(node);
      });
      await data.edges.forEach((edge) => {
        store.createEdgeFromData(edge);
      });
    };
    fetchData();
  };

  const loadProject = async (id) => {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setProject({ id, name: data.name });
      await store.reset();
      await JSON.parse(data.content).nodes.forEach((node) => {
        store.createNodeFromData(node);
      });
      await JSON.parse(data.content).edges.forEach((edge) => {
        store.createEdgeFromData(edge);
      });
    } else {
      console.log("No such document!");
    }
  };

  const removeProject = async (id) => {
    if (id === undefined) return;
    if (window.confirm("Voulez-vous vraiment supprimer ce projet ?")) {
      await deleteDoc(doc(db, "projects", id));
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  // fetch des projets de l'utilisateur au chargement de la page
  useEffect(() => {
    if (user === null || user === undefined) return;
    const fetchProjects = async () => {
      const collectionRef = collection(db, "projects");
      const q = query(collectionRef, where("userID", "==", user?.uid));
      const querySnapshot = await getDocs(q);
      let projects = [];
      querySnapshot.forEach((doc) => {
        const { name, date } = doc.data();
        projects.push({ id: doc.id, name, date });
      });
      setProjects(projects);
      console.log(projects);
    };
    fetchProjects();
  }, [user]);

  const saveData = () => {
    if (projectName === "") {
      setProjectName("Nouveau Projet" + " " + new Date().toLocaleDateString());
    }
    saveDataDB();
  };

  return (
    <DataContext.Provider
      value={{
        saveData,
        loadDataDB,
        setName,
        projectName,
        project,
        projects,
        seeFiles,
        setSeeFiles,
        loadProject,
        removeProject,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useSaveAndLoad = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error(
      "useSaveAndLoad must be used within an SaveAndLoadProvider"
    );
  }
  return context;
};

export { SaveAndLoadProvider, useSaveAndLoad };
