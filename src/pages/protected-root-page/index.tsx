import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../widgets/header";
import { Sidebar } from "../../widgets/sidebar";
import { useMeQuery } from "../../providers/store/api/authApi";
import { useEffect, useState } from "react";
import { LogoutModal } from "../../widgets/logout-modal";

export const ProtectedRootPage: React.FC = () => {
  // Naviate
  const navigate = useNavigate();

  // Check if user is logged in
  const { isError } = useMeQuery();

  useEffect(() => {
    if (isError) {
      navigate(`/auth/login`);
    }
  }, [isError]);

  // Logout modal
  const [isShowLogout, setIsShowLogout] = useState<boolean>(false);

  return (
    <div>
      <Header onLogoutClick={() => setIsShowLogout(true)} />
      <div className="flex flex-row">
        <Sidebar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>

      <LogoutModal show={isShowLogout} onClose={() => setIsShowLogout(false)} />
    </div>
  );
};
