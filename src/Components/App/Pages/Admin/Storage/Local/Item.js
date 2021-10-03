import Table from "@components/Core/UI/Layout/Table";
import ItemPanel from "@components/App/ItemPanel";
import Pane from "./Panel";

export default function LocalStorageItem({ index, style }) {
    const tableState = Table.State.useState();
    const item = Table.Items.useItem(index);
    const itemPanelState = ItemPanel.State.useState();
    const onClick = () => {
        tableState.selected = item?.id;
        itemPanelState.visible = true;
        itemPanelState.pane = <Pane item={item} />;
    };
    const selected = tableState?.selected === item?.id;
    return <Table.Row onClick={onClick} selected={selected} style={style}>
        <Table.Field>{item?.id}</Table.Field>
        <Table.Field>{item?.value}</Table.Field>
    </Table.Row>;
}
