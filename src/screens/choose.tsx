import {
  BaseDirectory,
  FileEntry,
  readDir,
  readTextFile,
} from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";
import { Button, Input, Modal, Table } from "antd";
import { Link } from "react-router-dom";
import { useToggle } from "react-use";

import deleteProject from "../helpers/delete-project";
import edit_project_name from "../helpers/edit-project-name";

import Layout from "./layout";

async function getProjects() {
  try {
    const s = await readDir("Motarjem/projects", { dir: BaseDirectory.Home });
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
      `Motarjem/projects/${item.name}/meta.text`,
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
    <Layout>
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
  const [name, setName] = useState(curruntName);
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
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Button
          onClick={async () => {
            await edit_project_name({
              projectID: projectID,
              projectName: name,
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
