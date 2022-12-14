import styles from '../styles/Modal.module.css'
import Button from './button';
import CloseSVG from '../public/icons/close'

export default function Modal(props) {
    const {activator, open, title, onClose, children, primaryAction, secondaryActions} = props;

    return (
        <>
            {activator && <div>{activator}</div>}
            
            { open && (
                <>
                    <div className={styles.overlay} onClick={onClose}></div>
                    <div className={styles.modal}>
                        <div className={styles.container}>
                            {title && (
                                <div className={styles.header}>
                                    <div><h2>{title}</h2></div>
                                    <Button plain onClick={onClose}><CloseSVG /></Button>
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