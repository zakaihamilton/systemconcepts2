import Translation from "@components/Core/Util/Translation"
import Table from "@components/Core/UI/Layout/Table"
import Language from "@components/Core/Util/Language"

export default function LocalStorageItem({ index, style }) {
    const languageState = Language.State.useState();
    const item = Table.Items.useItem(index);
    const onClick = () => {
        Object.assign(languageState, item);
    };
    const selected = languageState?.id === item?.id;
    return <Table.Row onClick={onClick} selected={selected} style={style}>
        <Table.Field>{item?.key}</Table.Field>
        <Table.Field>{item?.value}</Table.Field>
    </Table.Row>;
}
