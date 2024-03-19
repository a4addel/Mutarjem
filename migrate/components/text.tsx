import { Input } from "antd";
import React, { memo, useState } from "react";
import classnames from "classnames";

type TextComponentProps = {
  value: string;
  onChange: (value: string) => void;
};

const TextComponent = ({
  value,
  onChange,
  direction
}:  TextComponentProps &  {direction: string}) => {
  const [v, setValue] = useState("");

  React.useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <Input.TextArea
       autoSize
       dir={direction}
      className={classnames(
        "max-w-full",
        "text-left",
        "shadow-xl",
        "my-2",
        "w-[calc(100%-20px)]",
        "text-center",
        "bold",
        "font-bold"
        
      )}
      style={{
        direction: `${direction}!important` as any
      }}
      value={v}
      size="large"
      onChange={(event) => setValue(event.target.value)}
      onBlur={() => onChange(v)}
    />
  );
};

export default memo(TextComponent);
