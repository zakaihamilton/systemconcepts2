import { useRegion } from "@components/Core/Util/Region";
import { useCallback, useMemo, useRef } from "react";
import Popup from "@components/Core/Util/Popup";
import Menu from "../Menu"
import Item from "./Item"

export default function SubMenu({ items, ...props }) {
    const menuState = Menu.State.useState();
    const itemRef = useRef();

    const onClick = useCallback(() => {
        menuState.visible = !menuState.visible;
        return true;
    }, [menuState]);

    const itemRegion = useRegion(itemRef);

    const children = useMemo(() => {
        let menuStyles = { top: itemRegion.bottom };
        if (itemRegion.left > window.innerWidth / 2) {
            const right = window.innerWidth - itemRegion.left - itemRegion.width;
            menuStyles.right = right;
        }
        else if (menuState.vertical) {
            menuStyles.left = itemRegion.right;
            menuStyles.top = itemRegion.top;
        }
        else {
            menuStyles.left = itemRegion.left;
        }
        return <Menu.State items={items} vertical={true} popup={true} visible={false}>
            <Item {...props} selected={menuState.visible} rootRef={itemRef} onClick={onClick} />
            <Popup visible={menuState?.visible || false} onClick={!menuState.vertical ? onClick : null}>
                <Menu style={menuStyles} />
            </Popup>
        </Menu.State>
    }, [props, menuState?.vertical, menuState?.visible, onClick, items, itemRegion]);

    return { children };
}
