import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { createDir, BaseDirectory, writeFile } from "@tauri-apps/api/fs";
import { listen } from "@tauri-apps/api/event";

import { useEffect, useState } from "react";
import {
  AUTHL_KeyPath,
  AUTHL_LinkPath,
  AUTHPath,
  Mutarjem,
  listProjectsPath,
} from "./consts";
import { Spin } from "antd";

const Loading = () => (
  <div className="  w-screen h-screen flex justify-center item-center flex-col">
    <Spin />
    <p className="text-5xl text-center"> انتظر لحظات</p>
  </div>
);

function App() {
  const [setup, setSetUp] = useState(true);
  useEffect(() => {
    async function main() {
      setSetUp(true);
      // create folder Mutarjem
      await createDir(Mutarjem, { dir: BaseDirectory.Home, recursive: true });
      // create folder Mutarjem/projects
      await createDir(await listProjectsPath(), {
        dir: BaseDirectory.Home,
        recursive: true,
      });
      // create folder Mutarjem/auth
      await createDir(await AUTHPath(), {
        dir: BaseDirectory.Home,
        recursive: true,
      });
      // create file Mutarjem/auth/Link.text
      await writeFile(await AUTHL_LinkPath(), "", {
        dir: BaseDirectory.Home,
        append: true,
      });
      // create file Mutarjem/auth/key.text
      await writeFile(await AUTHL_KeyPath(), "", {
        dir: BaseDirectory.Home,
        append: true,
      });
      setTimeout(() => setSetUp(false), 600);
    }
    main();
  }, []);

  return (
    <>
      {setup && <Loading />}
      {!setup && <RouterProvider router={router} />}
    </>
  );
}

export default App;
