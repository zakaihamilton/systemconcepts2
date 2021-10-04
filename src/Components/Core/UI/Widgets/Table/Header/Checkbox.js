import styles from "./Checkbox.module.scss";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdIndeterminateCheckBox } from "react-icons/md";
import Table from "../../Table";
import { useCallback } from "react";

export default function CheckBox() {
    const state = Table.State.useState();
    const items = Table.Items.useItems();
    const isChecked = state?.checked?.length;
    const allChecked = state?.checked?.length === items.length;
    const onClick = useCallback(() => {
        if (!state) {
            return;
        }
        if (!state?.checked) {
            state.checked = [];
        }
        if (state?.checked?.length) {
            state.checked = [];
        }
        else {
            state.checked = items?.map(item => item.id);
        }
    }, [state, items]);
    if (!state?.checked) {
        return null;
    }
    const Icon = isChecked ? (allChecked ? MdCheckBox : MdIndeterminateCheckBox) : MdCheckBoxOutlineBlank;
    return <div className={styles.root} onClick={onClick}>
        <Icon />
    </div>;
}
