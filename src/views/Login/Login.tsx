import React from "react";
import { Authenticator, SignIn } from "aws-amplify-react";
import { CustomSignIn } from "../../components/auth/CustomSignIn/CustomSignIn";

// export interface LoginProps {
//     user: any
// }

// const Login = (props: LoginProps) => {
//     return (
//         <>
//             {!props.user &&
//                 <Authenticator hide={[SignIn]}>
//                     <CustomSignIn />
//                 </Authenticator>
//             }

//             {props.user && 
//                 <p>You are signed in as: {props.user.username}.</p>
//             }
//         </>
//     );
// }

const Login = () => {
    return <Authenticator />;
}

export default Login;