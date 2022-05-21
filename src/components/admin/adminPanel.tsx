/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unescaped-entities */
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import React, { useEffect, useState } from "react";
import { updateUserRoute } from "@/api/constants";
import { PageSize } from "@/common/paginationConstants";
import userApi from "@/api/user/userApi";
import { BookingEntityFilled } from "@/common/types/Booking";
import { Link, useParams } from "react-router-dom";
import { requestWithBody } from "@/api/apiService";
import styles from "@/components/hotels/bookedPeople/styles.module.scss";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { RoleEnum } from "@/common/role.enum";
import FilterComponent from "@/elements/admin/FilterComponent/FilterComponent";

const changeStatusButton = (isBlocked: boolean, itemId: string, user = null) => {
  if (user?.id === itemId) return "I am";
  if (!isBlocked) {
    return (
      <button
        type="button"
        onClick={async () => {
          if (confirm("Block user?")) {
            toast.promise(
              requestWithBody(updateUserRoute(itemId), "PUT", {
                isBanned: true,
              }),
              {
                pending: "Otpravlyaem",
                success: "Ezhzhzhi",
                error: {
                  render({ data }) {
                    return data.message[0] || data.message;
                  },
                },
              }
            );
          }
        }}
        style={{ color: "green" }}
      >
        Unblocked
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={async () => {
        if (confirm("Unblock user?")) {
          toast.promise(
            requestWithBody(updateUserRoute(itemId), "PUT", {
              isBanned: false,
            }),
            {
              pending: "Otpravlyaem",
              success: "Ezhzhzhi",
              error: {
                render({ data }) {
                  return data.message[0] || data.message;
                },
              },
            }
          );
        }
      }}
      style={{ color: "red" }}
    >
      Blocked
    </button>
  );
};

const AdminPanel = () => {
  const user = useSelector<RootState, User>((el) => el.user);

  if (user.role !== RoleEnum.Admin) return <>You are not admin.</>;

  const columns = [
    {
      name: "",
      selector: (row: { profilePic: string }) => (
        <div className={styles.imageWrapper}>
          <img
            className={styles.roundedImage}
            src={row.profilePic || "https://media2.giphy.com/media/7ZKpmNlwNnHWM/giphy.gif"}
            alt="prikol"
          />
        </div>
      ),
      sortable: false,
    },
    {
      name: "Name",
      selector: (row: { firstName: string; lastName: string; id: string }) => (
        <Link to={`/profile/${row.id}`}>
          {row.firstName} {row.lastName}
        </Link>
      ),
    },
    {
      name: "Username",
      selector: (row: { username: string }) => `@${row.username}`,
    },
    {
      name: "Role",
      selector: (row: { role: RoleEnum }) => (row.role === RoleEnum.User ? "User" : "Admin"),
    },
    {
      name: "Status",
      selector: (row: { isBanned: boolean; id: string }) => changeStatusButton(row.isBanned, row.id, user),
    },
  ];
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);

  const [totalRows, setTotalRows] = useState(-1);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  useEffect(() => {
    async function load() {
      const data = await userApi.getUsersFiltered({
        limit: PageSize,
        offset: 0,
        text: filterText,
      });
      console.log("DAta ", data);
      const parsed = data;
      setUsers(parsed.data);
    }
    load();
  }, [filterText]);

  const loadMore = async (page = 1) => {
    setLoading(true);
    const data = await userApi.getUsersFiltered({
      limit: PageSize,
      offset: (page - 1) * PageSize,
      text: filterText,
    });
    const loaded = data;

    setTotalRows(loaded.total);

    const parsed = loaded.data.map((item: User) => ({
      ...item,
      name: `${item.firstName} ${item.lastName}`,
    }));
    console.log(parsed);
    setUsers(parsed);
    setCurrentPage((s) => s + 1);

    setLoading(false);
  };

  const handlePageChange = async (page: number) => {
    await loadMore(page);
  };

  useEffect(() => {
    async function loadPrikoli() {
      await loadMore();
    }
    loadPrikoli();
  }, []);

  const [selected, setSelected] = useState<BookingEntityFilled[]>([]);

  const handleSelectionChanged = (e) => {
    setSelected(e.selectedRows);
    console.log(e);
  };

  // const filteredItems = fakeUsers.filter(
  //   (item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  // );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={() => handleClear()}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className={styles.marginBot}>
      <DataTable
        title="Users"
        selectableRows
        selectableRowsHighlight
        onSelectedRowsChange={(e) => handleSelectionChanged(e)}
        className={styles.table}
        columns={columns}
        data={users}
        theme="appTheme"
        progressPending={loading}
        persistTableHead
        pagination
        paginationServer
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationTotalRows={totalRows}
        paginationPerPage={PageSize}
        paginationRowsPerPageOptions={[PageSize]}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default AdminPanel;
