import { Header } from "../../widgets/header";
import { Sidebar } from "../../widgets/sidebar";

export const ProtectedRootPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Sidebar />
    </div>
  );
};
