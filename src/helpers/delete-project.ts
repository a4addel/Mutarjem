import { BaseDirectory, removeDir } from "@tauri-apps/api/fs";
export default async function deleteProject({
  projectID,
}: {
  projectID: string;
}): Promise<boolean> {
  try {
    await removeDir(`Motarjem/projects/${projectID}`, {
      dir: BaseDirectory.Home,
      recursive: true,
    });
    return true;
  } catch (error) {
    return false;
  }
}
