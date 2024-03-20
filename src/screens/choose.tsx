import {
  BaseDirectory,
  FileEntry,
  readDir,
  readTextFile,
} from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";
import { Button, Input, Modal, Select, Table } from "antd";
import { Link } from "react-router-dom";
import { useToggle } from "react-use";

import deleteProject from "../helpers/delete-project";
import edit_project_name from "../helpers/edit-project-name";

import Layout from "./layout";
import { ProjectMetaPath } from "../consts";

async function getProjects() {
  try {
    const s = await readDir("Mutarjem/projects", { dir: BaseDirectory.Home });
    return s;
  } catch (error) {
    return [] as FileEntry[];
  }
}

type Project = {
  name: string;
  id: string;
};
async function getNames(): Promise<Project[]> {
  const s = await getProjects();
  let sss: Project[] = [];
  for await (let item of s) {
    const name = await readTextFile(
      await ProjectMetaPath(item.name || ""),
      { dir: BaseDirectory.Home },
    );
    if (!name) continue;

    sss.push({
      name: name.split("\n")[0],
      id: item.name || "",
    });
  }
  return sss;
}
export default function Choose() {
  const [s, setS] = useState<Project[]>([]);
  useEffect(() => {
    async function main() {
      console.log("Ssssssssss");

      let ds = await getNames();
      setS(ds);
    }
    main();
  }, []);
  return (
     <Layout >
      <Table dataSource={s} className="w-full">
        <Table.Column
          render={(e) => {
            return (
              <Link className="w-1/2 block underline" to={`/magic/${e.id}`}>
                <span className="block w-full truncate">{e.name}</span>
              </Link>
            );
          }}
        ></Table.Column>
        <Table.Column
          render={(e) => {
            return <EditProjectName curruntName={e.name} projectID={e.id} />;
          }}
        ></Table.Column>
        <Table.Column
          render={(e) => {
            return <DeleteProject projectID={e.id} />;
          }}
        ></Table.Column>
      </Table>
    </Layout>
   );
}

function DeleteProject({ projectID }: { projectID: string }) {
  const [open, toogle] = useToggle(false);
  return (
    <>
      <Button danger onClick={() => toogle(true)}>
        حذف
      </Button>

      <Modal
        open={open}
        onCancel={toogle}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Button
          onClick={async () => {
            await deleteProject({ projectID: projectID });
            window.location.reload();
          }}
          danger
          className="w-full h-20 text-5xl"
        >
          DELETE
        </Button>
      </Modal>
    </>
  );
}

function EditProjectName({
  projectID,
  curruntName,
}: {
  projectID: string;
  curruntName: string;
}) {
  const [open, toogle] = useToggle(false);
  const [name, setName] = useState(() => curruntName);
  const [dir, setDir] = useState("");

  return (
    <>
    
      <Button className="block  " onClick={() => toogle(true)}>
        تعديل
      </Button>
      <Modal
        open={open}
        onCancel={toogle}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Input.TextArea value={name} onChange={(e) => setName(e.target.value)} />
        <Select options={[
          {
            label: "RTL",
            value: "rtl"
          },
          {
            label: "LTR",
            value: "ltr"
          }
        ]} className="w-full" value={dir} onSelect={(e) => setDir(e)} />
        <Button
          onClick={async () => {
            await edit_project_name({
              projectID: projectID,
              projectName: name,
              dir: dir
            });
            window.location.reload();
          }}
          className="w-full h-20 text-5xl overflow-hidden"
        >
          SUBMIT
        </Button>
      </Modal>
    </>
  );
}
