import { MdSearch } from "react-icons/md";
import Button from "../../Button";
import Tooltip from "../../Tooltip";
import styles from "./Search.module.scss";
import Translation from "@components/Core/Util/Translation"
import { createState } from "@components/Core/Util/State";
import { useCallback } from "react";

export default function Search() {
    const state = Search.State.useState();
    const translation = Translation.useTranslation();
    const onClick = useCallback(() => {
        state.inSearch = !state.inSearch;
    }, [state]);
    return <Tooltip className={styles.tooltip} title={translation?.SEARCH}>
        <Button selected={state.inSearch} onClick={onClick} className={styles.button} icon={<MdSearch />} />
    </Tooltip>;
}

Search.State = createState({});
