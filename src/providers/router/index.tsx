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

      {
        path: "forgot-password",
        lazy: async () => {
          const ForgotPasswordPage = (
            await import("../../pages/forgot-password-page")
          ).ForgotPasswordPage;
          return {
            element: <ForgotPasswordPage />,
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
          {
            path: "detail",
            lazy: async () => {
              const PlanDetailRootPage = (
                await import("../../pages/plan-detail-root-page")
              ).PlanDetailRootPage;

              return {
                element: <PlanDetailRootPage />,
              };
            },
            children: [
              {
                path: "expenses",
                lazy: async () => {
                  const PlanDetailExpensePage = (
                    await import("../../pages/plan-detail-expense-page")
                  ).PlanDetailExpensePage;

                  return {
                    element: <PlanDetailExpensePage />,
                  };
                },
              },
              {
                path: "information",
                lazy: async () => {
                  const PlanDetailInformationPage = (
                    await import("../../pages/plan-detail-information-page")
                  ).PlanDetailInformationPage;

                  return {
                    element: <PlanDetailInformationPage />,
                  };
                },
              },
              {
                path: "version",
                lazy: async () => {
                  const PlanDetailVersionPage = (
                    await import("../../pages/plan-detail-version-page")
                  ).PlanDetailVersionPage;

                  return {
                    element: <PlanDetailVersionPage />,
                  };
                },
              },
            ],
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

          {
            path: "detail",
            lazy: async () => {
              const UserDetailPage = (
                await import("../../pages/user-detail-page")
              ).UserDetail;

              return {
                element: <UserDetailPage />,
              };
            },
          },

          {
            path: "create",
            lazy: async () => {
              const UserCreate = (await import("../../pages/user-create-page"))
                .UserCreate;

              return {
                element: <UserCreate />,
              };
            },
          },

          {
            path: "user-edit",
            lazy: async () => {
              const UserEdit = (await import("../../pages/user-edit-page"))
                .UserEdit;

              return {
                element: <UserEdit />,
              };
            },
          },
        ],
      },

      // Profile pages
      {
        path: "profile",
        children: [
          {
            path: "",
            lazy: async () => {
              const ProfilePage = (await import("../../pages/profile")).Profile;
              return {
                element: <ProfilePage />,
              };
            },
          },
        ],
      },

      // Term management pages
      {
        path: "term-management",
        children: [
          {
            path: "",
            lazy: async () => {
              const TermManagementListPage = (
                await import("../../pages/term-management-list")
              ).TermManagementList;

              return {
                element: <TermManagementListPage />,
              };
            },
          },
        ],
      },

      // Profile pages
      {
        path: "profile",
        children: [
          {
            path: "",
            lazy: async () => {
              const ProfilePage = (await import("../../pages/profile")).Profile;
              return {
                element: <ProfilePage />,
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
