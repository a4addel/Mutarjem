import { BaseDirectory, createDir, writeFile } from "@tauri-apps/api/fs";
import { v4 } from "uuid";
import { ProjectMetaPath, ProjectPath, ProjectTextPath } from "../consts";
export default async function createProject({
  projectName,
  text,
  dir
}: {
  projectName: string;
  text: string;
  dir: string
}): Promise<false | string> {
  try {
    const id = v4();

    await createDir(await ProjectPath(id), { dir: BaseDirectory.Home });
    await writeFile(await ProjectMetaPath(id || ""), `${projectName}\n${dir}`, {
      dir: BaseDirectory.Home,
    });
    await writeFile(`Mutarjem/projects/${id}/memo.text`, "0", {
      dir: BaseDirectory.Home,
    });
    await writeFile(await ProjectTextPath(id || ""), text, {
      dir: BaseDirectory.Home,
    });
    return id;
  } catch (error) {
    return false;
  }
}

