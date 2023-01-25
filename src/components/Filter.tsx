const Filter = ({ column, table }: { column: any; table: any }) => {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);
    console.log(typeof firstValue);
    if (typeof firstValue === "number") {
        return (
            <div>
                <input
                    type="number"
                    value={
                        ((column.getFilterValue() as any)?.[0] ?? "") as string
                    }
                    onChange={(e) =>
                        column.setFilterValue((old: any) => {
                            console.log(e.target.value);
                            console.log(old?.[1]);
                            return [e.target.value, old?.[1]];
                        })
                    }
                    placeholder={`Min`}
                />
                <input
                    type="number"
                    value={
                        ((column.getFilterValue() as any)?.[1] ?? "") as string
                    }
                    onChange={(e) =>
                        column.setFilterValue((old: any) => [
                            old?.[0],
                            e.target.value,
                        ])
                    }
                    placeholder={`Max`}
                />
            </div>
        );
    } else if (typeof firstValue === "string") {
        if (firstValue.includes("/")) {
            return (
                <div>
                    <input
                        type="date"
                        value={
                            ((column.getFilterValue() as any)?.[0] ??
                                "") as string
                        }
                        onChange={(e) =>
                            column.setFilterValue((old: any) => {
                                console.log(e.target.value);
                                console.log(new Date(e.target.value));
                                console.log(old?.[1]);
                                return [e.target.value, old?.[1]];
                            })
                        }
                        placeholder={`開始日`}
                    />
                    <input
                        type="date"
                        value={
                            ((column.getFilterValue() as any)?.[1] ??
                                "") as string
                        }
                        onChange={(e) =>
                            column.setFilterValue((old: any) => {
                                console.log(e.target.value);
                                console.log(new Date(e.target.value));
                                console.log(old?.[0]);
                                return [old?.[0], e.target.value];
                            })
                        }
                        placeholder={`終了日`}
                    />
                </div>
            );
        } else {
            return (
                <input
                    type="text"
                    value={(column.getFilterValue() ?? "") as string}
                    onChange={(e) => column.setFilterValue(e.target.value)}
                    placeholder={`Search...`}
                />
            );
        }
    } else if (typeof firstValue === "boolean") {
        return (
            <input
                type="checkbox"
                checked={column.getFilterValue()}
                onChange={(e) => column.setFilterValue(e.target.checked)}
            />
        );
    } else {
        return <></>;
    }
};
export default Filter;
