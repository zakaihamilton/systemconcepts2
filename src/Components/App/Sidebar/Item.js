import styles from "./Item.module.scss"
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import Button from "@components/Core/UI/Widgets/Button";
import Tooltip from "@components/Core/UI/Widgets/Tooltip";
import { useCallback } from "react";

export default function SidebarItem({ name, children, depth, open, setOpen, style }) {
    const hasChildren = children?.length;
    style = style || {};
    style.paddingLeft = depth * 16;
    const titleTooltip = open ? "Collapse" : "Expand";
    const onClick = useCallback(() => {
        setOpen(!open);
    }, [open]);
    return <div className={styles.root} style={style}>
        <Tooltip title={titleTooltip}>
            <Button onClick={onClick} style={{ visibility: hasChildren ? "visible" : "hidden" }}>
                {!!open ? <FiChevronDown /> : <FiChevronRight />}
            </Button>
        </Tooltip>
        <div className={styles.label}>
            {name}
        </div>
    </div>;
}
