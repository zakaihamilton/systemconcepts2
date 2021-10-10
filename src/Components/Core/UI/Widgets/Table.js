import TableLayout from "@components/Core/UI/Layout/Table";
import Header from "./Table/Header";
import Footer from "./Table/Footer";
import Filter from "./Table/Header/Filter";

export default function Table({ children }) {
    return <TableLayout header={<Header />} footer={<Footer />}>
        {children}
    </TableLayout>;
}

Table.State = TableLayout.State;
Table.Items = TableLayout.Items;
Table.Search = Filter.State;
