import {useState} from "react";
import type {GenerateFormProps} from "../../../bll/types.ts";
import VerificationEmail from "./VerificationEmail.tsx";
import SendEmailForm from "./SendEmailForm.tsx";


function GenerateForm({setNewUser, setError}: GenerateFormProps) {
    const [inProgressEmail, setInProgressEmail] = useState<string | null>("");

    return (
        <div>
            {inProgressEmail
                ? <VerificationEmail email={inProgressEmail}
                                     setNewUser={setNewUser}
                />
                : <SendEmailForm setError={setError}
                                 setInProgressEmail={setInProgressEmail}
                />
            }
        </div>
    )
}

export default GenerateForm;
