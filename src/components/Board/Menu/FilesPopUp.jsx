import React from "react";
import { useSaveAndLoad } from "../../../context/SaveAndLoadContext";

const FilesPopUp = () => {
  const { projects, setSeeFiles, loadProject, removeProject } = useSaveAndLoad();
  return (
    <div className="files-popup">
      <h2>Charger un projet</h2>
      <ul>
        {projects.map((project, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                setSeeFiles(false);
                loadProject(project.id);
              }}
            >
              {project.name}
              <div className="remove"
                onClick={(e) => {
                  e.stopPropagation();
                  removeProject(project.id);
                }}
              >
                <div></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilesPopUp;
