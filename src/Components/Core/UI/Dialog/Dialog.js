import styles from "./Dialog.module.scss"
import Modal from "@components/Core/UI/Util/Modal"
import { joinClasses } from "@util/styles"

export default function Dialog({ classes, title, visible, children, ...props }) {

    return <Modal visible={visible}>
        <div className={joinClasses(styles, { root: true }, classes?.root)} {...props}>
            <div className={joinClasses(styles, { title: true }, classes?.title)}>
                {title}
            </div>
            <div className={joinClasses(styles, { body: true }, classes?.body)}>
                {children}
            </div>
        </div>
    </Modal>;
}
