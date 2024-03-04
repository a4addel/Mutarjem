import { SecondaryListItem } from "../types";

const createText = ({
  initialData,
}: {
  initialData: string;
}): Extract<SecondaryListItem, { type: "text" }> => {
  return {
    data: "",
    initialData: initialData,
    type: "text" as const,
  };
};

export default createText;
