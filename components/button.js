export default function Button({children, ...props}) {
    const {onClick} = props;

    return <button onClick={onClick}>{children}</button>
}