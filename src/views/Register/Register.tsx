import React from "react";
import { Authenticator, SignIn, SignUp } from "aws-amplify-react";
import { CustomSignUp } from "../../components/auth/CustomSignUp/CustomSignUp";

export interface RegisterProps {
    user: any
}

const Register = (props: RegisterProps) => {
    return (
        <>
            {props.user === null &&
                <Authenticator hide={[SignUp, SignIn]}>
                    <CustomSignUp />
                </Authenticator>
            }
        </>
    );
}

export default Register;