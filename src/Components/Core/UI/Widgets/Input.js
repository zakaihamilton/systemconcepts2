import { createState } from "@components/Core/Util/State";
import { useCallback } from "react";
import styles from "./Input.module.scss";

export default function Input({ icon, suffixIcon }) {
    const state = Input.State.useState({});
    const onChange = useCallback(event => {
        state.value = event.target.value;
    }, [state]);
    return <div className={styles.root}>
        {!!icon && icon}
        <input className={styles.input} value={state.value || ""} onChange={onChange} />
        {!!suffixIcon && suffixIcon}
    </div>;
}

Input.State = createState();