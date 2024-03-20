import { BaseDirectory, createDir, removeFile, writeFile, writeTextFile } from "@tauri-apps/api/fs";
import { AUTHL_KeyPath, AUTHL_LinkPath, AUTHPath, Mutarjem, listProjectsPath } from "../consts";

export default async function setKEy(link = "") {
    try {
        await createDir(Mutarjem, { dir: BaseDirectory.Home, recursive: true });
        // create folder Mutarjem/projects
        await createDir(await listProjectsPath(), { dir: BaseDirectory.Home, recursive: true });
        // create folder Mutarjem/auth
        await createDir(await AUTHPath(), { dir: BaseDirectory.Home, recursive: true })
        // create file Mutarjem/auth/Link.text
        await writeFile(await AUTHL_LinkPath(), "", { dir: BaseDirectory.Home, append: true });
        // create file Mutarjem/auth/key.text
        await writeFile(await AUTHL_KeyPath(), "", { dir: BaseDirectory.Home, append: true });
        
        await removeFile(await AUTHL_KeyPath(), { dir: BaseDirectory.Home })
        await writeTextFile(await AUTHL_KeyPath(), link , {append: true, dir: BaseDirectory.Home })
    } catch (error) {
        
    }
}