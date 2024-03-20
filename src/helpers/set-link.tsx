import { BaseDirectory, createDir, writeFile, writeTextFile, removeFile } from "@tauri-apps/api/fs";
import { AUTHL_KeyPath, AUTHL_LinkPath, AUTHPath, Motarjem, listProjectsPath } from "../consts";

export default async function setLink(link = "") {
    try {
        await createDir(Motarjem, { dir: BaseDirectory.Home, recursive: true });
        // create folder Motarjem/projects
        await createDir(await listProjectsPath(), { dir: BaseDirectory.Home, recursive: true });
        // create folder Motarjem/auth
        await createDir(await AUTHPath(), { dir: BaseDirectory.Home, recursive: true })
        // create file Motarjem/auth/Link.text
        await writeFile(await AUTHL_LinkPath(), "", { dir: BaseDirectory.Home, append: true });
        // create file Motarjem/auth/key.text
        await writeFile(await AUTHL_KeyPath(), "", { dir: BaseDirectory.Home, append: true });
        
        await removeFile(await AUTHL_LinkPath(), { dir: BaseDirectory.Home })
        await writeTextFile(await AUTHL_LinkPath(),link , {append: true, dir: BaseDirectory.Home })
    } catch (error) {
        
    }
}