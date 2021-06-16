import { createState } from "@components/Core/Util/State";

export default function Language({ children, direction, id, name }) {
    return <Language.State direction={direction} id={id} name={name}>
        {children}
    </Language.State>
}

Language.State = createState({ direction: "ltr", id: "eng", name: "English" });
Language.useLanguage = Language.State.useState;
