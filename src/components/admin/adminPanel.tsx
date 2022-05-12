/* eslint-disable react/no-unescaped-entities */
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import { useEffect, useState } from "react";
import { updateBooking, updateUserRoute } from "@/api/constants";
import { PageSize } from "@/common/paginationConstants";
import userApi from "@/api/user/userApi";
import { BookingEntityFilled } from "@/common/types/Booking";
import { Link, useParams } from "react-router-dom";
import { requestWithBody } from "@/api/apiService";
import styles from "@/components/hotels/bookedPeople/styles.module.scss";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { RoleEnum } from "@/common/role.enum";

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
              { pending: "Otpravlyaem", success: "Ezhzhzhi", error: "Ashibka" }
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
            { pending: "Otpravlyaem", success: "Ezhzhzhi", error: "Ashibka" }
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
  const columns = [
    {
      name: "",
      selector: (row: { userImage: string }) => (
        <div className={styles.imageWrapper}>
          <img
            className={styles.roundedImage}
            src={row.userImage || "https://media2.giphy.com/media/7ZKpmNlwNnHWM/giphy.gif"}
            alt="prikol"
          />
        </div>
      ),
      sortable: false,
    },
    {
      name: "Name",
      selector: (row: { firstName: string; lastName: string; id: string }) => {
        return (
          <Link to={`/profile/${row.id}`}>
            {row.firstName} {row.lastName}
          </Link>
        );
      },
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

  const user = useSelector<RootState, User>((el) => el.user);

  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);

  const [totalRows, setTotalRows] = useState(-1);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(async () => {
    const data = await userApi.getUsers({
      limit: PageSize,
      offset: 0,
    });
    const parsed = await data.json();
    setUsers(parsed.data);
  }, []);

  const loadMore = async (page = 1) => {
    setLoading(true);
    const data = await userApi.getUsers({
      limit: PageSize,
      offset: (page - 1) * PageSize,
    });
    const loaded = await data.json();

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
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={PageSize}
        paginationRowsPerPageOptions={[PageSize]}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default AdminPanel;
