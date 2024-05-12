import { Outlet } from "react-router-dom";

export const AuthRootPage: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap">
      <div>Auth root page</div>
      <Outlet />
    </div>
  );
};
