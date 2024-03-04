import { AyaProps, SecondaryListItem } from "../types";

const createAyaObject = ({
  options,
}: {
  options: AyaProps["data"]["options"];
}): Extract<SecondaryListItem, { type: "aya" }> => {
  return {
    data: {
      options: options,
      selected: "Select Translation",
    },
    type: "aya",
  };
};

export default createAyaObject;
