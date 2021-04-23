import styles from "./Padding.module.scss"
import { joinClasses } from "@util/styles"

export default function Padding({ children, className, style, left, top, right, bottom, padding }) {
    style = { ...style };
    padding && (style.padding = padding);
    left && (style.paddingLeft = left);
    top && (style.paddingTop = top);
    right && (style.paddingRight = right);
    bottom && (style.paddingBottom = bottom);
    return <div className={joinClasses(styles, ["root"], className)} style={style}>
        {children}
    </div>;
}
