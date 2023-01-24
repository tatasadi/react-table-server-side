import { Context } from "../Context";
import { useContext } from "react";

import Table from "../components/table/Table";

export default function Home(props) {
  const {
    fetchDataStatus,
    fetchDataError,
    data,
    columns,
    fetchData,
    pageCount,
  } = useContext(Context);
  return (
    <>
      <div className="p-8">
        <Table
          data={data}
          columns={columns}
          fetchData={fetchData}
          pageCount={pageCount}
          fetchDataStatus={fetchDataStatus}
          fetchDataError={fetchDataError}
        />
      </div>
    </>
  );
}
