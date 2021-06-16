import List from "@components/Core/UI/Layout/List"
import Table from "@components/Core/UI/Widgets/Table"
import LanguagesItem from "./Languages/Item"
import styles from "./Languages.module.scss"
import { useMemo } from "react";
import Translation from "@components/Core/Util/Translation"

export default function Languages({ }) {
    const translation = Translation.useTranslation();
    const columns = useMemo(() => ([
        {
            id: "name",
            name: translation.NAME
        },
        {
            id: "direction",
            name: translation.DIRECTION
        }
    ]), [translation]);
    return <>
        <Table.State columns={columns}>
            <Table className={styles.table}>
                <List className={styles.list} itemSize={40} count={100} Item={LanguagesItem}>

                </List>
            </Table>
        </Table.State>
    </>;
}
