import React from "react";
import { Authenticator, SignIn, SignUp, ConfirmSignUp } from "aws-amplify-react";
import { CustomSignIn } from "../../components/auth/CustomSignIn/CustomSignIn";
import { CustomSignUp } from "../../components/auth/CustomSignUp/CustomSignUp";
import { CustomConfirmSignUp } from "../../components/auth/CustomConfirmSignUp/CustomConfirmSignUp";

export interface LoginProps {
    user: any
}

const Login = (props: LoginProps) => {
    return (
        <>
            {props.user === null &&
                <Authenticator hide={[SignIn, SignUp, ConfirmSignUp]}>
                    <CustomSignIn />
                    <CustomSignUp />
                    <CustomConfirmSignUp />
                </Authenticator>
            }
        </>
    );
}

export default Login;