import List from "@components/Core/UI/Layout/List"
import Table from "@components/Core/UI/Widgets/Table"
import LanguagesItem from "./Languages/Item"
import styles from "./Languages.module.scss"

const columns = [
    {
        id: "name",
        name: "Name"
    },
    {
        id: "direction",
        name: "Direction"
    }
];

export default function Languages({ }) {
    return <>
        <Table.State columns={columns}>
            <Table className={styles.table}>
                <List className={styles.list} itemSize={40} count={100} Item={LanguagesItem}>

                </List>
            </Table>
        </Table.State>
    </>;
}
