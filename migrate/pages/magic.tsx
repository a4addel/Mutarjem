import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { Virtuoso } from "react-virtuoso";
import TextComponent from "../components/text";
import AyaComponent from "../components/ayah";
import handleModalSelect from "../helpers/handle-modal-select";
import handleText from "../helpers/handle-text-change";
import { PrimaryListItem } from "../types";
import ExportSRTComp from "../components/export-srt";
import LayoutScreen from "../../src/screens/layout";
import saveProject from "../../src/helpers/save-edit";
import { useParams } from "react-router-dom";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { Card, Flex } from "antd";
import { ProjectMetaPath, ProjectTextPath } from "../../src/consts";

const Page: React.FC = () => {
  let { id } = useParams();

  const [rows, setRows] = useState<Array<PrimaryListItem>>();
  const [name, setName] = useState<string>("");
  const [dir, setDir] = useState<string>("ltr");

  React.useEffect(() => {
    async function main() {
      readTextFile(await ProjectMetaPath(id || ""), {
        dir: BaseDirectory.Home,
      })
        .then((e) => {
          setName(e.split("\n")[0] || "");
          setDir(e.split("\n")[1] || "");
        })
        .catch(() => { })
        .finally(() => { });
  
      readTextFile(await ProjectTextPath(id || ""), {
        dir: BaseDirectory.Home,
      })
        .then((e) => {
          setRows(JSON.parse(e));
        })
        .catch(() => { })
        .finally(() => { });
    }
    main();
  }, []);

  const red = useRef<HTMLDivElement>(null);

  return (
    <LayoutScreen>
      <ExportSRTComp state={rows || []} defaultName={name} />

      <div className={classnames("max-w-7xl", "mx-auto", "w-full")} ref={red}>
        <Virtuoso
          useWindowScroll
          autoFocus
          className={classnames(
            "gap-3",
            "flex",
            "flex-col",
            "p-2",
            "overflow-x-hidden",
            "mx-auto",
            "block",
            "w-full",
            "py-[200px]"
          )}
          data={rows}
          style={{
            margin: "0",
            height: "calc(100vh - 200px)", // Fixed typo in 'calc'
            width: "100%",
            marginBlock: "0 auto",
            padding: "10px 0",
            scrollSnapType: "y",
            overflow: "auto", // Changed from 'hidden' to 'auto'
          }}
          totalCount={rows?.length ?? 0}
          overscan={200} // Added overscan to preload more items
          itemContent={(index, data) => {
            if (!data) return <></>;

            return (
              <Card
                id={`${index + 1}-item`}
                key={index}
                className={classnames(
                  "flex",
                  "flex-col",
                  "m-5",
                  "block",
                )}
              >
                <div className="text-3xl text-center m-3" dir={dir}>
                  <p className="w-full text-center ">{(index + 1).toString().padStart(rows?.length.toString().length || 0, "0")}</p>
                  {data.data.map((e) =>
                    e.type === "aya" ? (
                      <span className="font-yellow gray" style={{
                        color: e.data.selected == "Select Translation" ? "red" : "yellowgreen"
                      }}>
                        <b><i> {" "}
                          {e.data.selected}
                          {" "}</i></b>
                      </span>
                    ) : (
                      e.data || e.initialData
                    ),
                  )}
                </div>
                <Flex className={classnames("flex", "flex-col", "w-full", dir)}>
                  {(data?.data || []).map((e, i) => {
                    if (e.type === "aya")
                      return (
                        <AyaComponent
                          onSelect={async (e) => {
                            const new_rows = handleModalSelect(e, rows || []);
                            setRows(new_rows);
                            const text = JSON.stringify(new_rows);
                            saveProject({
                              projectID: id || "",
                              text: text,
                              itemCount: index + "",
                            });
                          }}
                          selected={e.data.selected}
                          index={i}
                          list={e.data.options}
                          id={data.id}
                          key={i}
                        />
                      );
                    return (
                      <TextComponent
                        direction={dir}
                        value={e.data || e.initialData}
                        onChange={async (value) => {
                          const new_rows = handleText(
                            {
                              id: data.id,
                              index: i,
                              value: value,
                            },
                            rows || [],
                          );
                          const text = JSON.stringify(new_rows);

                          setRows(new_rows);
                          saveProject({
                            projectID: id || "",
                            text: text,
                            itemCount: index + "",
                          });
                        }}
                        key={i}
                      />
                    );
                  })}
                </Flex>
              </Card>
            );
          }}
        />
      </div>
    </LayoutScreen>
  );
};

export default Page;