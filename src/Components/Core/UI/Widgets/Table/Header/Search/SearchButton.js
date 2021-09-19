import { MdSearch } from "react-icons/md";
import Button from "../../../Button";
import Tooltip from "../../../Tooltip";
import styles from "./SearchButton.module.scss";
import Translation from "@components/Core/Util/Translation"
import { useCallback } from "react";
import Search from "../Search"

export default function SearchButton() {
    const state = Search.State.useState();
    const translation = Translation.useTranslation();
    const onClick = useCallback(() => {
        state.inSearch = !state.inSearch;
    }, [state]);
    return <Tooltip className={styles.tooltip} title={translation?.SEARCH}>
        <Button rounded={false} selected={state?.inSearch} onClick={onClick} className={styles.button} icon={<MdSearch />} />
    </Tooltip>;
}
