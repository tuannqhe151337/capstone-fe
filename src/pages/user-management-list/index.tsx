import { useEffect, useMemo, useRef, useState } from "react";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Button } from "../../shared/button";
import { ListUserFiler } from "../../widgets/list-user-filter";
import { HiUserAdd } from "react-icons/hi";
import { Row, TableUserManagement } from "../../widgets/user-plan";
import { motion, Variants } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ListUserParameters,
  useLazyFetchUsersQuery,
} from "../../providers/store/api/usersApi";
import _ from "lodash";

const generateEmptyUsers = (total: number): Row[] => {
  const users: Row[] = [];

  for (let i = 0; i < total; i++) {
    users.push({
      userId: 0,
      username: "",
      department: {
        id: 0,
        name: "",
      },
      email: "",
      position: {
        id: 0,
        name: "",
      },
      role: {
        id: 0,
        code: "",
        name: "",
      },
      deactivate: false,
      createdAt: "",
      updatedAt: "",
      isFetching: true,
    });
  }

  return users;
};

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const staggerChildrenAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
  [AnimationStage.VISIBLE]: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
};

const childrenAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const UserManagementList: React.FC = () => {
  // Navigation
  const navigate = useNavigate();

  // Query
  const [fetchUser, { data, error, isFetching }] = useLazyFetchUsersQuery();

  // Searchbox state
  const [searchboxValue, setSearchboxValue] = useState<string>("");

  const [roleId, setRoleId] = useState<number | null>();
  const [departmentId, setDepartmentId] = useState<number | null>();
  const [positionId, setPositionId] = useState<number | null>();

  const [page, setPage] = useState<number>(1);

  // Is fetched data emptied (derived from data)
  const [isDataEmpty, setIsDataEmpty] = useState<boolean>();

  useEffect(() => {
    setIsDataEmpty(!isFetching && data && data.data && data.data.length === 0);
  }, [data]);

  // Fetch user on change
  useEffect(() => {
    fetchUser({ page: 1, pageSize: 10 });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const paramters: ListUserParameters = {
        query: searchboxValue,
        page,
        pageSize: 10,
      };

      if (roleId) {
        paramters.roleId = roleId;
      }

      if (departmentId) {
        paramters.departmentId = departmentId;
      }

      if (positionId) {
        paramters.positionId = positionId;
      }

      fetchUser(paramters, true);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchboxValue, page, roleId, departmentId, positionId]);

  return (
    <motion.div
      className="px-6 pb-10"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      {/* Banner */}
      <BubbleBanner>
        <div className="flex flex-row flex-wrap w-full items-center mt-auto">
          <p className="text-primary dark:text-primary/70 font-extrabold text-2xl w-fit ml-7">
            User management
          </p>
          <div className="ml-auto">
            <Button
              onClick={() => {
                navigate(`/user-management/create`);
              }}
            >
              <div className="flex flex-row flex-wrap items-center gap-2">
                <HiUserAdd className="text-xl mb-0.5" />
                <p className="text-sm font-bold">Add new user</p>
              </div>
            </Button>
          </div>
        </div>
      </BubbleBanner>

      <motion.div variants={childrenAnimation}>
        <ListUserFiler
          searchboxValue={searchboxValue}
          onSearchboxChange={(value) => {
            setSearchboxValue(value);
          }}
          onDepartmentIdChange={(departmentId) => {
            setDepartmentId(departmentId);
          }}
          onRoleIdChange={(roleId) => {
            setRoleId(roleId);
          }}
          onPositionIdChange={(positionId) => {
            setPositionId(positionId);
          }}
        />
      </motion.div>

      <motion.div variants={childrenAnimation}>
        <TableUserManagement
          users={isFetching ? generateEmptyUsers(10) : data?.data}
          isDataEmpty={isDataEmpty}
          page={page}
          totalPage={data?.pagination.numPages}
          onNext={() =>
            setPage((prevPage) => {
              if (data?.pagination.numPages) {
                if (prevPage + 1 > data?.pagination.numPages) {
                  return data?.pagination.numPages;
                } else {
                  return prevPage + 1;
                }
              } else {
                return 1;
              }
            })
          }
          onPageChange={(page) => {
            setPage(page || 1);
          }}
          onPrevious={() =>
            setPage((prevPage) => {
              if (data?.pagination.numPages) {
                if (prevPage === 1) {
                  return 1;
                } else {
                  return prevPage - 1;
                }
              } else {
                return 1;
              }
            })
          }
          isFetching={isFetching}
        />
      </motion.div>
    </motion.div>
  );
};
