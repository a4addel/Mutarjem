import { BaseDirectory, writeFile } from "@tauri-apps/api/fs";
import { v4 } from "uuid";
export default async function editProjectName({
    projectName, projectID
}: {
    projectName: string, projectID: string
}): Promise<false | string> {

    try {
        const id = v4();

        await writeFile(`Motarjem/projects/${projectID}/meta.text`, projectName, { dir: BaseDirectory.Home });
        return projectName;

    } catch (error) {
        return false;
    }
}