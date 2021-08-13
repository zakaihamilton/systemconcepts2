import { createState } from "@components/Core/Util/State";
import TableLayout from "@components/Core/UI/Layout/Table"
import { useMemo } from "react";

function useSort(items) {
    const tableState = TableLayout.State.useState();
    const { sortId, sortDirection } = tableState;
    items = useMemo(() => {
        const list = [...items];
        if (sortId) {
            list?.sort((a, b) => {
                const aVal = a[sortId];
                const bVal = b[sortId];
                if (typeof aVal === "string" && typeof bVal === "string") {
                    return aVal.toLowerCase().localeCompare(bVal.toLowerCase());
                }
                else {
                    return aVal - bVal;
                }
            });
        }
        if (sortDirection === "asc") {
            list?.reverse();
        }
        return list;
    }, [items, sortDirection, sortId]);
    return items;
}

export default function Items({ children, items }) {
    items = useSort(items);
    return <Items.State items={items}>
        {children}
    </Items.State>;
}

Items.State = createState();
Items.useItems = Items.State.useState;
Items.useItem = index => {
    const { items = [] } = Items.useItems() || {};
    const item = items[index];
    return item;
};
