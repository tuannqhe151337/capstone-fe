import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../widgets/header";
import { Sidebar } from "../../widgets/sidebar";
import { useMeQuery } from "../../providers/store/api/authApi";
import { useEffect } from "react";

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
