import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { Virtuoso } from "react-virtuoso";
import TextComponent from "../components/TextComponent";
import AyaComponent from "../components/AyaComponent";
import handleModalSelect from "../helpers/handleModalSelect";
import handleText from "../helpers/handleTextChange";
import { PrimaryListItem } from "../types";

// import DeepL_JOSN_To_State_Format from "../helpers/DeepL_JOSN_To_State_Format";
// import DallEData from "../data/data.json";


import ExportSRTComp from "../components/ExportSRTComp";
 
import LayoutScreen from "../../src/screens/layout";
import saveProject from "../../src/helpers/save-edit";
import { useParams } from "react-router-dom";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";

 
const Page: React.FC = () => {
  let { id } = useParams();

  const [rows, setRows] = useState<Array<PrimaryListItem>>();

  React.useEffect(() => {
    // setRows([
    //   //@ts-ignore
    //   ...DeepL_JOSN_To_State_Format(DallEData.json),
    //   //@ts-ignore
    //   ...DeepL_JOSN_To_State_Format(DallEData.json),
    //   //@ts-ignore
    //   ...DeepL_JOSN_To_State_Format(DallEData.json),
    //   //@ts-ignore
    //   ...DeepL_JOSN_To_State_Format(DallEData.json),
    // ]);
    readTextFile(`tans/projects/${id}/text.text`, {dir: BaseDirectory.Home }).then(e => {
      setRows(JSON.parse(e))
    })
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(rows));
  }, [rows]);

  return (
    <LayoutScreen>
      <ExportSRTComp state={rows || []} />

      <div className={classnames("max-w-7xl", "mx-auto")}>

        <Virtuoso
          autoFocus
          className={classnames(
            "max-w-6xl",
            "gap-3",
            "flex",
            "flex-col",
            "p-2",
            "overflow-x-hidden",
            "mx-auto",
            "block",
            "h-screen"
          )}
          data={rows}
          style={{
            margin: "0",
            height: "100vh",

            border: "1px solid black",
            marginBlock: "0 auto",
          }}
          height={"500px"}
          totalCount={rows?.length ?? 0}
          controls
          itemContent={(index, data) => {
            if (!data) return <></>;

            return (
              <div
                id={`${index + 1}-item`}
                key={index}
                className={classnames(
                  "flex",
                  "flex-row",
                  "gap-2",
                  "border",
                  "border-spacing-1",
                  "border-cyan-700",
                  "my-5",
                  "w-full",
                  "block",
                )}
              >
                <span
                  className={classnames(
                    "bg-slate-500",
                    "p-2",
                    "text-white",
                    "font-bold",
                    "w-3",
                  )}
                ></span>
                <div className={classnames("flex", "flex-col", "w-full")}>
                  <div className={classnames("bg-slate-500", "p-2", "w-full")}>
                    <span
                      className={classnames("p-3", "text-white", "font-bold")}
                    >
                      <span>({index + 1})</span> {"  "}
                      {data.data.map((e) => {
                        if (e.type === "aya")
                          return (
                            <span
                              className={classnames("text-yellow-300")}
                            >{` {${e.data.selected}} `}</span>
                          );
                        return e.data || e.initialData;
                      })}
                    </span>
                  </div>

                  {(data?.data || []).map((e, i) => {
                    if (e.type === "aya")
                      return (
                        <AyaComponent
                          onSelect={async (e) =>{
                            const new_rows = handleModalSelect(e, rows || []);
                            setRows(new_rows)
                            const text = JSON.stringify(new_rows)
                            saveProject({
                              projectID: id || "",
                              text:text
                            })
                          }
                           
                          }
                          selected={e.data.selected}
                          index={i}
                          list={e.data.options}
                          id={data.id}
                          key={i}
                        />
                      );
                    return (
                      <TextComponent
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
                            text: text
                          })
                        }}
                        key={i}
                      />
                    );
                  })}
                </div>
              </div>
            );
          }}
        />
      </div>
    </LayoutScreen>
  );
};

export default Page;
