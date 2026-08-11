import { TableHeaderWrapper, TableWrapper, Table as StyledTable, TableHeaderRow, TableHeader, TableBodyWrapper, TableRow, TableCell } from "./components"

type Column<T> = {
    key: keyof T & string;
    header: string;
    render?: (item: T) => React.ReactNode;
};

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    footer?: React.ReactNode;
}

const renderCellValue = (v: unknown) =>
    v === null || v === undefined ? "" : String(v);

export const Table = <T,>({ columns, data, footer }: TableProps<T>) => {
    return (
        <TableWrapper>
            <StyledTable>
                <TableHeaderWrapper>
                    <TableHeaderRow>
                        {columns.map((column) => (
                            <TableHeader key={column.key}>{column.header}</TableHeader>
                        ))}
                    </TableHeaderRow>
                </TableHeaderWrapper>
                <TableBodyWrapper>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((column) => (
                                column.render ? column.render(row) :
                                    <TableCell key={column.key}>
                                        {renderCellValue(row[column.key])}
                                    </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBodyWrapper>
            </StyledTable>
            {footer}
        </TableWrapper>
    );
}