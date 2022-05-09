import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import styles from "./styles.module.scss";
import "./overrides.scss";
import { requestWithQuerry } from "@/api/apiService";
import { getBookingsFor, getFeedbackFor, methods } from "@/api/constants";
import { PageSize } from "@/common/paginationConstants";
import { useParams } from "react-router-dom";
import { BookingEntityFilled } from "@/common/types/Booking";

export const themeOptions = [
  "appTheme",
  {
    text: {
      primary: "#2a2a2a",
      secondary: "#2a2a2a",
    },
    background: {
      default: "#fff",
    },
    context: {
      background: "#2a2a2a  ",
      text: "#FFFFFF",
    },
    button: {
      default: "#2d2d2d",
      focus: "#2d2d2d",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.2)",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0)",
    },
    selected: {
      default: "rgba(0,0,0,.3)",
      text: "#1d1d1d",
    },
    highlightOnHover: {
      default: "#647aa3",
      text: "#fff",
    },
  },
  "dark",
];

createTheme(...themeOptions);

const columns = [
  {
    name: "",
    selector: (row: { userImage: string }) => row.userImage,
    sortable: false,
  },
  {
    name: "Name",
    selector: (row: { name: string }) => row.name,
  },
  {
    name: "Start date",
    selector: (row: { startDate: Date }) => row.startDate,
  },
  {
    name: "End date",
    selector: (row: { endDate: Date }) => row.endDate,
  },
];

type selectionChangeType = {
  allSelected: boolean;
  selectedCount: number;
  selectedRows: {
    id: number;
    title: string;
    year: string;
  }[];
};

const BookedPeople = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [totalRows, setTotalRows] = useState(-1);
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState<BookingEntityFilled[]>([]);

  const params = useParams();

  const loadMore = async (page = 1) => {
    setLoading(true);
    const data = await requestWithQuerry(getBookingsFor(params.id), methods.GET, {
      limit: PageSize,
      offset: (page - 1) * PageSize,
    });
    const loaded = await data.json();

    setTotalRows(loaded.total);

    const parsed = loaded.data.map((item: BookingEntityFilled) => ({
      ...item,
      name: `${item.userFirstName} ${item.userLastName}`,
    }));

    setBookings(parsed);
    setCurrentPage((s) => s + 1);

    setLoading(false);
  };

  const handlePageChange = async (page: number) => {
    await loadMore(page);
  };

  useEffect(() => {
    async function loadPrikoli() {
      if (params.id) await loadMore();
    }
    loadPrikoli();
  }, []);

  const [selected, setSelected] = useState<BookingEntityFilled[]>([]);

  const handleSelectionChanged = (e: selectionChangeType) => {
    setSelected(e.selectedRows);
    console.log(e);
  };

  return (
    <div>
      <DataTable
        title="Bookings"
        selectableRows
        selectableRowsHighlight
        onSelectedRowsChange={(e) => handleSelectionChanged(e)}
        className={styles.table}
        columns={columns}
        data={bookings}
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

export default BookedPeople;
