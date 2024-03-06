import React from "react";
import { useSaveAndLoad } from "../../context/SaveAndLoadContext";

const NomProjet = () => {
  const { project, setName, error } = useSaveAndLoad();
  return (
    <div className="nom-projet">
      <input
        className={error ? "errorNomProjet" : ""}
        type="text"
        value={project.name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
      />
    </div>
  );
};

export default NomProjet;
