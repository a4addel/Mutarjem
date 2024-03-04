
 import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { createDir, BaseDirectory } from '@tauri-apps/api/fs';
import { useEffect } from "react";

function App() {
useEffect(() => {
    createDir("tans/", {dir: BaseDirectory.Home }).then(() => {
      createDir("tans/projects", {dir: BaseDirectory.Home }).catch(() => {});
    }).catch(() => {})

}, [])
    return  <RouterProvider  router={router} />
}

export default App;
