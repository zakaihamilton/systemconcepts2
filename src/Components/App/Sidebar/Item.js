import styles from "./Item.module.scss"
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import Button from "@components/Core/UI/Widgets/Button";
import Tooltip from "@components/Core/UI/Widgets/Tooltip";
import { useCallback, useEffect } from "react";
import Sidebar from "../Sidebar"
import clsx from "clsx"

export default function SidebarItem({ id, name, children, depth, open, setOpen, style }) {
    const sidebarState = Sidebar.State.useState({});
    const isSelected = sidebarState?.selected === id;
    const hasChildren = children?.length;
    const paddingLeft = depth * 16;
    const titleTooltip = open ? "Collapse" : "Expand";
    const onClick = useCallback(() => {
        if (hasChildren) {
            setOpen(!open);
        }
        else {
            sidebarState.selected = id;
        }
    }, [open]);
    return <div onClick={onClick} className={clsx(styles.root, isSelected && styles.selected)} style={{ ...style, paddingLeft }}>
        <Tooltip title={titleTooltip}>
            <Button style={{ visibility: hasChildren ? "visible" : "hidden" }}>
                {!!open ? <FiChevronDown /> : <FiChevronRight />}
            </Button>
        </Tooltip>
        <div className={styles.label}>
            {name}
        </div>
    </div>;
}
