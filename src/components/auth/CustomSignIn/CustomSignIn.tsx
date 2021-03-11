import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { IAuthenticatorProps } from "aws-amplify-react/lib-esm/Auth/Authenticator";
import { Container, Row, Col, Card } from "react-bootstrap";

import "./CustomSignIn.scss";

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
            <Container className="h-100 text-center">
                <Card>
                    <Card.Header>
                        Sign In
                    </Card.Header>
                    <Card.Body>

                        <Row className="m-3">
                            <Col>
                                <input
                                    className="w-25"
                                    type="text"
                                    placeholder="Username"
                                    onChange={e => setUsername(e.target.value)} />
                            </Col>
                        </Row>

                        <Row className="m-3">
                            <Col>
                                <input
                                    className="w-25"
                                    type="password"
                                    onChange={e => setPassword(e.target.value)} />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <button className="w-25" type="button" onClick={() => signIn(username, password)}>Sign In</button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}