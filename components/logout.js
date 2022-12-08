import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { LocaleContext } from "../context/locale-context";
import Button from "./button";

export default function Logout() {
    const {i18n} = useContext(LocaleContext);

    const logout = () => {
        const auth = getAuth();

        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    };

    return <Button onClick={() => logout()}>{i18n.logout}</Button>;
}