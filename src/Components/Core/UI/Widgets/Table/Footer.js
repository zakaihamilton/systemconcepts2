import Table from "@components/Core/UI/Layout/Table";
import styles from "./Footer.module.scss";
import Selected from "./Footer/Selected";

export default function TableFooter({ }) {
    const tableState = Table.State.useState();
    if (!tableState?.checked) {
        return null;
    }
    return <div className={styles.root}>
        <div className={styles.row}>
            <Selected />
        </div>
    </div>;
}
