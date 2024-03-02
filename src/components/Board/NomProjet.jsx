import React from 'react'
import { useSaveAndLoad } from '../../context/SaveAndLoadContext'

const NomProjet = () => {
    const { projectName, setName } = useSaveAndLoad()
    return (
        <div className="nom-projet">
            <input
                type="text"
                value={projectName}
                onChange={(e) => setName(e.target.value)}
                placeholder={projectName === "" ? "Nouveau Projet" + " " + new Date().toLocaleDateString() : projectName}
            />
        </div>
    )
}

export default NomProjet