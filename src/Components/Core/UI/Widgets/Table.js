import TableLayout from "@components/Core/UI/Layout/Table"
import Header from "./Table/Header"
import Search from "./Table/Header/Search";

export default function Table({ children }) {
    return <TableLayout header={<Header />}>
        {children}
    </TableLayout>;
}

Table.State = TableLayout.State;
Table.Items = TableLayout.Items;
Table.Search = Search.State;
