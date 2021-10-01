import { createState } from "@components/Core/Util/State";
import styles from "./Filter.module.scss";
import Input from "@components/Core/UI/Widgets/Input";
import { MdSearch, MdClear } from "react-icons/md";
import { useCallback, useEffect, useMemo, useRef } from "react";
import Tooltip from "@components/Core/UI/Widgets/Tooltip";
import Translation from "@components/Core/Util/Translation";
import Table from "@components/Core/UI/Layout/Table";
import clsx from "clsx";

export default function Filter() {
    const state = Filter.State.useState();
    const tableState = Table.State.useState();
    const translation = Translation.useTranslation();
    const timerRef = useRef();

    const searchIcon = useMemo(() => (
        <Tooltip title={translation.SEARCH}>
            <MdSearch className={styles.searchIcon} />
        </Tooltip>
    ), [translation]);

    const emptySearch = useCallback(() => {
        tableState.search = null;
    }, [tableState]);

    const clearIcon = useMemo(() => {
        return <Tooltip enabled={!!tableState?.search} title={translation.CLEAR}>
            <MdClear onClick={emptySearch} className={clsx(styles.clearIcon, tableState?.search && styles.visible)} />
        </Tooltip>
    }, [translation, emptySearch, tableState?.search]);

    const onChange = useCallback(value => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            tableState.search = value;
        }, 250);
    }, [tableState]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, []);

    if (!state.showFilter) {
        return null;
    }

    return <div className={styles.root}>
        <Input.State value={tableState.search}>
            <Input.State.Notify value={onChange} />
            <Input icon={searchIcon} suffixIcon={clearIcon} />
        </Input.State>
    </div>;
}

Filter.State = createState({});
