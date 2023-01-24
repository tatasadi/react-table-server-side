import { SelectColumnFilter } from "../components/table/Filtering";

export const columns = [
  {
    Header: "id",
    accessor: "id", // accessor is the "key" in the data,
  },
  {
    Header: "first_name",
    accessor: "first_name",
  },
  {
    Header: "last_name",
    accessor: "last_name",
  },
  {
    Header: "email",
    accessor: "email",
  },
  {
    Header: "gender",
    accessor: "gender",
    filter: "includes",
    Filter: SelectColumnFilter,
  },
];
