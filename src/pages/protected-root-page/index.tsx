import { Outlet } from "react-router-dom";
import { Header } from "../../widgets/header";
import { Sidebar } from "../../widgets/sidebar";

export const ProtectedRootPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-row">
        <Sidebar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
