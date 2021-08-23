import Button from "@components/Core/UI/Widgets/Button"
import Handler from "@components/Core/Util/Handler";
import styles from "./Item.module.scss"
import SubMenu from "./SubMenu"

export default function Item({ id, items, handler, onClick, ...props }) {
    if (items && !handler) {
        handler = SubMenu;
    }
    return <Handler handler={handler} onClick={onClick} items={items} {...props}>
        {({ onClick, icon, name, ...props }) => (<Button icon={icon} className={styles.root} onClick={onClick} {...props}>
            {name}
        </Button>)}
    </Handler>;
}
