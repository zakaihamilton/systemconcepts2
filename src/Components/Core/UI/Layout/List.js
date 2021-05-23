import styles from "./List.module.scss"
import { joinClasses } from "@util/styles"
import React, { useCallback, useMemo, useRef } from "react"
import { useSize } from "@components/Core/Util/Size"
import { createState } from "@components/Core/Util/State"
import Language from "@components/Core/Util/Language"
import { useListener } from "@components/Core/Util/Listener"
import { useObject } from "@components/Core/Util/Object"

export default function List({ className, orientation = "vertical", overscanCount = 2, baseOffset = 0, itemSize = 0, count, Item, children }) {
    const listRef = useRef();
    const [listWidth, listHeight] = useSize(listRef);
    const listState = List.State.useState({ offset: 0 });
    const { direction } = Language.useLanguage();
    let items = [];

    if (!count) {
        count = React.Children.count(children);
    }
    else if (typeof count === "function") {
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

    items = useMemo(() => {
        let items = [];
        let offset = baseOffset;
        for (let index = 0; index < count; index++) {
            const size = typeof itemSize === "function" ? itemSize(index) : itemSize;
            const itemsToShowSize = overscanCount * size;
            const visible = offset > listState?.offset - itemsToShowSize &&
                offset < listState?.offset + containerLength + itemsToShowSize;
            if (visible) {
                let style = { position: "absolute" };
                if (orientation === "vertical") {
                    Object.assign(style, { left: 0, top: offset, width: listWidth, height: itemSize });
                }
                else {
                    Object.assign(style, { left: offset, top: 0, width: itemSize, height: listHeight });
                }
                if (Item) {
                    items.push(<List.Item key={index} index={index} style={style}>
                        <Item index={index} style={style} />
                    </List.Item>);
                }
                else {
                    items.push(<List.Item key={index} index={index} style={style}>
                        {children[index]}
                    </List.Item>);
                }
            }
            offset += itemSize;
        }
        return items;
    }, [listState?.offset, containerLength, listLength, listWidth, listHeight, Item || children]);

    const endStyles = useObject({ [orientation === "vertical" ? "top" : "left"]: listLength });

    className = useMemo(() => joinClasses(styles, ["root", orientation], className), [orientation, className]);

    useListener(listRef.current, "scroll", onScroll, [], { passive: true });

    return <div ref={listRef} className={className}>
        {items}
        <div className={styles.end} style={endStyles} />
    </div>;
}

List.State = createState();
List.Item = createState();
