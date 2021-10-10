import Table from "@components/Core/UI/Layout/Table";
import Button from "../../Button";
import styles from "./Selected.module.scss";
import { formatFraction } from "@util/string";

export default function Selected() {
    const tableState = Table.State.useState();
    const items = Table.Items.useItems();
    const numSelected = tableState?.checked?.length;
    const numTotal = items.length;
    const numSelectedPadded = formatFraction(numSelected, numTotal);

    return <div className={styles.root}>
        <Button>
            {numSelectedPadded} / {numTotal}
        </Button>
    </div>;
}