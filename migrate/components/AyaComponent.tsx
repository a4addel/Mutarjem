import { Select } from "antd";
import { memo } from "react";

type AyaComponentProps = {
  id: string;
  list: {
    edition: string;
    text: string;
  }[];
  index: number;
  selected: string;
  onSelect: ({
    value,
    index,
    id,
  }: {
    value: string;
    index: number;
    id: string;
  }) => void;
};

const AyaComponent: React.FC<AyaComponentProps> = ({
  id,
  list,
  index,
  selected,
  onSelect,
}) => {
  return (
    <Select
      placeholder={`-- Select Translation --`}
      onChange={(e) => {
        onSelect({
          id: id,
          index: index,
          value: e,
        });
      }}
      value={selected}
      options={list.map((e) => ({
        label: (
          <span>
            <b>({e.edition})</b>
            {"  "}
            <i>{e.text}</i>
          </span>
        ),
        value: e.text,
      }))}
    />
  );
};

export default memo(AyaComponent);
