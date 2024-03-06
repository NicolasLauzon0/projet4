import React from "react";
import { useSaveAndLoad } from "../../../context/SaveAndLoadContext";
import Button from "../../utils/Button";

const FilesPopUp = () => {
  const { projects, setSeeFiles, loadProject, removeProject } =
    useSaveAndLoad();
  return (
    <>
      <Button action={() => setSeeFiles(false)} classe={"file"} />
      <div className="files-popup">
        <div className="files-popup__container">
          <h2>Charger un projet</h2>
          <ul>
            {projects &&
              projects.map((project, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setSeeFiles(false);
                      loadProject(project.id);
                    }}
                  >
                    {project.name}
                    <div
                      className="remove"
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
      </div>
    </>
  );
};

export default FilesPopUp;
