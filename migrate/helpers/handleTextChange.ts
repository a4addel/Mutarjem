import saveProject from "../../src/helpers/save-edit";
import { PrimaryListItem } from "../types";

const handleText = (
  { id, index, value }: { id: string; index: number; value: string },
  rows: PrimaryListItem[],
) => {
  if (!rows) {
    return;
  }

  const newRows = rows.map((row) => {
    if (row.id === id) {
      return {
        ...row,
        data: row.data.map((col, i) => {
          if (i === index && col.type === "text") {
            return {
              ...col,
              data: value,
            };
          }
          return col;
        }),
      };
    }
    return row;
  });
  try {
     return newRows;
  } catch (error) {
    return newRows;

  }
};

export default handleText;
