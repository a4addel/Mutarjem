import { BaseDirectory, writeFile } from "@tauri-apps/api/fs";

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
    await writeFile(`Motarjem/projects/${projectID}/text.text`, text, {
      dir: BaseDirectory.Home,
    });
    await writeFile(
      `Motarjem/projects/${projectID}/memo.text`,
      itemCount.toString(),
      { dir: BaseDirectory.Home },
    );

    return true;
  } catch (error) {
    return false;
  }
}
