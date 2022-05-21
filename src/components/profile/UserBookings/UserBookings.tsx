import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import "./overrides.scss";
import { BookingEntityFilled } from "@/common/types/Booking";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { requestWithBody } from "@/api/apiService";
import { updateBooking } from "@/api/constants";

const statusLabel = (isActive: boolean, itemId: string) => {
  if (isActive) {
    return <span style={{ color: "green" }}>Active</span>;
  }
  return <span style={{ color: "red" }}>Disabled</span>;
};

const userBookingColumns: TableColumn<BookingEntityFilled>[] = [
  {
    name: "",
    selector: (row) => (
      <div>
        <img className={styles.roundedImage} src={JSON.parse(row.hotelImage)[0]} alt="prikolchik" />
      </div>
    ),
  },
  {
    name: "Hotel",
    selector: (row: { hotelName: string; hotelId: string }) => (
      <Link to={`/hotel/${row.hotelId}`}>{row.hotelName}</Link>
    ),
    sortable: true,
  },
  { name: "Start date", selector: (row: { startDate: Date }) => row.startDate, sortable: true },
  { name: "End date", selector: (row: { endDate: Date }) => row.endDate, sortable: true },
  {
    name: "Status",
    selector: (row: { isActive: boolean; id: string }) => statusLabel(row.isActive, row.id),
  },
];

interface UserBookingsProps {
  data: BookingEntityFilled[];
  totalRows: number;
  onChangeRowsPerPage: (e: number) => void;
  onChangePage: (e: number) => void;
}

const UserBookings: React.FC<UserBookingsProps> = ({ data, totalRows, onChangePage, onChangeRowsPerPage }) => (
  <div>
    <DataTable
      title="You booked"
      selectableRows
      selectableRowsHighlight
      columns={userBookingColumns}
      data={data}
      pagination
      paginationServer
      onChangeRowsPerPage={onChangeRowsPerPage}
      onChangePage={onChangePage}
      paginationTotalRows={totalRows}
      theme="appTheme"
    />
  </div>
);

export default UserBookings;
