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
      {
        path: "otp",
        lazy: async () => {
          const OtpPage = (await import("../../pages/otp-page")).OtpPage;
          return {
            element: <OtpPage />,
          };
        },
      },
      {
        path: "reset-password",
        lazy: async () => {
          const ResetPasswordPage = (
            await import("../../pages/reset-password-page")
          ).ResetPasswordPage;
          return {
            element: <ResetPasswordPage />,
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
                path: "expenses/:planId",
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
                path: "information/:planId",
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
                path: "version/:planId",
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
            path: "detail/:userId",
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
            path: "edit/:userId",
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

          {
            path: "update",
            lazy: async () => {
              const TermUpdatePage = (
                await import("../../pages/term-update-page")
              ).TermUpdate;

              return {
                element: <TermUpdatePage />,
              };
            },
          },

          {
            path: "detail",
            lazy: async () => {
              const TermDetailRootPage = (
                await import("../../pages/term-detail-root-page")
              ).TermDetailRootPage;

              return {
                element: <TermDetailRootPage />,
              };
            },

            children: [
              {
                path: "information",
                lazy: async () => {
                  const TermDetailInformationPage = (
                    await import("../../pages/term-detail-information-page")
                  ).TermDetailInformationPage;

                  return {
                    element: <TermDetailInformationPage />,
                  };
                },
              },
              {
                path: "plan",
                lazy: async () => {
                  const TermDetailPlanPage = (
                    await import("../../pages/term-detail-plan-page")
                  ).TermDetailPlanPage;

                  return {
                    element: <TermDetailPlanPage />,
                  };
                },
              },
              {
                path: "report",
                lazy: async () => {
                  const TermDetailReportPage = (
                    await import("../../pages/term-detail-report-page")
                  ).TermDetailReportPage;

                  return {
                    element: <TermDetailReportPage />,
                  };
                },
              },
            ],
          },
        ],
      },

      // Financial Report pages
      {
        path: "report-management",
        children: [
          {
            path: "",
            lazy: async () => {
              const ReportManagementListPage = (
                await import("../../pages/report-management-page")
              ).ReportManagementList;

              return {
                element: <ReportManagementListPage />,
              };
            },
          },
        ],
      },

      // Financial Report pages
      {
        path: "annual-report",
        children: [
          {
            path: "",
            lazy: async () => {
              const AnnualReportListPage = (
                await import("../../pages/annual-report-page")
              ).AnnualReportList;

              return {
                element: <AnnualReportListPage />,
              };
            },
          },

          {
            path: "detail",
            lazy: async () => {
              const AnnualReportDetailRootPage = (
                await import("../../pages/annual-report-detail-root-page")
              ).AnnualReportDetailRootPage;

              return {
                element: <AnnualReportDetailRootPage />,
              };
            },
            children: [
              {
                path: "chart/:annualReportId",
                lazy: async () => {
                  const AnnualReportDetailChartPage = (
                    await import("../../pages/annual-report-detail-chart-page")
                  ).AnnualReportDetailChartPage;

                  return {
                    element: <AnnualReportDetailChartPage />,
                  };
                },
              },
              {
                path: "table/:annualReportId",
                lazy: async () => {
                  const AnnualReportDetailTablePage = (
                    await import("../../pages/annual-report-detail-table-page")
                  ).AnnualReportDetailTablePage;

                  return {
                    element: <AnnualReportDetailTablePage />,
                  };
                },
              },
            ],
          },
        ],
      },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
