import { createState } from "@components/Core/Util/State";
import TableLayout from "@components/Core/UI/Layout/Table"
import { useMemo } from "react";
import List from "../List";

function useSort(items) {
    const tableState = TableLayout.State.useState() || {};
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

function useSearch(items) {
    const tableState = TableLayout.State.useState() || {};
    const { search } = tableState;
    items = useMemo(() => {
        const text = (search || "").toLowerCase();
        if (!text) {
            return items;
        }
        const list = items.filter(item => {
            const keys = Object.keys(item);
            let match = keys.some(key => {
                let val = item[key];
                if (typeof val === "number") {
                    val = val.toString();
                }
                if (typeof val === "string") {
                    const includes = val.toLowerCase().includes(text);
                    return includes;
                }
                return false;
            });
            return match;
        });
        return list;
    }, [items, search]);
    return items;
}

export default function Items({ children, items }) {
    items = useSort(items);
    items = useSearch(items);
    return <Items.State items={items}>
        <List.State count={items?.length} offset={0}>
            {children}
        </List.State>
    </Items.State>;
}

Items.State = createState();
Items.useItems = function () {
    const state = Items.State.useState();
    return state?.items || [];
};
Items.useItem = index => {
    const items = Items.useItems() || [];
    const item = items[index];
    return item;
};
