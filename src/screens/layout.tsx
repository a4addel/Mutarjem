import { Button } from "antd";
import { Link } from "react-router-dom";



function LandingScreen(ss: any) {
    return <>
        <Link to={"/"}><Button className="w-full !h-20 text-5xl" >HOME</Button></Link>
        {ss.children}
    </>
}

export default LandingScreen;
