import { faBell } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const Header = () => {
  return (
    <div className="header w-full flex justify-between items-center px-12 py-5 bg-white border-b border-b-slate-200">
      <div>
        <p className="text-xl font-bold text-gray-900 mb-2">Welcome Back</p>
        {/* <p className="text-gray-500">Hello User, Good Morning!</p> */}
      </div>
      {/* <div>
        <button type="button" className=" bg-slate-100 h-9 w-9 rounded-full">
          <FontAwesomeIcon icon={faBell} />
        </button>
      </div> */}
    </div>
  );
};

export default Header;
