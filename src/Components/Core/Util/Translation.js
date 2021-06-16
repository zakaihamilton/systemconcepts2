import { createState } from "@components/Core/Util/State";
import Language from "./Language";

export default function Translation({ children, ...languages }) {
    return <Translation.State {...languages}>
        {children}
    </Translation.State>
}

Translation.State = createState({ table: [] });
Translation.useTranslation = function () {
    const language = Language.useLanguage();
    const state = Translation.State.useState();
    const languageItem = state?.[language?.id];
    const items = languageItem?.items;
    return items;
};
