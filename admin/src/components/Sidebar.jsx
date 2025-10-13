import React from "react";
import { NavLink } from "react-router-dom";
import {
  UserRoundCheck,
  ListOrdered,
  List,
  CirclePlus,
  LayoutDashboard,
  Table,
  BookUser,
  Tickets,
} from "lucide-react";
const Sidebar = () => {
  return (
    <div className="sidebar w-[18vw] h-[90vh] border-[1.5px] border-[#a9a9a9] border-t-0 border-b-0 text-[max(1vw,10px)]">
      <div className="sidebar-options pt-[84px] pl-[20%] flex flex-col gap-[20px] ">
        <NavLink
          to="/"
          className="sidebar-option flex items-center gap-[12px] border-1 border-[#a9a9a9] border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer "
        >
          <LayoutDashboard />
          <p className="hidden md:flex">Dashboard</p>
        </NavLink>
        <NavLink
          to="/add"
          className="sidebar-option flex items-center gap-[12px] border-1 border-[#a9a9a9] border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer "
        >
          <CirclePlus />
          <p className="hidden md:flex">Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className="sidebar-option flex items-center gap-[12px] border-1 border-[#a9a9a9] border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer "
        >
          <List />
          <p className="hidden md:flex">List</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="sidebar-option flex items-center gap-[12px] border-1 border-[#a9a9a9] border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer "
        >
          <ListOrdered />
          <p className="hidden md:flex">Orders</p>
        </NavLink>
        <NavLink
          to="/subscribers"
          className="sidebar-option flex items-center gap-[12px] border-1 border-[#a9a9a9] border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer "
        >
          <UserRoundCheck />
          <p className="hidden md:flex">Subscribers</p>
        </NavLink>
        <NavLink
          to="/tablereservation"
          className="sidebar-option flex items-center gap-[12px] border-1 border-[#a9a9a9] border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer "
        >
          <Table />
          <p className="hidden md:flex">Add Tables</p>
        </NavLink>
        <NavLink
          to="/reservationlist"
          className="sidebar-option flex items-center gap-[12px] border-1 border-[#a9a9a9] border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer "
        >
          <BookUser />
          <p className="hidden md:flex">Reservations</p>
        </NavLink>
        <NavLink
          to="/promocodes"
          className="sidebar-option flex items-center gap-[12px] border-1 border-[#a9a9a9] border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer "
        >
          <Tickets />
          <p className="hidden md:flex">Promo Codes</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

// 4:47
