import { collection, setDoc, doc, addDoc, getDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../config/firebase";
import { useStore } from "../store/Store";
import { shallow } from "zustand/shallow";
import { useAuth } from "./AuthContext";


const selector = (store) => ({
    saveProject: store.saveProject,
});

const DataContext = createContext({
    saveData: () => { },
    loadData: () => { },
    projectName: "",
    setName: () => { },
    projectId: "",
});


const SaveAndLoadProvider = ({ children }) => {
    const store = useStore(selector, shallow);
    const [projectName, setProjectName] = useState("");
    const [projectId, setProjectId] = useState("");
    const { user } = useAuth();

    const saveData = async () => {
        const data = JSON.stringify(store.saveProject());
        const doc = await addDoc(collection(db, "projects"), {
            name: projectName,
            content: data,
            date: new Date().toLocaleDateString(),
            userID: user.uid
        });
        setProjectId(doc.id);
    }
    const setName = (name) => {
        if (name === "") {
            setProjectName("Nouveau Projet");
            return;
        }
        setProjectName(name);
    }

    const loadData = async () => {
        const fetchData = async () => {
            const maCollection = await getDoc(doc(db, "projects", id));

            await store.reset();
            await data.nodes.forEach((node) => {
                console.log(node);
                store.createNodeFromData(node);
            });
            await data.edges.forEach((edge) => {
                store.createEdgeFromData(edge);
            });
        }
        fetchData();
    }

    return (
        <DataContext.Provider value={{ saveData, loadData, projectName, setName, projectId}}>
            {children}
        </DataContext.Provider>
    )
}

const useSaveAndLoad = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useSaveAndLoad must be used within an SaveAndLoadProvider');
    }
    return context;
}

export { SaveAndLoadProvider, useSaveAndLoad }