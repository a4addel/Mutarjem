import { BaseDirectory, createDir, writeTextFile } from "@tauri-apps/api/fs";
import path from "@tauri-apps/api/path";

export const DEFAULT_PATH_PATH = `Mutarjem/defaults/default-path.text`;
export const DEFAULT_PATH_DIR = `Mutarjem/defaults/default-path.text`;

export default async function setDefaultPath({
  path,
}: {
  path: string;
}): Promise<boolean> {
  try {
    await createDir(DEFAULT_PATH_DIR, {
      dir: BaseDirectory.Home,
      recursive: true,
    });

    await writeTextFile(DEFAULT_PATH_PATH, path, {
      dir: BaseDirectory.Home,
    });

    return true;
  } catch (error) {
    return false;
  }
}
