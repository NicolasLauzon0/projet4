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
  orderBy,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useStore } from "../store/Store";
import { shallow } from "zustand/shallow";
import { useAuth } from "./AuthContext";
import { useReactFlow } from "reactflow";

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
  const [error, setError] = useState(false);
  const [fitView, setFitView] = useState(false);
  const { user } = useAuth();
  // Sauvegarde des données dans la base de données
  const saveDataDBAjouter = async (projectRef) => {
    let isRunning = store.isRunning;
    if (isRunning) {
      await store.toggleVolume();
    }
    const data = JSON.stringify(store.saveProject());
    const date =
      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    const doc = await addDoc(collection(db, "projects"), {
      name: projectRef.name,
      content: data,
      date: date,
      userID: user.uid,
    });
    setProject({
      id: doc.id,
      name: projectRef.name,
      date: date,
    });
    setProjects([
      { id: doc.id, name: projectRef.name, date: date },
      ...projects,
    ]);
    if (isRunning && !store.isRunning) {
      await store.toggleVolume();
    }
  };
  const saveDataDBModifier = async (projectRef) => {
    let isRunning = store.isRunning;
    if (isRunning) {
      await store.toggleVolume();
    }
    const data = JSON.stringify(store.saveProject());
    const date =
      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    const docRef = await getDoc(doc(db, "projects", projectRef.id));
    if (docRef.exists()) {
      await setDoc(doc(db, "projects", projectRef.id), {
        name: projectRef.name,
        content: data,
        date: date,
        userID: user.uid,
      });

      setProject({
        ...project,
        name: projectRef.name,
        date: date,
      });
      setProjects(
        projects.map((p) => {
          if (p.id === projectRef.id) {
            return { id: projectRef.id, name: projectRef.name, date: date };
          }
          return p;
        })
      );
    } else {
      const doc = await addDoc(collection(db, "projects"), {
        name: projectRef.name,
        content: data,
        date: date,
        userID: user.uid,
      });
      setProject({
        id: doc.id,
        name: projectRef.name,
        date: date,
      });
      setProjects([
        { id: doc.id, name: projectRef.name, date: date },
        ...projects,
      ]);
    }
    if (isRunning && !store.isRunning) {
      await store.toggleVolume();
    }
  };
  const newFile = async () => {
    let projectRef = project;
    if (project.name === "") {
      projectRef = {
        ...project,
        name: "New Project" + "_" + new Date().toLocaleDateString(),
      };
    }
    await saveDataDBAjouter(projectRef);
  };

  const saveData = async () => {
    if (project.name === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
    const projectRef = project;
    if (projectRef.id === "") {
      await saveDataDBAjouter(projectRef);
    } else if (project.id !== "") {
      await saveDataDBModifier(projectRef);
    }
  };

  const loadProject = async (id) => {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (store.isRunning) {
        await store.toggleVolume();
      }
      const data = docSnap.data();
      await store.reset();
      await store.loadProject(JSON.parse(data.content));
      setProject({
        ...project,
        id: id,
        name: data.name,
        date: data.date,
      });
      setFitView(!fitView);
    } else {
      console.log("No such document!");
    }
  };

  const setName = (name) => {
    setProject({ ...project, name: name });
  };

  const removeProject = async (id) => {
    if (id === undefined) return;
    await deleteDoc(doc(db, "projects", id));
    setProjects(projects.filter((project) => project.id !== id));
  };

  // fetch des projets de l'utilisateur au chargement de la page
  useEffect(() => {
    if (!user || !user.uid) return;
    const fetchProjects = async () => {
      const collectionRef = collection(db, "projects");
      const q = query(
        collectionRef,
        where("userID", "==", user?.uid),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(q);
      let projectsRef = [];
      querySnapshot.forEach((doc) => {
        const { name, date } = doc.data();
        projectsRef.push({ id: doc.id, name, date });
      });
      setProjects(projectsRef);
      if (projectsRef.length > 0) {
        await loadProject(projectsRef[0]?.id);
        setProject(projectsRef[0]);
        setFitView(!fitView);
      }
    };
    fetchProjects();
  }, [user]);

  useEffect(() => {
    const handleSave = (e) => {
      const code = e.keyCode || e.which;

      let charCode = String.fromCharCode(code).toLowerCase();
      if (e.ctrlKey && charCode === "s") {
        e.preventDefault();
        saveData();
      } else if (e.ctrlKey && charCode === "r") {
        location.reload();
      }
    };
    window.addEventListener("keydown", handleSave);

    return () => {
      window.removeEventListener("keydown", handleSave);
    };
  }, [project]);
  return (
    <DataContext.Provider
      value={{
        saveData,
        fitView,
        newFile,
        setName,
        project,
        projects,
        seeFiles,
        setSeeFiles,
        loadProject,
        removeProject,
        error,
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
