import { Input } from "antd";
import React, { memo, useState } from "react";
import classnames from "classnames";

type TextComponentProps = {
  value: string;
  onChange: (value: string) => void;
};

const TextComponent: React.FC<TextComponentProps> = ({
  value,
  onChange,
}: {
  value: string;
  onChange: Function;
}) => {
  const [v, setValue] = useState("");

  React.useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <Input.TextArea
      autoSize
      className={classnames(
        "max-w-full",
        "text-left",
        "shadow-xl",
        "my-2",
        "w-[calc(100%-20px)]"
      )}
      value={v}
      size="large"
      onChange={(event) => setValue(event.target.value)}
      onBlur={() => onChange(v)}
    />
  );
};

export default memo(TextComponent);
