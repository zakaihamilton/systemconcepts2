import { MdSettings } from "react-icons/md";
import { DarkModeHandler } from "@components/Core/Util/DarkMode"

import { MdLanguage } from "react-icons/md";
import Languages from "@components/App/Pages/Settings/Languages"

const Pages = [
    {
        id: "languages",
        name: "LANGUAGES",
        icon: <MdLanguage />,
        Component: Languages
    }
];

const Sidebar = [
    {
        id: "settings",
        name: "SETTINGS",
        icon: <MdSettings />,
        children: [
            "languages",
            {
                id: "darkMode",
                name: "DARK_MODE",
                handler: DarkModeHandler
            }
        ]
    }
];

const Settings = {
    Pages,
    Sidebar
};

export default Settings