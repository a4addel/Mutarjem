import { BaseDirectory, writeFile } from "@tauri-apps/api/fs";

export default async function saveProject({
    projectID, text
}: {
    projectID: string, text: string
}) : Promise<boolean> {

    try {
        

        await writeFile(`tans/projects/${projectID}/text.text`, text ,{dir: BaseDirectory.Home });
        return true

    } catch (error) {
        return false;
    }
}