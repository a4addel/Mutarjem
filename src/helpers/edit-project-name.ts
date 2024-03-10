import { BaseDirectory, writeFile } from "@tauri-apps/api/fs";
import { v4 } from "uuid";
export default async function editProjectName({
  projectName,
  projectID,
  dir
}: {
  projectName: string;
  projectID: string;
  dir: string
}): Promise<false | string> {
  try {
    const id = v4();

    await writeFile(`Motarjem/projects/${projectID}/meta.text`, `${projectName}\n${dir}`, {
      dir: BaseDirectory.Home,
    });
    return projectName;
  } catch (error) {
    return false;
  }
}
