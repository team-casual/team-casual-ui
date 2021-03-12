import React from "react";
import { Authenticator, SignIn } from "aws-amplify-react";
import { CustomSignIn } from "../../components/auth/CustomSignIn/CustomSignIn";

export interface LoginProps {
    user: any
}

const Login = (props: LoginProps) => {
    return (
        <>
            {props.user === null &&
                <Authenticator hide={[SignIn]}>
                    <CustomSignIn />
                </Authenticator>
            }
        </>
    );
}

export default Login;