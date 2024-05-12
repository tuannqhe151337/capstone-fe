import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../../pages/login-page";
import { SignupPage } from "../../pages/signup-page";

const router = createBrowserRouter([
  {
    path: "/auth",
    lazy: async () => {
      const Page = (await import("../../pages/auth-root-page")).AuthRootPage;

      return {
        element: <Page />,
      };
    },
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "/",
    lazy: async () => {
      const Page = (await import("../../pages/protected-root-page"))
        .ProtectedRootPage;

      return {
        element: <Page />,
      };
    },
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
