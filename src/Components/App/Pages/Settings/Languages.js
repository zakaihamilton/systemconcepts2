import List from "@components/Core/UI/Layout/List"
import Table from "@components/Core/UI/Widgets/Table"
import LanguagesItem from "./Languages/Item"
import { useMemo } from "react";
import Translation from "@components/Core/Util/Translation"
import Menu from "@components/Core/UI/Widgets/Menu"

export default function Languages({ }) {
    const languages = Translation.State.useState();
    const translation = Translation.useTranslation();
    const columns = useMemo(() => ([
        {
            id: "name",
            name: translation?.NAME
        },
        {
            id: "id",
            name: translation?.ID
        },
        {
            id: "direction",
            name: translation?.DIRECTION
        }
    ]), [translation]);
    let items = useMemo(() => Object.keys(languages).map(key => languages[key]), [languages]);
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
            {
                id: "view",
                name: translation?.VIEW,
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
                        id: "subMenu1",
                        name: "SUB_MENU_1",
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
                    }

                ]
            }
        ]
    ), [translation]);
    return <Menu.State items={menuItems}>
        <Menu />
        <Table.State columns={columns} sortable={true}>
            <Table.Items items={items}>
                <Table>
                    <List itemSize={40} count={items?.length} Item={LanguagesItem} />
                </Table>
            </Table.Items>
        </Table.State>
    </Menu.State>;
}
