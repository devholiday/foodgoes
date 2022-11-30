import { getAuth, signOut } from "firebase/auth";

import Button from "./button";

export default function Logout() {
    const logout = () => {
        const auth = getAuth();

        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    };

    return <Button onClick={() => logout()}>Logout</Button>;
}