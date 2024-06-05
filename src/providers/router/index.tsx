import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  // Auth pages
  {
    path: "/auth",
    children: [
      {
        path: "login",
        lazy: async () => {
          const LoginPage = (await import("../../pages/login-page")).LoginPage;

          return {
            element: <LoginPage />,
          };
        },
      },
      {
        path: "change-password",
        lazy: async () => {
          const ChangePasswordPage = (
            await import("../../pages/change-password-page")
          ).ChangePasswordPage;
          return {
            element: <ChangePasswordPage />,
          };
        },
      },
    ],
  },

  // Protected pages
  {
    path: "/",
    lazy: async () => {
      const ProtectedRootPage = (
        await import("../../pages/protected-root-page")
      ).ProtectedRootPage;

      return {
        element: <ProtectedRootPage />,
      };
    },
    children: [
      // Plan management pages
      {
        path: "plan-management",
        children: [
          {
            path: "",
            lazy: async () => {
              const PlanManagementListPage = (
                await import("../../pages/plan-management-list")
              ).PlanManagementList;

              return {
                element: <PlanManagementListPage />,
              };
            },
          },
        ],
      },

      // User management pages
      {
        path: "user-management",
        children: [
          {
            path: "",
            lazy: async () => {
              const UserManagementListPage = (
                await import("../../pages/user-management-list")
              ).UserManagementList;

              return {
                element: <UserManagementListPage />,
              };
            },
          },
        ],
      },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
