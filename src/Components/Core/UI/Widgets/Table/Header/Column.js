import styles from "./Column.module.scss"
import Table from "../../Table"
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import clsx from "clsx"
import Button from "../../Button";

export default function Column({ id, icon, name }) {
    const tableState = Table.State.useState();
    const sortedByItem = tableState.sortId === id;
    let sortIcon = null;
    if (sortedByItem) {
        if (tableState.sortDirection === "desc") {
            sortIcon = <div className={styles.icon} style={{ marginTop: "6px" }}><TiArrowSortedDown /></div>;
        }
        else {
            sortIcon = <div className={styles.icon} style={{ marginTop: "3px" }}><TiArrowSortedUp /></div>;
        }
    }
    const onClick = () => {
        if (sortedByItem) {
            tableState.sortDirection = tableState.sortDirection === "desc" ? "asc" : "desc";
        }
        else {
            tableState.sortId = id;
            tableState.sortDirection = "desc";
        }
    };
    return <Button className={clsx(styles.root, tableState?.sortable && styles.sortable)} onClick={tableState?.sortable ? onClick : null}>
        {!!icon && <div className={styles.icon}>
            {icon}
        </div>}
        <div className={styles.name}>
            {name}
        </div>
        {sortIcon}
    </Button>
}
