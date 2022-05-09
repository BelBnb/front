import { userBookings } from "@/types/dto/apiPayloads/booking/userBookingsPayload";
import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import "./overrides.scss";

const userBookingColumns: TableColumn<userBookings>[] = [
  { name: "Hotel id", selector: (row) => row.hotelId, sortable: true },
  { name: "Start date", selector: (row) => row.startDate, sortable: true },
  { name: "End date", selector: (row) => row.endDate, sortable: true },
];

interface UserBookingsProps {
  data: userBookings[];
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
