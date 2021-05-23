import styles from "./Item.module.scss"
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import Button from "@components/Core/UI/Widgets/Button";
import Tooltip from "@components/Core/UI/Widgets/Tooltip";

export default function SidebarItem({ name, children, depth, open, style }) {
    const hasChildren = children?.length;
    const isOpen = typeof open === "undefined" ? true : open;
    style = style || {};
    style.paddingLeft = depth * 16;
    const titleTooltip = isOpen ? "Collapse" : "Expand";
    return <div className={styles.root} style={style}>
        <Tooltip title={titleTooltip}>
            <Button style={{ visibility: hasChildren ? "visible" : "hidden" }}>
                {!!isOpen ? <FiChevronDown /> : <FiChevronRight />}
            </Button>
        </Tooltip>
        <div className={styles.label}>
            {name}
        </div>
    </div>;
}
