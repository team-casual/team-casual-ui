import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { IAuthenticatorProps } from "aws-amplify-react/lib-esm/Auth/Authenticator";
import { Container, Row, Col, Card, InputGroup, FormControl } from "react-bootstrap";

import logo from '../../../logo.svg';

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
            <Container className="signInContainer">
                <Row className="text-center">
                    <Col lg="2" sm="12"></Col>
                    <Col lg="3" sm="12" className="signInTitleContainer">
                        <img className="signInLogo" src={logo} alt="Team Casual Logo" />
                    </Col>

                    <Col lg="3" sm="12" className="signInTitleContainer">
                        <h2 className="text-white text-center">Team Casual</h2>
                    </Col>
                </Row>

                <Row>
                    <Col lg="3" sm="12"></Col>
                    <Col lg="6" sm="12">
                        <Card className="signInCard">
                            <Card.Body className="signInCardBody">
                                <Row>
                                    <Col>
                                        <label htmlFor="email">Email</label>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                id="email"
                                                type="email"
                                                placeholder="Enter your email address"
                                                onChange={e => setUsername(e.target.value)} />
                                        </InputGroup>

                                        <label htmlFor="email">Password</label>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                id="email"
                                                type="password"
                                                placeholder="Enter your password"
                                                onChange={e => setPassword(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <button className="w-25" type="button" onClick={() => signIn(username, password)}>Sign In</button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}