import { useMemo, useEffect } from "react";
import {
  useTable,
  useFlexLayout,
  usePagination,
  useFilters,
  useSortBy,
  useExpanded,
} from "react-table";
import { DefaultColumnFilter, Filter } from "./Filtering";
import Pagination from "./Pagination";
import { SortIcon, SortUpIcon, SortDownIcon } from "../Icons";
import RiseLoader from "react-spinners/RiseLoader";
import { FetchDataStatus } from "../../models/FetchDataStatus";

export default function Table(props) {
  const filterTypes = useMemo(
    () => ({
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined && rowValue !== null
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 50, // width is used for both the flex-basis and flex-grow
      maxWidth: 100, // maxWidth is only used as a limit for resizing

      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns: props.columns,
      data: props.data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: 10, hiddenColumns: ["id"] },
      filterTypes,
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      pageCount: props.pageCount,
    },
    useFlexLayout,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  useEffect(() => {
    props.fetchData &&
      props.fetchData({ page: pageIndex, limit: pageSize, sort: sortBy });
  }, [props.fetchData, pageIndex, pageSize, sortBy]);

  return (
    <>
      {props.fetchDataStatus === FetchDataStatus.Pending ? (
        <div className="flex justify-center">
          <RiseLoader
            color={"#999"}
            loading={props.fetchDataStatus === FetchDataStatus.Pending}
            size={10}
          />
        </div>
      ) : props.fetchDataStatus === FetchDataStatus.Error ? (
        <div className="text-red-700 bg-red-100 border-red-400 border-2 m-4 p-4 rounded">
          Es ist leider ein Fehler aufgetreten: {props.fetchDataError}
        </div>
      ) : (
        <>
          <div className="mt-4 flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <div
                    {...getTableProps()}
                    className="min-w-full divide-y divide-gray-200"
                  >
                    <div className="bg-gray-50">
                      {headerGroups.map((headerGroup) => (
                        <div {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <div
                              className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              {...column.getHeaderProps([
                                {
                                  className: column.className,
                                  style: column.style,
                                },
                              ])}
                            >
                              <div>
                                <div
                                  className="flex items-center justify-between"
                                  {...column.getHeaderProps([
                                    column.getSortByToggleProps(),
                                  ])}
                                >
                                  {column.render("Header")}
                                  {/* Add a sort direction indicator */}
                                  <span>
                                    {column.isSorted ? (
                                      column.isSortedDesc ? (
                                        <SortDownIcon className="w-4 h-4 text-gray-400" />
                                      ) : (
                                        <SortUpIcon className="w-4 h-4 text-gray-400" />
                                      )
                                    ) : (
                                      <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                    )}
                                  </span>
                                </div>
                                <Filter column={column} />
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                    <div
                      {...getTableBodyProps()}
                      className="bg-white divide-y divide-gray-200"
                    >
                      {page.map((row) => {
                        prepareRow(row);

                        return (
                          <div {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <div
                                  {...cell.getCellProps()}
                                  className="px-6 py-4 whitespace-nowrap"
                                >
                                  {cell.column.Cell.name ===
                                  "defaultRenderer" ? (
                                    <div className="text-sm text-gray-500">
                                      {cell.render("Cell")}
                                    </div>
                                  ) : (
                                    cell.render("Cell")
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Pagination
            gotoPage={gotoPage}
            canPreviousPage={canPreviousPage}
            previousPage={previousPage}
            canNextPage={canNextPage}
            nextPage={nextPage}
            pageCount={pageCount}
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </>
      )}
    </>
  );
}
