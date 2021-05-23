import List from "@components/Core/UI/Layout/List"
import { useMemo } from "react";

export function treeMapper(root, Item, children, depth = 0) {
    if (!Item) {
        return null;
    }
    if (typeof root === "object") {
        children.push(<Item key={root.id || root.name} depth={depth} {...root} />);
    }

    if (Array.isArray(root.children)) {
        for (const child of root.children) {
            treeMapper(child, Item, children, depth + 1);
        }
    }

    return children;
}

export default function Tree({ Item, root, mapper, depends = [], children, ...props }) {
    const items = useMemo(() => (typeof mapper === "function" ? mapper(root, Item, []) : children), depends);
    return <List {...props}>
        {items}
    </List >;
}
