import { useRegion } from "@components/Core/Util/Region";
import { useCallback, useMemo, useRef } from "react";
import Popup from "@components/Core/Util/Popup";
import Menu from "../Menu"
import Item from "./Item"
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md"

export default function SubMenu({ id, items, ...props }) {
    const menuState = Menu.State.useState();
    const itemRef = useRef();
    const selected = menuState.selected === id;

    const onClick = useCallback(() => {
        menuState.selected = menuState.selected !== id ? id : undefined;
        return true;
    }, [id, menuState]);

    const itemRegion = useRegion(itemRef);

    const children = useMemo(() => {
        let iconSuffix = null;
        let menuStyles = { top: itemRegion.bottom };
        if (menuState.vertical) {
            if (itemRegion.left > window.innerWidth / 2) {
                const left = window.innerWidth - itemRegion.left;
                menuStyles.right = left;
            }
            if (!menuStyles.right) {
                menuStyles.left = itemRegion.right;
                iconSuffix = <MdNavigateNext />;
            }
            else {
                iconSuffix = <MdNavigateBefore />;
            }
            menuStyles.top = itemRegion.top;
        }
        else {
            if (itemRegion.left > window.innerWidth / 2) {
                const right = window.innerWidth - itemRegion.left - itemRegion.width;
                menuStyles.right = right;
            }
            else {
                menuStyles.left = itemRegion.left;
            }
        }
        return <>
            <Item id={id} {...props} selected={selected} rootRef={itemRef} onClick={onClick} iconSuffix={iconSuffix} />
            <Menu.State items={items} vertical={true} popup={true} visible={false}>
                <Popup visible={selected || false} onClick={!menuState.vertical ? onClick : null}>
                    <Menu style={menuStyles} />
                </Popup>
            </Menu.State>
        </>
    }, [props, id, menuState?.vertical, selected, onClick, items, itemRegion]);

    return { children };
}
