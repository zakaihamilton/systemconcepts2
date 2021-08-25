import { createState } from "@components/Core/Util/State";
import styles from "./Search.module.scss";

export default function Search() {
    const state = Search.State.useState();

    if (!state.inSearch) {
        return null;
    }

    return <div className={styles.root}>

    </div>;
}

Search.State = createState({});
