import { HomeFilled } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";

function LandingScreen(ss: any) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <span className="fixed z-[99999999999]">
        <Link to={"/"}>
          <Button className="">
            <HomeFilled />
          </Button>
        </Link>
      </span>
      {ss.children}
    </div>
  );
}

export default LandingScreen;
