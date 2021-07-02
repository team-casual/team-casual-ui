import React from "react";
import { Authenticator, ConfirmSignUp, SignIn } from "aws-amplify-react";
import { CustomConfirmSignUp } from "../../components/auth/CustomConfirmSignUp/CustomConfirmSignUp";

export interface ConfirmProps {
    user: any
}

const Confirm = (props: ConfirmProps) => {
    return (
        <>
            {props.user === null &&
                <Authenticator hide={[SignIn, ConfirmSignUp]}>
                    <CustomConfirmSignUp />
                </Authenticator>
            }
        </>
    );
}

export default Confirm;