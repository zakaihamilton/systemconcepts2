import styles from "./Item.module.scss"
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import Button from "@components/Core/UI/Widgets/Button";
import Tooltip from "@components/Core/UI/Widgets/Tooltip";
import { useCallback } from "react";
import Sidebar from "../Sidebar"
import clsx from "clsx"

export default function SidebarItem({ id, name, index, count, children, depth, open, setOpen, style }) {
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
            window.location = "#" + id;
        }
    }, [open]);
    const classes = [hasChildren && styles.parent, isSelected && styles.selected];
    if (!index) {
        classes.push(styles.first);
    }
    else if (index === count - 1) {
        classes.push(styles.last);
    }
    return <div onClick={onClick} className={clsx(styles.root, ...classes)} style={{ ...style, paddingLeft }}>
        <Tooltip title={titleTooltip}>
            <Button style={{ visibility: hasChildren ? "visible" : "hidden" }}>
                {!!open ? <FiChevronDown /> : <FiChevronRight />}
            </Button>
        </Tooltip>
        <div className={clsx(styles.label, ...classes)}>
            {name}
        </div>
    </div>;
}
