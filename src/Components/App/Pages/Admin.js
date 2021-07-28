import Storage from "@components/App/Pages/Admin/Storage"
import { MdExtension } from "react-icons/md";

const Pages = [
    ...Storage.Pages
];

const Sidebar = [
    {
        id: "admin",
        name: "ADMIN",
        open: false,
        icon: <MdExtension />,
        children: [
            ...Storage.Sidebar
        ]
    }
];

const Admin = {
    Pages,
    Sidebar
};

export default Admin