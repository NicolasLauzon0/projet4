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
  toggleVolume: store.toggleVolume,
  isRunning: store.isRunning,
  loadProject: store.loadProject,
});

const DataContext = createContext({
  saveData: () => {},
  setName: () => {},
  project: {},
  seeFiles: false,
  setSeeFiles: () => {},
  loadProject: () => {},
  removeProject: () => {},
});

const SaveAndLoadProvider = ({ children }) => {
  const store = useStore(selector, shallow);
  const [project, setProject] = useState({
    name: "",
    id: "",
    date: "",
  });
  const [projects, setProjects] = useState([]);
  const [seeFiles, setSeeFiles] = useState(false);
  const { user } = useAuth();
  // Sauvegarde des données dans la base de données
  const saveDataDB = async () => {
    if (project.name === "") {
      if (store.isRunning) {
        await store.toggleVolume();
      }
      if (
        window.confirm("Voulez-vous vraiment sauvegarder ce projet sans nom ?")
      ) {
        const data = JSON.stringify(store.saveProject());
        const name =
          project.name === ""
            ? "Nouveau Projet" + " " + new Date().toLocaleDateString()
            : project.name;
        const date =
          new Date().toLocaleDateString() +
          " " +
          new Date().toLocaleTimeString();
        const doc = await addDoc(collection(db, "projects"), {
          name: name,
          content: data,
          date: date,
          userID: user.uid,
        });
        setProject({
          ...project,
          id: doc.id,
          name: name,
          date: date,
        });
        setProjects(projects.concat({ id: doc.id, name: name, date: date }));

        await store.toggleVolume();
      } else {
        await store.toggleVolume();
        return;
      }
    } else {
      await store.toggleVolume();
      const data = JSON.stringify(store.saveProject());
      const name =
        project.name === ""
          ? "Nouveau Projet" + " " + new Date().toLocaleDateString()
          : project.name;
      const date =
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
      const doc = await addDoc(collection(db, "projects"), {
        name: name,
        content: data,
        date: date,
        userID: user.uid,
      });
      setProject({
        ...project,
        id: doc.id,
        name: name,
        date: date,
      });
      setProjects(
        projects.concat({
          id: doc.id,
          name: name,
          date: date,
        })
      );

      await store.toggleVolume();
    }
  };
  const setName = (name) => {
    setProject({ ...project, name: name });
  };


  const loadProject = async (id) => {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await store.toggleVolume();
      const data = docSnap.data();
      await store.reset();
      await store.loadProject(JSON.parse(data.content));
      setProject({
        ...project,
        id: id,
        name: data.name,
        date: data.date,
      });
      console.log(project);
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
    if (!user || !user.uid) return;
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
    };
    fetchProjects();
  }, [user]);

  const saveData = () => {
    if (project.name === "") {
      setProject({
        ...project,
        name: "Nouveau Projet" + " " + new Date().toLocaleDateString(),
      });
    }
    saveDataDB();
  };

  console.log(projects, project);
  return (
    <DataContext.Provider
      value={{
        saveData,
        setName,
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
