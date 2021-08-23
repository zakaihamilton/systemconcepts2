import Button from "@components/Core/UI/Widgets/Button"
import Handler from "@components/Core/Util/Handler";
import styles from "./Item.module.scss"
import SubMenu from "./SubMenu"
import Popup from "@components/Core/Util/Popup"
import { useCallback } from "react";

export default function Item({ id, items, handler, onClick, ...props }) {
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
    return <Handler handler={handler} onClick={onClick} items={items} {...props}>
        {({ onClick, icon, name, ...props }) => (<Button icon={icon} className={styles.root} onClick={() => handleClick(onClick)} {...props}>
            {name}
        </Button>)}
    </Handler>;
}
