import { BaseDirectory, removeDir } from "@tauri-apps/api/fs";
import { ProjectPath } from "../consts";
export default async function deleteProject({
  projectID,
}: {
  projectID: string;
}): Promise<boolean> {
  try {
    await removeDir(await ProjectPath(projectID || ""), {
      dir: BaseDirectory.Home,
      recursive: true,
    });
    return true;
  } catch (error) {
    return false;
  }
}
