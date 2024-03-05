import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { createDir, BaseDirectory, writeFile } from "@tauri-apps/api/fs";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    createDir("Motarjem/", { dir: BaseDirectory.Home })
      .then(() => {
        createDir("Motarjem/projects", { dir: BaseDirectory.Home }).catch(
          () => {},
        );
        createDir("Motarjem/config", { dir: BaseDirectory.Home }).catch(
          () => {},
        );
        writeFile("Motarjem/config/default-path.text", "", {
          dir: BaseDirectory.Home,
        }).catch(() => {});
      })
      .catch(() => {});
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
