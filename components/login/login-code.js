import {doc, setDoc, getFirestore} from "firebase/firestore";
import {getAdditionalUserInfo } from "firebase/auth";
import {useForm} from "react-hook-form";

export default function LoginCode({onClose}) {
    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        try {
            const {code} = data;

            window.confirmationResult.confirm(code).then(async (result) => {
                const user = result.user;

                const {isNewUser} = getAdditionalUserInfo(result);
                if (isNewUser) {
                    const db = getFirestore();
                    await setDoc(doc(db, "users", user.uid), {id: user.uid, phoneNumber: user.phoneNumber, enabled: true});
                }

                onClose();
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                throw error;
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-block">
                <input type='input' {...register("code", { required: true })} placeholder="Code" />
            </div>
            <input className="btn-secondary" type="submit" value="Log in" />
        </form>
    );
}