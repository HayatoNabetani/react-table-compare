import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { COLUMNS, DATA } from "../../libs/data";
import { useMemo, useState } from "react";
import Filter from "../../components/Filter";

const Home: NextPage = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => DATA, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <table>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        <>
                                            <div
                                                {...{
                                                    style: {
                                                        cursor: header.column.getCanSort()
                                                            ? "pointer"
                                                            : "",
                                                    },
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                                {{
                                                    asc: (
                                                        <span
                                                            className="ps-3"
                                                            style={{
                                                                fontSize: "50%",
                                                            }}
                                                        >
                                                            ▲
                                                            <span
                                                                style={{
                                                                    color: "#333",
                                                                }}
                                                            >
                                                                ▼
                                                            </span>
                                                        </span>
                                                    ),
                                                    desc: (
                                                        <span
                                                            className="ps-3"
                                                            style={{
                                                                fontSize: "50%",
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    color: "#333",
                                                                }}
                                                            >
                                                                ▲
                                                            </span>
                                                            ▼
                                                        </span>
                                                    ),
                                                }[
                                                    header.column.getIsSorted() as string
                                                ] ?? (
                                                    <span
                                                        className="ps-3"
                                                        style={{
                                                            fontSize: "50%",
                                                            color: "#333",
                                                        }}
                                                    >
                                                        ▲▼
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                {header.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter
                                                            column={
                                                                header.column
                                                            }
                                                            table={table}
                                                        />
                                                    </div>
                                                ) : null}
                                            </div>
                                        </>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* ページネーション */}
                <div style={{ margin: "5px" }}>
                    <span>Page</span>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                </div>
                <div>
                    <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<<"}
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<"}
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {">"}
                    </button>
                    <button
                        onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                    >
                        {">>"}
                    </button>
                </div>
                <select
                    style={{ margin: "10px" }}
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                {/* ページネーション */}
                <p>{table.getRowModel().rows.length} Rows</p>
            </main>
        </div>
    );
};

export default Home;
