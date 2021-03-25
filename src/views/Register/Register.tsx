import React from "react";
import { Authenticator, SignIn, SignUp } from "aws-amplify-react";

export interface RegisterProps {
    user: any
}

const Register = (props: RegisterProps) => {
    return (
        <>
            {props.user === null &&
                <Authenticator hide={[SignUp, SignIn]}>
                    <div>Test</div>
                </Authenticator>
            }
        </>
    );
}

export default Register;