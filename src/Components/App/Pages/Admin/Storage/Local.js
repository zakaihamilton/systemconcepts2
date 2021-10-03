import List from "@components/Core/UI/Layout/List"
import Table from "@components/Core/UI/Widgets/Table"
import { useCallback, useMemo } from "react";
import Translation from "@components/Core/Util/Translation"
import LocalStorageItem from "./Local/Item";
import SplitPane from "@components/Core/UI/Widgets/SplitPane"
import ItemPanel from "@components/App/ItemPanel"
import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import { createState } from "@components/Core/Util/State";
import Menu from "@components/Core/UI/Widgets/Menu"
import useMenu from "./Local/Menu";

export default function LocalStorage({ }) {
    const state = LocalStorage.State.useState();
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
    const updateSelected = useCallback(selected => {
        state.selected = selected;
    }, [state]);
    const menuItems = useMenu();
    let items = useMemo(() => {
        return new Array(localStorage.length).fill(0).map((_, index) => {
            const id = localStorage.key(index);
            const value = localStorage.getItem(id);
            return { id, value };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state?.counter]);
    return <Table.State columns={columns} sortable={true}>
        <Table.State.Notify selected={updateSelected} />
        <Menu.State items={menuItems}>
            <Menu />
            <SplitPane>
                <Pane closable={false}>
                    <Table.Items items={items}>
                        <Table>
                            <List itemSize={40} Item={LocalStorageItem} />
                        </Table>
                    </Table.Items>
                </Pane>
                <ItemPanel />
            </SplitPane>
        </Menu.State>
    </Table.State>;
}

LocalStorage.State = createState({ counter: 0, selected: null });
