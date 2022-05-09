import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import "./overrides.scss";
import { BookingEntityFilled } from "@/common/types/Booking";
import { Link } from "react-router-dom";

const userBookingColumns: TableColumn<BookingEntityFilled>[] = [
  {
    name: "",
    selector: (row) => <img src={JSON.parse(row.hotelImage)[0]}></img>,
  },
  {
    name: "Hotel",
    selector: (row: { hotelName: string; hotelId: string }) => (
      <Link to={"/hotels/" + row.hotelId}>{row.hotelName}</Link>
    ),
    sortable: true,
  },
  { name: "Start date", selector: (row: { startDate: Date }) => row.startDate, sortable: true },
  { name: "End date", selector: (row: { endDate: Date }) => row.endDate, sortable: true },
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
