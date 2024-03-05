import { BaseDirectory, FileEntry, readDir, readTextFile } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";
import LandingScreen from "./layout";
import { Button, Flex, Input, Modal } from "antd";
import { Link } from "react-router-dom";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useToggle } from "react-use";

import deleteProject from "../helpers/delete-project";
import edit_project_name from "../helpers/edit-project-name";
async function getProjects() {
    try {
        const s = await readDir("tans/projects", { dir: BaseDirectory.Home })
        return s;
    } catch (error) {
        return [] as FileEntry[]
    }
};


type Project = {
    name: string, id: string
}
async function getNames(): Promise<Project[]> {
    const s = (await getProjects());
    let sss: Project[] = []
    for await (let item of s) {


        const name = (await readTextFile(`tans/projects/${item.name}/meta.text`, { dir: BaseDirectory.Home }));
        if (!name) continue;

        sss.push({
            name: name.split("\n")[0],
            id: item.name || ""
        })
    }
    return sss;


}
export default function Choose() {
    const [s, setS] = useState<Project[]>([])
    useEffect(() => {
        async function main() {
            console.log("Ssssssssss");

            let ds = await getNames()
            setS(ds);
        }
        main()
    }, [])
    return <LandingScreen>
        {s.map(e => (<Flex>
            <Link className="w-1/2" to={`/magic/${e.id}`}>
                <Button className="w-full flex-grow-0  ">
                    <span className="block w-full truncate">{e.name}</span>
                    </Button></Link>
            <EditProjectName curruntName={e.name} projectID={e.id} />
            <DeleteProject projectID={e.id} />

        </Flex>))}
    </LandingScreen>


}

function DeleteProject({ projectID }: { projectID: string }) {

    const [open, toogle] = useToggle(false);
    return <>
        <Button danger  onClick={() => toogle(true)}>
            <DeleteFilled />
        </Button>
        
        <Modal open={open} onCancel={toogle} okButtonProps={{ style: { display: "none" } }}>
             <Button onClick={async () => {
                await deleteProject({ projectID: projectID });
                window.location.reload()
            }} danger className="w-full h-20 text-5xl">DELETE</Button>
        </Modal>

    </>
}


function EditProjectName({ projectID, curruntName }: { projectID: string, curruntName: string }) {

    const [open, toogle] = useToggle(false);
    const [name, setName] = useState(curruntName);
    return <>
        <Button className="block  " onClick={() => toogle(true)}>
            <EditFilled />
        </Button>
        <Modal open={open} onCancel={toogle} okButtonProps={{ style: { display: "none" } }}>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Button onClick={async () => {
                await edit_project_name({ projectID: projectID, projectName: name });
                window.location.reload()
            }}   className="w-full h-20 text-5xl overflow-hidden">SUBMIT</Button>
        </Modal>

    </>
}