import List from "@components/Core/UI/Layout/List"
import { useCallback, useMemo, useState } from "react";

export function treeMapper({ item, Item, children, update, depth = 0 }) {
    if (!Item) {
        return null;
    }
    const open = typeof item?.open === "undefined" ? true : item.open;
    if (typeof item === "object") {
        const setOpen = open => {
            item.open = open;
            update();
        };
        children.push(<Item key={item.id || item.name} depth={depth} {...item} open={open} setOpen={setOpen} />);
    }
    if (open && Array.isArray(item?.children)) {
        for (const child of item.children) {
            treeMapper({ item: child, Item, children, update, depth: depth + 1 });
        }
    }

    return children;
}

export default function Tree({ Item, root, mapper, depends = [], children, ...props }) {
    const [counter, setCounter] = useState(0);
    const update = useCallback(() => {
        setCounter(counter => counter + 1);
    }, []);
    const items = useMemo(() => (typeof mapper === "function" ? mapper({ item: root, Item, children: [], update }) : children), [root, children, counter, ...depends]);
    return <List {...props}>
        {items}
    </List >;
}
