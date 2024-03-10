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
  ...rest
}) => {
  return (
    <Select
    {...rest}
      placeholder={`-- Select Translation --`}
      onChange={(e) => {
        onSelect({
          id: id,
          index: index,
          value: e,
        });
      }}
      className="w-[calc(100%-20px)] text-center shadow-lg"
      value={selected ? selected: (list.length > 0 ? list[0].text: "")}
      defaultActiveFirstOption
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
