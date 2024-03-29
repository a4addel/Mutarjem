import React from "react";
import { Spin } from "antd";
import classnames from "classnames";
React;

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading)
    return (
      <div
        className={classnames(
          "absolute",
          "top-0",
          "left-0",
          "w-full",
          "h-full",
        )}
      >
        <Spin />
      </div>
    );
  return <></>;
};
export default Loading;
