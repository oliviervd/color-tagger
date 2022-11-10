import React from "react";
import useGoogleSheets from "use-google-sheets";
import {
    fetchStudioProjectTitle,
    fetchStudioProjectDescription,
    fetchStudioProjectImage,
    fetchStudioID
} from "../utils/data_parsers";

const ProjectHomeSnippet = (props) => {

    let id, lang;
    id = props.id;
    lang = props.lang;

    const {data, loading, error} = useGoogleSheets( {
        apiKey: "AIzaSyAhfyQ_9XDc6ajRYDy3qPXPAp8mkLKja90",
        sheetId: "1t8c2FwHlhGBXQ22zg0BRPNdElKNg5_yu8CUAMGY_hvw",
        datasheetOptions: [{id: 'Studios'}],
    })

    if (loading) {
        return <div><p>loading...</p></div>
    }

    if (error) {
        return <div><p>error!</p></div>
    }

    let _projects = [];
    data.map((x) => {
        x.data.map((l) => {
            _projects.push(l)
        })
    })

    return(
        <div>
            {_projects.map((project) => {

                let projectDesc, projectTitle, projectIMG, projectID;
                projectDesc = fetchStudioProjectDescription(project, lang, "text", id)
                projectIMG = fetchStudioProjectImage(project, "text", id);
                projectTitle = fetchStudioProjectTitle(project, lang, "text", id);
                projectID = fetchStudioID(project)
                if (projectID.startsWith(id) && id !== projectID){
                    return(
                        <div>
                            <h2 className="text-center uppercase box-title">{projectTitle}</h2>
                            <img className="img__fit center" src={projectIMG}/>
                            <p className="uppercase justify padding-10">{projectDesc}</p>
                        </div>
                    )
                }

            })}
        </div>
    )
}

export default ProjectHomeSnippet;