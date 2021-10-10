import Table from "@components/Core/UI/Layout/Table";
import Button from "../../Button";
import styles from "./Selected.module.scss";

export default function Selected() {
    const tableState = Table.State.useState();
    const items = Table.Items.useItems();
    const numSelected = tableState?.checked?.length;
    const numTotal = items.length;

    return <div className={styles.root}>
        <Button>
            {numSelected} / {numTotal}
        </Button>
    </div>;
}