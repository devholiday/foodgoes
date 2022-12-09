import {useEffect, useContext} from "react";
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {useForm} from "react-hook-form";

import { useTranslation } from '../../hooks/useTranslation';

export default function LoginPhone({setStep}) {
    const { translate } = useTranslation();

    const auth = getAuth();
    auth.languageCode = 'en';

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        window.applicationVerifier = new RecaptchaVerifier('recaptcha-container', {'size': 'invisible'}, auth);
    }, []);

    const normalizePhoneNumber = number => {
        if (!number || !number.trim()) return null;
        return '+972' + number.match(/\d/g).join('');
    }

    const onSubmit = async data => {
        try {
            let {phoneNumber} = data;

            phoneNumber = normalizePhoneNumber(phoneNumber);
            if (!phoneNumber) {
                return;
            }
    
            signInWithPhoneNumber(auth, phoneNumber, window.applicationVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    setStep(2);
                }).catch((error) => {
                    console.log(error)
            });

        } catch(e) {
            console.log(e)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-block">
                <label>{translate('phone')}</label>
                <div className="input-box">
                    <span className="prefix">+972</span>
                    <input type='tel' {...register("phoneNumber", { required: true })} />
                </div>
            </div>
            <div id="recaptcha-container"></div>
            <input  type="submit" value={translate('next')} />
        </form>
    )
}