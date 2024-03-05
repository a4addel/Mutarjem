import { PrimaryListItem } from "../types";

const handleModalSelect = (
  { id, index, value }: { id: string; index: number; value: string },
  state: PrimaryListItem[],
) => {
  if (!state) {
    return;
  }

  const newRows = state.map((row) => {
    if (row.id === id) {
      const updatedRow = {
        ...row,
        data: row.data.map((col, i) => {
          if (i === index && col.type === "aya") {
            const updatedCol = {
              ...col,
              data: {
                ...col.data,
                selected: value,
              },
            };
            console.log(updatedCol);

            return updatedCol;
          }
          return col;
        }),
      };
      return updatedRow;
    }
    return row;
  });

  return newRows;
};

export default handleModalSelect;
