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
    const count = Object.keys(languages).length;
    return <>
        <Table.State columns={columns}>
            <Table>
                <List itemSize={40} gap={6} count={count} Item={LanguagesItem} />
            </Table>
        </Table.State>
    </>;
}
