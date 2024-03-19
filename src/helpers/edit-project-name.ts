import { BaseDirectory, writeFile } from "@tauri-apps/api/fs";
import { v4 } from "uuid";
import { ProjectMetaPath } from "../consts";
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

    await writeFile(await ProjectMetaPath(projectID), `${projectName}\n${dir}`, {
      dir: BaseDirectory.Home,
    });
    return projectName;
  } catch (error) {
    return false;
  }
}
