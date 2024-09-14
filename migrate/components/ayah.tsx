import React, { memo } from "react";
import { Select } from "antd";

type ListItem = {
  edition: string;
  text: string;
};

type AyaComponentProps = {
  id: string;
  list: ListItem[];
  index: number;
  selected: string;
  onSelect: (params: { value: string; index: number; id: string }) => void;
};

const AyaComponent: React.FC<AyaComponentProps> = ({
  id,
  list,
  index,
  selected,
  onSelect,
  ...rest
}) => {
  return (
    <Select
      {...rest}
      placeholder="-- Select Translation --"
      onChange={(value: string) => {
        onSelect({
          id,
          index,
          value,
        });
      }}
      className="w-[calc(100%-20px)] text-center shadow-lg font-bold"
      value={selected || (list.length > 0 ? list[0].text : "")}
      defaultActiveFirstOption
      options={list.map((item) => ({
        label: (
          <span>
            <b>({item.edition})</b> <i>{item.text}</i>
          </span>
        ),
        value: item.text,
      }))}
    />
  );
};

export default memo(AyaComponent);
