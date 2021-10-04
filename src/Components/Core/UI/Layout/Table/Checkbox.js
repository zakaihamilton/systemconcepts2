import styles from "./Checkbox.module.scss";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import Table from "../Table";
import { useCallback } from "react";

export default function CheckBox({ id }) {
    const state = Table.State.useState();
    const isChecked = state?.checked?.includes(id);
    const onClick = useCallback(() => {
        if (!state) {
            return;
        }
        if (!state?.checked) {
            state.checked = [];
        }
        if (state?.checked?.includes(id)) {
            state.checked = state?.checked.filter(el => el !== id);
        }
        else {
            state.checked = [...state?.checked, id];
        }
    }, [state, id]);
    if (!state?.checked) {
        return null;
    }
    const Icon = isChecked ? MdCheckBox : MdCheckBoxOutlineBlank;
    return <div className={styles.root} onClick={onClick}>
        <Icon />
    </div>;
}