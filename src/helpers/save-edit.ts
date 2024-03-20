import { BaseDirectory, writeFile } from "@tauri-apps/api/fs";
import { ProjectTextPath } from "../consts";

export default async function saveProject({
  projectID,
  text,
  itemCount,
}: {
  projectID: string;
  text: string;
  itemCount: string;
}): Promise<boolean> {
  try {
    await writeFile(await ProjectTextPath(projectID), text, {
      dir: BaseDirectory.Home,
    });
    await writeFile(
      `Mutarjem/projects/${projectID}/memo.text`,
      itemCount.toString(),
      { dir: BaseDirectory.Home },
    );

    return true;
  } catch (error) {
    return false;
  }
}
