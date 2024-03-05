import { HomeFilled } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";



function LandingScreen(ss: any) {
    return <>
    <span className="fixed">
    <Link to={"/"}><Button ><HomeFilled/></Button></Link>

    </span>
        <Flex className="p-8 w-full max-w-8xl">
        {ss.children}
        </Flex>
    </>
}

export default LandingScreen;
