import {  Button, Form, Input, Modal } from "antd";
import ExportSRT from "../helpers/buildSrt";
import { PrimaryListItem } from "../types";
import { useState } from "react";
import classname from "classnames";
import { useToggle } from "react-use";
 import { DownloadOutlined, RightOutlined } from "@ant-design/icons";
export default function exportSRT({ state }: { state: PrimaryListItem[] }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [open, toggle] = useToggle(false);
  const [isSRT, setIsSRT] = useState(false);
  return (
    <>
      <Button
        className={classname("fixed", "top-4", "right-4", "z-20")}
        onClick={() => toggle(true)}
      >
        Done
      </Button>
      <Modal
        destroyOnClose
        footer={
          <Button
            danger
            type="primary"
            onClick={() => {
              toggle(false);
              setIsSRT(false);
            }}
          >
            close
          </Button>
        }
        open={open}
        closable={false}
      >
        <div className={classname("bg-slate-400", "p-5")}>
          <div className={classname("flex", "flex-row")}>
            <Form.Item label=".SRT file name">
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            <Button
              onClick={() => {
                setLink(ExportSRT(state));
                setIsSRT(true);
              }}
            >
              Export
              <RightOutlined />
            </Button>
          </div>
          {link && isSRT && (
            <Button
              icon={<DownloadOutlined />}
              media=""
              download={`${name}.srt`}
              href={link}
            >
              {!name ? "input a filename" : `${name}`}.srt
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
}
