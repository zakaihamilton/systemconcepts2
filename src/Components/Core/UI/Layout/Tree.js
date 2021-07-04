import List from "@components/Core/UI/Layout/List"
import { useCallback, useMemo, useState } from "react";

export function treeMapper({ item, Item, children, update, depth = 0 }) {
    if (!Item) {
        return children;
    }
    if (Array.isArray(item)) {
        for (const child of item) {
            treeMapper({ item: child, Item, children, update, depth: depth + 1 });
        }
        return children;
    }
    const open = typeof item?.open === "undefined" ? true : item.open;
    if (typeof item === "object") {
        const setOpen = open => {
            item.open = open;
            update();
        };
        const id = item.id || item.name;
        children.push(<Item key={id} {...item} depth={depth} id={id} open={open} setOpen={setOpen} />);
    }
    else if (item) {
        children.push(<Item key={item} depth={depth} id={item} />);
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
    const items = useMemo(() => (typeof mapper === "function" ? mapper({ item: root, Item, children: [], update }) : children), [mapper, root, Item, update, children]);
    return <List {...props}>
        {items}
    </List >;
}
