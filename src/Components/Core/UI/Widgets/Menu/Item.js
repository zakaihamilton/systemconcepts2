import Button from "@components/Core/UI/Widgets/Button"
import Handler from "@components/Core/Util/Handler";
import styles from "./Item.module.scss";
import Menu from "../Menu";
import SubMenu from "./SubMenu";
import Popup from "@components/Core/Util/Popup";
import { useCallback } from "react";
import clsx from "clsx";

export default function Item({ id, items, handler, onClick, ...props }) {
    const menuState = Menu.State.useState();
    const popupState = Popup.State.useState();
    const handleClick = useCallback(onClick => {
        const result = onClick && onClick();
        if (!result) {
            if (popupState?.onClick) {
                popupState.onClick();
            }
        }
    }, [popupState]);

    if (items && !handler) {
        handler = SubMenu;
    }
    return <Handler handler={handler} id={id} onClick={onClick} items={items} {...props}>
        {({ onClick, name, icon, iconSuffix, id, ...props }) => {
            if (!icon) {
                icon = <div className={styles.emptyIcon} />;
            }
            if (!iconSuffix) {
                iconSuffix = <div className={styles.emptyIcon} />;
            }
            return <Button rounded={false} className={clsx(styles.root, menuState.vertical && styles.popup)} icon={icon} iconSuffix={iconSuffix} onClick={() => handleClick(onClick)} {...props}>
                <div className={styles.name}>{name}</div>
            </Button>
        }}
    </Handler>;
}
