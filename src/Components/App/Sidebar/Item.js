import styles from "./Item.module.scss"
import { FiChevronLeft, FiChevronDown } from "react-icons/fi";
import Button from "@components/Core/UI/Widgets/Button";

export default function SidebarItem({ name, children, depth, style }) {
    const hasChildren = children?.length;
    const isOpen = false;
    style = style || {};
    style.paddingLeft = depth * 16;
    return <div className={styles.root} style={style}>
        <Button style={{ visibility: hasChildren ? "visible" : "hidden" }}>
            {!isOpen ? <FiChevronDown /> : <FiChevronLeft />}
        </Button>
        <div className={styles.label}>
            {name}
        </div>
    </div>;
}
