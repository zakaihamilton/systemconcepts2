import { IoFilter } from "react-icons/io5";
import Button from "../../../Button";
import Tooltip from "../../../Tooltip";
import styles from "./FilterButton.module.scss";
import Translation from "@components/Core/Util/Translation"
import { useCallback } from "react";
import Filter from "../Filter";

export default function FilterButton() {
    const state = Filter.State.useState();
    const translation = Translation.useTranslation();
    const onClick = useCallback(() => {
        state.showFilter = !state.showFilter;
    }, [state]);
    return <Tooltip className={styles.tooltip} title={translation?.FILTER}>
        <Button rounded={false} selected={state?.showFilter} onClick={onClick} className={styles.button} icon={<IoFilter />} />
    </Tooltip>;
}
