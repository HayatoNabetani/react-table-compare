import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
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
            </main>
            <p>{table.getRowModel().rows.length} Rows</p>
        </div>
    );
};

export default Home;
