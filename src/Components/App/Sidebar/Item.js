import styles from "./Item.module.scss"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"
import Button from "@components/Core/UI/Widgets/Button"
import { useCallback } from "react"
import Sidebar from "../Sidebar"
import clsx from "clsx"
import pages from "@components/App/Pages"
import Translation from "@components/Core/Util/Translation"
import Language from "@components/Core/Util/Language"

export default function SidebarItem({ id, index, count, children, depth, open, setOpen, style, icon, name }) {
    const translation = Translation.useTranslation();
    const language = Language.useLanguage();
    const sidebarState = Sidebar.State.useState({});
    const isSelected = sidebarState?.selected === id;
    const hasChildren = children?.length;
    const paddingLeft = language?.direction === "ltr" && depth * 16;
    const paddingRight = language?.direction === "rtl" && depth * 16;
    if (!name) {
        const page = pages.find(page => page.id === id);
        if (page) {
            name = page.name;
            icon = page.icon;
        }
    }
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
    name = translation?.[name] || name;
    return <div onClick={onClick} className={clsx(styles.root, ...classes)} style={{ ...style, paddingLeft, paddingRight }}>
        <div className={styles.icon}>
            {icon}
        </div>
        <div className={clsx(styles.label, ...classes)}>
            {name}
        </div>
        <Button hover={false} style={{ visibility: hasChildren ? "visible" : "hidden", marginTop: "3px" }}>
            {!!open ? <FiChevronDown /> : <FiChevronUp />}
        </Button>
    </div>;
}
