import styles from "./List.module.scss"
import { joinClasses } from "@util/styles"
import React, { useCallback, useMemo, useRef } from "react"
import { useSize } from "@components/Core/Util/Size"
import { createState } from "@components/Core/Util/State"
import Language from "@components/Core/Util/Language"
import { useListener } from "@components/Core/Util/Listener"
import { useObject } from "@components/Core/Util/Object"

export default function List({ className, orientation = "vertical", baseOffset = 0, itemSize = 0, count, Item, style, children }) {
    const listRef = useRef();
    const [listWidth, listHeight] = useSize(listRef);
    const listState = List.State.useState({ offset: 0 });
    const { direction } = Language.useLanguage();
    let items = [];

    if (!count) {
        count = React.Children.count(children);
    }

    if (typeof ItemCount === "function") {
        count = count();
    }

    const listLength = useMemo(() => {
        if (typeof itemSize === "function") {
            return new Array(count).reduce((total, _, idx) => total + itemSize(idx), 0);
        }
        else {
            return count * itemSize;
        }
    }, [count, itemSize]);

    const containerLength = orientation === "vertical" ? listHeight : listWidth;

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
            let offset = baseOffset;
            for (let index = 0; index < count; index++) {
                const size = typeof itemSize === "function" ? itemSize(index) : itemSize;
                const itemsToShowSize = 2 * size;
                const visible = offset > listState?.offset - itemsToShowSize &&
                    offset < listState?.offset + containerLength + itemsToShowSize;
                if (visible) {
                    const style = { position: "absolute" };
                    if (orientation === "vertical") {
                        style.left = 0;
                        style.top = offset;
                        style.height = itemSize;
                        style.width = listWidth;
                    }
                    else {
                        style.left = offset;
                        style.top = 0;
                        style.width = itemSize;
                        style.height = listHeight;
                    }
                    items.push(<List.Item key={index} index={index} style={style}>
                        <Item index={index} style={style} />
                    </List.Item>);
                }
                offset += itemSize;
            }
            return items;
        }, [listState?.offset, containerLength, listLength]);
    }

    style = useObject({ width: listWidth, height: listHeight });
    const endStyles = useObject({ [orientation === "vertical" ? "top" : "left"]: listLength });

    className = useMemo(() => {
        return joinClasses(styles, ["root", orientation], className)
    }, [orientation, className]);

    useListener(listRef.current, "scroll", onScroll, [], { passive: true });

    return <div ref={listRef} className={className} style={style}>
        {children}
        {items}
        <div className={styles.end} style={endStyles} />
    </div>;
}

List.State = createState();
List.Item = createState();
