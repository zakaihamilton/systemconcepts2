import TableLayout from "@components/Core/UI/Layout/Table"
import Header from "./Table/Header"

export default function Table({ children }) {
    return <TableLayout header={<Header />}>
        {children}
    </TableLayout>;
}

Table.State = TableLayout.State;
Table.Items = TableLayout.Items;
