import styles from '../styles/Modal.module.css'
import Button from './button';

export default function Modal(props) {
    const {activator, open, title, onClose, children, primaryAction, secondaryActions} = props;

    return (
        <>
            <div>
                {activator}
            </div>
            { open && (
                <>
                    <div className={styles.overlay} onClick={onClose}></div>
                    <div className={styles.modal}>
                        <div className={styles.container}>
                            {title && (
                                <div className={styles.header}>
                                    <div><h2>{title}</h2></div>
                                    <Button onClick={onClose}>X</Button>
                                </div>
                            )}
                            {children && (
                                <div className={styles.content}>{children}</div>
                            )}
                            <div className={styles.footer}>
                                {primaryAction && <Button onClick={primaryAction.onAction}>{primaryAction.content}</Button>}
                                {secondaryActions && (
                                    <div className={styles.secondaryActions}>
                                        {secondaryActions.map((secondaryAction, i) => 
                                            <div key={i}><Button onClick={secondaryAction.onAction}>{secondaryAction.content}</Button></div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}