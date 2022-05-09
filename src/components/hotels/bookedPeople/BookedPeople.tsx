import React, { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import styles from "./styles.module.scss";
import "./overrides.scss";

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
    name: "Title",
    selector: (row: { title: string }) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row: { year: string }) => row.year,
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
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
  const [selected, setSelected] = useState<typeof data>([]);

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
        pagination
        className={styles.table}
        columns={columns}
        data={data}
        theme="appTheme"
      />
    </div>
  );
};

export default BookedPeople;
