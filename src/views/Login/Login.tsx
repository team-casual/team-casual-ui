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

            {props.user !== null && 
                <p>You are signed in as: {props.user.attributes.email}.</p>
            }
        </>
    );
}

export default Login;