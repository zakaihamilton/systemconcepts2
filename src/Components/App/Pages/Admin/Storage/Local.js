import List from "@components/Core/UI/Layout/List"
import Table from "@components/Core/UI/Widgets/Table"
import { useMemo } from "react";
import Translation from "@components/Core/Util/Translation"
import LocalStorageItem from "./Local/Item";

export default function LocalStorage({ }) {
    const translation = Translation.useTranslation();
    const columns = useMemo(() => ([
        {
            id: "id",
            name: translation?.ID
        },
        {
            id: "value",
            name: translation?.VALUE
        }
    ]), [translation]);
    let items = useMemo(() => {
        return new Array(localStorage.length).fill(0).map((_, index) => {
            const id = localStorage.key(index);
            const value = localStorage.getItem(id);
            return { id, value };
        });
    }, []);
    return <Table.State columns={columns} sortable={true}>
        <Table.Items items={items}>
            <Table>
                <List itemSize={40} Item={LocalStorageItem} />
            </Table>
        </Table.Items>
    </Table.State>;
}
