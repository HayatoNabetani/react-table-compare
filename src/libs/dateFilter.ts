import {
    isWithinInterval,
    parse,
    isEqual,
    isAfter,
    isBefore,
    format,
} from "date-fns";
/**
 * 日付のフィルタ用関数
 */
export const dateBetweenFilterFn = (
    row: any,
    columnId: any,
    filterValue: any
) => {
    const rowValue = row.getValue(columnId);
    const formatRowValue = rowValue.replaceAll(/\//g, "-");
    console.log(formatRowValue);
    const rowValueDate = parse(
        formatRowValue as string,
        "yyyy-MM-dd",
        new Date()
    );
    const filterStartDate = filterValue[0];
    const filterEndDate = filterValue[1];
    if (filterStartDate && filterEndDate) {
        // 期間の開始・終了が指定されている場合
        const isValid = isWithinInterval(rowValueDate, {
            start: new Date(filterStartDate),
            end: new Date(filterEndDate),
        });
        return isValid;
    } else if (filterStartDate && !filterEndDate) {
        // 期間の開始が指定されている場合
        const isValid =
            isEqual(rowValueDate, new Date(filterStartDate)) ||
            isAfter(rowValueDate, new Date(filterStartDate));
        return isValid;
    } else if (!filterStartDate && filterEndDate) {
        // 期間の終了が指定されている場合
        const isValid =
            isEqual(rowValueDate, new Date(filterEndDate)) ||
            isBefore(rowValueDate, new Date(filterEndDate));
        return isValid;
    } else {
        // 期間が指定されていない場合
        return true;
    }
};
