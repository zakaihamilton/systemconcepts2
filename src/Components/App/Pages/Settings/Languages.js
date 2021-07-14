import List from "@components/Core/UI/Layout/List"
import Table from "@components/Core/UI/Widgets/Table"
import LanguagesItem from "./Languages/Item"
import { useMemo } from "react";
import Translation from "@components/Core/Util/Translation"

export default function Languages({ }) {
    const languages = Translation.State.useState();
    const translation = Translation.useTranslation();
    const columns = useMemo(() => ([
        {
            id: "name",
            name: translation?.NAME
        },
        {
            id: "id",
            name: translation?.ID
        },
        {
            id: "direction",
            name: translation?.DIRECTION
        }
    ]), [translation]);
    let items = useMemo(() => Object.keys(languages).map(key => languages[key]), [languages]);
    return <Table.State columns={columns} sortable={true}>
        <Table.Items items={items}>
            <Table>
                <List itemSize={40} gap={6} count={items?.length} Item={LanguagesItem} />
            </Table>
        </Table.Items>
    </Table.State>;
}
