import { createState } from "@components/Core/Util/State";
import TableLayout from "@components/Core/UI/Layout/Table"
import { useMemo } from "react";

export default function Items({ children, items }) {
    const tableState = TableLayout.State.useState();
    const { sortId, sortDirection } = tableState;
    items = useMemo(() => {
        const list = [...items];
        if (sortId) {
            list?.sort((a, b) => b[sortId].toLowerCase() - a[sortId].toLowerCase());
        }
        if (sortDirection === "asc") {
            list?.reverse();
        }
        return list;
    }, [items, sortDirection, sortId]);
    return <Items.State items={items}>
        {children}
    </Items.State>;
}

Items.State = createState();
Items.useItems = Items.State.useState;
Items.useItem = index => {
    const { items } = Items.useItems();
    const item = items[index];
    return item;
};