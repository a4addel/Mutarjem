import { Button } from "antd";
import { Link } from "react-router-dom";

function LandingScreen() {
  return (
    <>
      <div className="w-full flex items-center">
        <div className="w-full flex flex-col max-w-6xl mx-auto  justify-center">
          <Link to={"/new"}>
            <Button className="w-full !h-20 text-5xl">جديد</Button>
          </Link>
          <Link to={"/choose"}>
            <Button className="w-full !h-20 text-5xl">استكمال</Button>
          </Link>
          <Link to={"/settings"}>
            <Button className="w-full !h-20 text-5xl">الاعدادات</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default LandingScreen;
