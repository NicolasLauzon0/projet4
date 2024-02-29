import React from 'react'
import { useSaveAndLoad } from '../../context/SaveAndLoadContext'

const NomProjet = () => {
    const { nomProjet, setName } = useSaveAndLoad()
    return (
        <div className="nom-projet">
            <input
                type="text"
                value={nomProjet}
                onChange={(e) => setName(e.target.value)}
                pattern='[a-zA-Z]*'
                placeholder="Nom du projet"
            />
        </div>
    )
}

export default NomProjet