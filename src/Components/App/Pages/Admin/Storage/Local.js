import List from "@components/Core/UI/Layout/List"
import Table from "@components/Core/UI/Widgets/Table"
import { useMemo } from "react";
import Translation from "@components/Core/Util/Translation"
import LocalStorageItem from "./Local/Item";

export default function LocalStorage({ }) {
    const languages = Translation.State.useState();
    const translation = Translation.useTranslation();
    const columns = useMemo(() => ([
        {
            id: "key",
            name: translation?.KEY
        },
        {
            id: "value",
            name: translation?.VALUE
        }
    ]), [translation]);
    let items = useMemo(() => {
        return new Array(localStorage.length).fill(0).map((_, index) => {
            const key = localStorage.key(index);
            const value = localStorage.getItem(key);
            return { key, value };
        });
    }, []);
    return <Table.State columns={columns} sortable={true} selectable={true}>
        <Table.Items items={items}>
            <Table>
                <List itemSize={40} gap={6} count={items?.length} Item={LocalStorageItem} />
            </Table>
        </Table.Items>
    </Table.State>;
}
