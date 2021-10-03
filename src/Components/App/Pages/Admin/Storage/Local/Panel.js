import Button from "@components/Core/UI/Widgets/Button";
import Edit from "src/Components/Core/UI/Widgets/Edit";
import styles from "./Panel.module.scss";
import Translation from "@components/Core/Util/Translation"
import { useCallback, useEffect } from "react";
import { createState } from "@components/Core/Util/State";
import LocalStorage from "../Local";
import ItemPanel from "@components/App/ItemPanel";
import { replaceItem } from "@util/storage/localstorage";

export default function Pane() {
    const itemPanelState = ItemPanel.State.useState();
    const localStorageState = LocalStorage.State.useState();
    const pane = Pane.State.useState();
    const translation = Translation.useTranslation();
    const item = itemPanelState?.item;
    useEffect(() => {
        pane.id = item.value;
        pane.id = item.id;
    }, [pane, item, localStorageState.counter]);
    const updateItem = useCallback(() => {
        if (!replaceItem(item.id, pane.id, pane.value)) {
            alert("Failed to replace item");
        }
        localStorageState.counter++;
    }, [pane, item, localStorageState]);
    const updateId = useCallback(id => {
        pane.id = id;
    }, [pane]);
    const updateValue = useCallback(value => {
        pane.value = value;
    }, [pane]);
    return <div className={styles.root}>
        <Edit.State value={item.id}>
            <Edit.State.Notify value={updateId} />
            <Edit />
        </Edit.State>
        <Edit.State value={item.value}>
            <Edit.State.Notify value={updateValue} />
            <Edit multiLine={true} className={styles.value} />
        </Edit.State>
        <Button onClick={updateItem} border={true} className={styles.update}>
            {translation?.UPDATE}
        </Button>
    </div>;
}

Pane.State = createState({});
