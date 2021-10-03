import Edit from "src/Components/Core/UI/Widgets/Edit";
import styles from "./Panel.module.scss";

export default function Pane({ item }) {
    return <div className={styles.root}>
        <Edit.State value={item.id}>
            <Edit className={styles.title} />
        </Edit.State>
        <Edit.State value={item.value}>
            <Edit multiLine={true} className={styles.value} />
        </Edit.State>
    </div>;
}
