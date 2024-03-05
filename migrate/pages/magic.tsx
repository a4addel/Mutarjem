import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { Virtuoso, } from "react-virtuoso";
import TextComponent from "../components/text";
import AyaComponent from "../components/ayah";
import handleModalSelect from "../helpers/handle-modal-select";
import handleText from "../helpers/handle-text-change";
import { PrimaryListItem } from "../types";

// import DeepL_JOSN_To_State_Format from "../helpers/DeepL_JOSN_To_State_Format";
// import DallEData from "../data/data.json";


import ExportSRTComp from "../components/export-srt";

import LayoutScreen from "../../src/screens/layout";
import saveProject from "../../src/helpers/save-edit";
import { useParams } from "react-router-dom";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { Flex } from "antd";


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
    readTextFile(`Motarjem/projects/${id}/text.text`, {dir: BaseDirectory.Home }).then(e => {
      setRows(JSON.parse(e))
    }).finally(() => {
      
    })

  
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(rows));
  }, [rows]);

  return (
    <LayoutScreen>
      <ExportSRTComp state={rows || []} />
     
      <div className={classnames("max-w-7xl", "mx-auto", "w-full")}>

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
            "h-screen",
            "w-full",
            "p-[17px]"
          )}
          data={rows}
          style={{
            margin: "0",
            height: "clac(100vh - 200px)",
            width:"100%",
            border: "1px solid black",
            marginBlock: "0 auto",
            padding: "10px 0"
            
          }}
          
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
                  "border",
                  "border-spacing-1",
                  "border-cyan-700",
                  "my-5",
                  "block",
                  
                )}
              >
                <span
                  className={classnames(
                    "bg-sky-500",
                    "text-white",
                    "font-bold",
                    "w-5",
                    "py-5"
                    
                  )}
                >
                  <div className="rotate-90">({index + 1})</div>
                </span>
                <Flex className={classnames("flex", "flex-col", "w-full")}>
                  <div className={classnames("bg-sky-500", "p-2", "w-full", "text-center", "w-[calc(100%-20px)]")}>
                   
                      
                      {data.data.map((e) =>  (e.type === "aya") ? <span className="font-yellow gray">{e.data.selected}</span>:  e.data || e.initialData)}
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
                              text:text,
                              itemCount: index + ""
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
                            text: text,
                            itemCount:index + ""
                          })
                        }}
                        key={i}
                      />
                    );
                  })}
                </Flex>
              </div>
            );
          }}
        />
      </div>
    </LayoutScreen>
  );
};

export default Page;
