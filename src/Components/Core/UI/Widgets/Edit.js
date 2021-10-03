import { createState } from "@components/Core/Util/State";
import { useCallback } from "react";
import styles from "./Edit.module.scss";
import clsx from "clsx";

export default function EditWidget({ className, multiLine }) {
    const state = EditWidget.State.useState();
    const onChange = useCallback(() => {
        if (state) {
            state.value = event.target.value;
        }
    }, [state]);
    return <div className={clsx(styles.root, multiLine && styles.multiLine)}>
        {!!multiLine && <textarea className={clsx(styles.textarea, className)} value={state?.value} onChange={onChange} />}
        {!multiLine && <input className={clsx(styles.input, className)} value={state?.value} onChange={onChange} />}
    </div>;
}

EditWidget.State = createState();
