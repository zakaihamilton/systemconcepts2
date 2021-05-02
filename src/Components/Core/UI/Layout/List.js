import styles from "./List.module.scss"
import { joinClasses } from "@util/styles"
import React, { useCallback, useMemo, useRef } from "react"
import { useSize } from "@components/Core/UI/Util/Size"
import { createState } from "@components/Core/Util/State"
import Language from "@components/Core/UI/Util/Language"

export default function List({ className, orientation = "vertical", itemSize = 0, count, Item, style, children }) {
    const listRef = useRef();
    const [listWidth, listHeight] = useSize(listRef);
    let listLength = 0, containerLength = 0;
    const listState = List.State.useState({ offset: 0 });
    const { direction } = Language.useLanguage();
    let items = [];

    if (!count) {
        count = React.Children.count(children);
    }

    if (typeof ItemCount === "function") {
        count = count();
    }

    if (typeof itemSize === "function") {
        listLength = new Array(count).reduce((total, _, idx) => total + itemSize(idx), 0);
    }
    else {
        listLength = count * itemSize;
    }

    if (orientation === "vertical") {
        containerLength = listHeight;
    }
    else {
        containerLength = listWidth;
    }

    const onScroll = useCallback(() => {
        let offset = 0;
        if (orientation === "vertical") {
            offset = listRef.current.scrollTop;
        }
        else {
            if (direction === "rtl") {
                offset = listRef.current.scrollWidth - listRef.current.scrollLeft - listWidth;
            }
            else {
                offset = listRef.current.scrollLeft;
            }
        }
        listState.offset = offset;
    }, [orientation]);

    React.useEffect(() => {
        onScroll();
    }, [direction, orientation]);

    if (Item) {
        items = useMemo(() => {
            let items = [];
            let offset = 0;
            for (let index = 0; index < count; index++) {
                const size = typeof itemSize === "function" ? itemSize(index) : itemSize;
                const itemsToShowSize = 2 * size;
                const visible = offset > listState?.offset - itemsToShowSize && offset < listState?.offset + containerLength + itemsToShowSize;
                if (visible) {
                    const style = { position: "absolute" };
                    if (orientation === "vertical") {
                        style.top = offset;
                        style.height = itemSize;
                        style.width = listWidth;
                    }
                    else {
                        style.left = offset;
                        style.width = itemSize;
                        style.height = listHeight;
                    }
                    items.push(<Item key={index} index={index} style={style} />);
                }
                offset += itemSize;
            }
            return items;
        }, [listState?.offset, containerLength]);
    }

    style = { width: listWidth, height: listHeight };

    const endStyles = (orientation === "vertical") ? { top: listLength } : { left: listLength };

    return <div ref={listRef} className={joinClasses(styles, ["root", orientation], className)} style={style} onScroll={onScroll}>
        {children}
        {items}
        <div className={styles.end} style={endStyles} />
    </div>;
}

List.State = createState();
