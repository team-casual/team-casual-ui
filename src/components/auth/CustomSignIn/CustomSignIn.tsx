import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { IAuthenticatorProps } from "aws-amplify-react/lib-esm/Auth/Authenticator";


export const CustomSignIn = (props: IAuthenticatorProps) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const signIn = async (username: string, password: string) => {
        try {
            const user = await Auth.signIn(username, password);
            if (!props.onStateChange) {
                return;
            }

            if (user.challengeName === "SMS_MFA" || user.challengeName === "SOFTWARE_TOKEN_MFA") {
                props.onStateChange("confirmSignIn", user);
            }
            else {
                props.onStateChange("signedIn", user);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    if (!["signIn", "signedOut", "signedUp"].includes(props.authState ?? "")) {
        return null;
    }
    else {

        return (
            <>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)} />

                <input
                    type="password"
                    onChange={e => setPassword(e.target.value)} />

                <button type="button" onClick={() => signIn(username, password)}>Sign In</button>
            </>
        );
    }
}