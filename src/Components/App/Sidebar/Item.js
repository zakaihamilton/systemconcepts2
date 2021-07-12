import styles from "./Item.module.scss"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"
import Button from "@components/Core/UI/Widgets/Button"
import { useCallback } from "react"
import Sidebar from "../Sidebar"
import clsx from "clsx"
import pages from "@components/App/Pages"
import Translation from "@components/Core/Util/Translation"
import Language from "@components/Core/Util/Language"
import Handler from "@components/Core/Util/Handler"
import Layout from "@components/Core/Util/Layout"

export default function SidebarItem({ id, index, count, children, handler, onClick, depth, open, setOpen, style, icon, name }) {
    const layout = Layout.useLayout();
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
    const onItemClick = useCallback(() => {
        if (hasChildren) {
            setOpen(!open);
        }
        else {
            sidebarState.selected = id;
            window.location = "#" + id;
            if (layout === "mobile") {
                sidebarState.visible = false;
            }
        }
    }, [hasChildren, setOpen, open, sidebarState, id, layout]);
    const classes = [hasChildren && styles.parent, isSelected && styles.selected];
    if (!index) {
        classes.push(styles.first);
    }
    else if (index === count - 1) {
        classes.push(styles.last);
    }
    return <Handler handler={handler} onClick={onClick} icon={icon} name={name}>
        {({ onClick, icon, name }) => {
            name = translation?.[name] || name;
            return <div onClick={onClick || onItemClick} className={clsx(styles.root, ...classes)} style={{ ...style, paddingLeft, paddingRight }}>
                <div className={clsx(styles.icon, ...classes)}>
                    {icon}
                </div>
                <div className={clsx(styles.label, ...classes)}>
                    {name}
                </div>
                <Button hover={false} style={{ visibility: hasChildren ? "visible" : "hidden", marginTop: "3px" }}>
                    {!!open ? <FiChevronDown /> : <FiChevronUp />}
                </Button>
            </div>;
        }}</Handler>
}
