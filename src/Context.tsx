import { useCallback, useState, createContext } from "react";
import { columns } from "./models/columns";
import { FetchDataStatus } from "./models/FetchDataStatus";
const Context = createContext(null);

function ContextProvider({ children }) {
  const [fetchDataStatus, setFetchDataStatus] = useState(
    FetchDataStatus.Pending
  );
  const [fetchDataError, setFetchDataError] = useState("");
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  async function fetchAPIData({ limit, page }) {
    try {
      setFetchDataStatus(FetchDataStatus.Pending);
      const response = await fetch(
        `http://localhost:3000/people?_page=${page}&_limit=${limit}`
      );
      const count = Number(response.headers.get("X-Total-Count"));
      const data = await response.json();
      setData(data);
      setPageCount(Math.round(count / limit));
      setFetchDataStatus(FetchDataStatus.Success);
    } catch (e) {
      console.error("Error while fetching", e);
      setFetchDataStatus(FetchDataStatus.Error);
      setFetchDataError(String(e));
    }
  }

  const fetchData = useCallback(({ limit, page }) => {
    fetchAPIData({
      limit,
      page,
    });
  }, []);

  return (
    <Context.Provider
      value={{
        fetchDataStatus,
        fetchDataError,
        data,
        columns,
        fetchData,
        pageCount,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };