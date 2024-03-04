import { BaseDirectory, createDir, writeFile } from "@tauri-apps/api/fs";
import { v4 } from "uuid";

export default async function createProject({
    projectName, text
}: {
    projectName: string, text: string
}) : Promise<boolean> {

    try {
        const id = v4();

        await createDir(`tans/projects/${id}` ,{dir: BaseDirectory.Home });
        await writeFile(`tans/projects/${id}/meta.text`, projectName ,{dir: BaseDirectory.Home });
        await writeFile(`tans/projects/${id}/text.text`, text ,{dir: BaseDirectory.Home });
        return true

    } catch (error) {
        return false;
    }
}