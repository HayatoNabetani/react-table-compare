import { ColumnDef } from "@tanstack/react-table";
import { dateBetweenFilterFn } from "./dateFilter";
import { format } from "date-fns";

type TData = {
    col1: string;
    col2: Boolean;
    col3: number;
    col4: string;
};

const createRandomData = () => {
    const result = [];
    for (let i = 0; i < 100000; i++) {
        result.push({
            col1: `${i}_Hello`,
            col2: true,
            col3: i,
            col4: format(
                new Date("2023-01-24T01:57:59.288+00:00"),
                "yyyy/MM/dd"
            ),
        });
    }
    return result;
};
export const DATA: TData[] = createRandomData();
// export const DATA: TData[] = [
//     {
//         col1: "Hello",
//         col2: true,
//         col3: 1,
//         col4: format(new Date("2023-01-24T01:57:59.288+00:00"), "yyyy/MM/dd"),
//     },
//     {
//         col1: "react-table",
//         col2: true,
//         col3: 2,
//         col4: format(new Date("2023-01-25T01:57:59.288+00:00"), "yyyy/MM/dd"),
//     },
//     {
//         col1: "whatever",
//         col2: false,
//         col3: 3,
//         col4: format(new Date("2023-01-26T01:57:59.288+00:00"), "yyyy/MM/dd"),
//     },
//     {
//         col1: "whatever",
//         col2: true,
//         col3: 10,
//         col4: format(new Date("2023-01-23T01:57:59.288+00:00"), "yyyy/MM/dd"),
//     },
//     {
//         col1: "whatever",
//         col2: false,
//         col3: 5,
//         col4: format(new Date("2023-01-24T01:57:59.288+00:00"), "yyyy/MM/dd"),
//     },
// ];

export const COLUMNS: ColumnDef<any>[] = [
    {
        header: "Column 1",
        accessorKey: "col1",
    },
    {
        header: "Column 2",
        accessorKey: "col2",
    },
    {
        header: "Column 3",
        accessorKey: "col3",
    },
    {
        header: "日付",
        accessorKey: "col4",
        filterFn: dateBetweenFilterFn,
    },
];
