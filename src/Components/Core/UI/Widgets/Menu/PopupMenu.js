import { useMemo } from "react";
import Menu from "../Menu"
import Popup from "@components/Core/Util/Popup";

export default function PopupMenu({ items, children, region }) {

    return useMemo(() => {
        let menuStyles = { top: region.bottom, zIndex: 1 };
        if (region.left > window.innerWidth / 2) {
            const left = window.innerWidth - region.left;
            menuStyles.right = left;
        }
        if (!menuStyles.right) {
            menuStyles.left = region.right;
        }
        menuStyles.top = region.top;
        return <>
            {children}
            <Menu.State items={items} vertical={true} popup={true} visible={true}>
                <Popup>
                    <Menu style={menuStyles} />
                </Popup>
            </Menu.State>
        </>
    }, [items, region, children]);
}
