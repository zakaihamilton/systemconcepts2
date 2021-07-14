import Translation from "@components/Core/Util/Translation"
import Table from "@components/Core/UI/Layout/Table"
import Language from "@components/Core/Util/Language"

export default function LocalStorageItem({ index, style }) {
    const tableState = Table.State.useState();
    const item = Table.Items.useItem(index);
    const onClick = () => {
        tableState.selected = item?.id;
    };
    const selected = tableState?.selected === item?.id;
    return <Table.Row onClick={onClick} selected={selected} style={style}>
        <Table.Field>{item?.id}</Table.Field>
        <Table.Field>{item?.value}</Table.Field>
    </Table.Row>;
}
