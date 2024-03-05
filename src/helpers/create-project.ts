import { BaseDirectory, createDir, writeFile } from "@tauri-apps/api/fs";
import { v4 } from "uuid";
export default async function createProject({
  projectName,
  text,
}: {
  projectName: string;
  text: string;
}): Promise<false | string> {
  try {
    const id = v4();

    await createDir(`Motarjem/projects/${id}`, { dir: BaseDirectory.Home });
    await writeFile(`Motarjem/projects/${id}/meta.text`, projectName, {
      dir: BaseDirectory.Home,
    });
    await writeFile(`Motarjem/projects/${id}/memo.text`, "0", {
      dir: BaseDirectory.Home,
    });
    await writeFile(`Motarjem/projects/${id}/text.text`, text, {
      dir: BaseDirectory.Home,
    });
    return id;
  } catch (error) {
    return false;
  }
}
