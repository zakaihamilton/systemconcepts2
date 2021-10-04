import { useMemo } from "react";
import Translation from "@components/Core/Util/Translation"
import LocalStoragePage from "../Local";
import ItemPanel from "@components/App/ItemPanel";
import { removeItem } from "@util/storage/localstorage";

export default function useMenu() {
    const translation = Translation.useTranslation();
    const state = LocalStoragePage.State.useState();
    const itemPanelState = ItemPanel.State.useState();
    const hasRecord = !!state?.selected;
    const menuItems = useMemo(() => (
        [
            {
                id: "file",
                name: translation?.FILE,
                items: [
                    {
                        id: "export",
                        name: translation?.EXPORT
                    },
                    {
                        id: "subMenu",
                        name: "SUB_MENU",
                        items: [
                            {
                                id: "item1",
                                name: "Item 1"
                            },
                            {
                                id: "Item2",
                                name: "Item 2"
                            }
                        ]
                    },
                    {
                        id: "subMenu2",
                        name: "SUB_MENU_2",
                        items: [
                            {
                                id: "item3",
                                name: "Item 3"
                            },
                            {
                                id: "Item4",
                                name: "Item 4"
                            }
                        ]
                    }

                ]
            },
            hasRecord && {
                id: "record",
                name: translation?.RECORD,
                items: [
                    {
                        id: "delete",
                        name: translation?.DELETE,
                        onClick: () => {
                            removeItem(state?.selected);
                            state.selected = null;
                            itemPanelState.visible = false;
                            state.counter++;
                        }
                    }
                ]
            }
        ].filter(Boolean)
    ), [translation, state, hasRecord, itemPanelState]);
    return menuItems;
}