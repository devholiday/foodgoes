import styles from '../styles/Button.module.css'

export default function Button({children, ...props}) {
    const {onClick, plain, url, external=false, fullWidth=false} = props;

    let className = styles.button;

    if (plain) {
        className += ' ' + styles.buttonPlain;
    }
    if (fullWidth) {
        className += ' ' + styles.buttonFullWidth;
    }

    if (url) {
        return <a target={!external ? '_self' : '_blank'} href={url} rel="noopener noreferrer">{children}</a>;
    }

    return <button className={className} onClick={onClick}>{children}</button>
}