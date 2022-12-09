import { getAuth, signOut } from "firebase/auth";
import { useTranslation } from '../hooks/useTranslation';
import Button from "./button";

export default function Logout() {
    const { translate } = useTranslation();

    const logout = () => {
        const auth = getAuth();

        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    };

    return <Button onClick={() => logout()}>{translate('logout')}</Button>;
}