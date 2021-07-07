import Translation from "@components/Core/Util/Translation"
import Table from "@components/Core/UI/Layout/Table"
import Language from "@components/Core/Util/Language"

export default function LanguagesItem({ index, style }) {
    const translation = Translation.useTranslation();
    const languageState = Language.State.useState();
    const item = Table.Items.useItem(index);
    const onClick = () => {
        Object.assign(languageState, item);
    };
    const selected = languageState?.id === item?.id;
    return <Table.Row onClick={onClick} selected={selected} style={style}>
        <Table.Field>{item?.name}</Table.Field>
        <Table.Field>{item?.id}</Table.Field>
        <Table.Field>{translation?.[item?.direction?.toUpperCase()]}</Table.Field>
    </Table.Row>;
}
