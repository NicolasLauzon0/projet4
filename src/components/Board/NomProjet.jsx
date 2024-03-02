import React from "react";
import { useSaveAndLoad } from "../../context/SaveAndLoadContext";

const NomProjet = () => {
  const { project, setName } = useSaveAndLoad();
  return (
    <div className="nom-projet">
      <input
        type="text"
        value={project.name}
        onChange={(e) => setName(e.target.value)}
        placeholder={
          project.name === ""
            ? "Nouveau Projet" + " " + new Date().toLocaleDateString()
            : project.name
        }
      />
    </div>
  );
};

export default NomProjet;
