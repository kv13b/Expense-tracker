import React, { ReactNode } from "react";
import SideNavBar from "./_components/SideNavBar";
import DashBoardHeader from "./_components/DashBoardHeader";

interface DashBoardRouteProps {
  children: ReactNode;
}
function DashBoardRoute({ children }: DashBoardRouteProps) {
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">{<SideNavBar />} </div>
      <div className="md:ml-64">
        <DashBoardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashBoardRoute;
