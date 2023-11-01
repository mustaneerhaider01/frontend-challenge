import { Outlet } from "react-router-dom";
import Header from "../Navigation/Header";

function RootLayout() {
  return (
    <div>
      <Header />

      <div className="pt-20 pb-12">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
