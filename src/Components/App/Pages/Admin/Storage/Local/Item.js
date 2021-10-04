import Table from "@components/Core/UI/Layout/Table";
import ItemPanel from "@components/App/ItemPanel";
import Pane from "./Panel";
import { useCallback, useEffect } from "react";

export default function LocalStorageItem({ index, style }) {
    const tableState = Table.State.useState();
    const item = Table.Items.useItem(index);
    const itemPanelState = ItemPanel.State.useState();
    const onClick = useCallback(() => {
        tableState.selected = item?.id;
        itemPanelState.visible = true;
        itemPanelState.item = item;
        itemPanelState.pane = <Pane />;
    }, [item, tableState, itemPanelState]);
    useEffect(() => {
        if (item.id === tableState.selected) {
            itemPanelState.item = item;
        }
    }, [itemPanelState, tableState, item]);
    const selected = tableState?.selected === item?.id;
    return <Table.Row onClick={onClick} selected={selected} style={style}>
        <Table.CheckBox id={item?.id} />
        <Table.Field>{item?.id}</Table.Field>
        <Table.Field>{item?.value}</Table.Field>
    </Table.Row>;
}
