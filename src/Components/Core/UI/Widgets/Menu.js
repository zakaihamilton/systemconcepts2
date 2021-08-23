import { useMemo } from "react"
import styles from "./Menu.module.scss"
import clsx from "clsx"
import { createState } from "@components/Core/Util/State";
import Item from "./Menu/Item";

export default function Menu({ vertical, popup, ...props }) {
    const menuState = Menu.State.useState();
    const visible = true || menuState?.items?.length;
    const items = useMemo(() => {
        return menuState?.items?.map(item => (<Item key={item.id} {...item} />)).filter(Boolean);
    }, [menuState?.items]);
    const className = clsx(styles.root,
        visible && styles.visible,
        vertical && styles.vertical,
        popup && styles.popup);
    return <div className={className} {...props}>
        {items}
    </div>;
}

Menu.State = createState();
