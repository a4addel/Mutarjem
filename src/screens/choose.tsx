import { BaseDirectory, FileEntry, readDir,readTextFile } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";
import LandingScreen from "./layout";
import { Button } from "antd";
import { Link } from "react-router-dom";
// tans/projects/${pj_id}/text.text
async function getProjects() {
    try {
        const s = await readDir("tans/projects", { dir: BaseDirectory.Home })
        return s;
    } catch (error) {
        return [] as FileEntry[]
    }
}
type Project  = {
    name: string, id: string
}
async function getNames(): Promise<Project[]> {
    const s = (await getProjects());
    let sss: Project[]= []
    for await (let item of s) {
        
        
        const name = (await readTextFile(`tans/projects/${item.name}/meta.text`, {dir: BaseDirectory.Home }));
        if (!name) continue;

        sss.push({
            name: name.split("\n")[0],
            id: item.name || ""
        })
    }
    return sss;

    
}
export default  function Choose() {
    const [s, setS] = useState<Project[]>([])
    useEffect(() => {
        async function  main() {
            console.log("Ssssssssss");
            
            let ds = await getNames()
            setS(ds);
        }
        main()
    }, [])
    return <LandingScreen>
        {s.map(e => (<Link to={`/magic/${e.id}`}><Button className="w-full block !h-20 text-5xl">{e.name}</Button></Link>))}
    </LandingScreen>


}