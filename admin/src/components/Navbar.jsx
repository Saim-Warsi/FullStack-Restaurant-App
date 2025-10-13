import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar flex justify-between items-center p-[8px_4%]">
      <Link to="/" className="inline-block" style={{ width: "auto" }}>
        <img
          className=""
          style={{
            width: "max(10%, 80px)",
            height: "auto",
          }}
          src={assets.logo}
          alt=""
        />
      </Link>
      <img
        className="w-[max(4%,40px)] md:w-[max(3%,30px)] lg:w-[max(2.5%,25px)]"
        src={assets.profile_image}
        alt=""
      />
    </div>
  );
};

export default Navbar;
