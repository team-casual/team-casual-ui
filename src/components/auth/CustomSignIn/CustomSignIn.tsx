import React, { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Auth } from "aws-amplify";
import { IAuthenticatorProps } from "aws-amplify-react/lib-esm/Auth/Authenticator";
import { Container, Row, Col, Card, InputGroup, FormControl, Button, Spinner } from "react-bootstrap";
import { Status } from "../../../models/enums/Status";
import { toastErrorConfig } from "../../common/toastHelpers";

import logo from '../../../logo.svg';

import "./CustomSignIn.scss";

export const CustomSignIn = (props: IAuthenticatorProps) => {
    const [status, setStatus] = useState<Status>(Status.LOADED);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const stateChangeHandler = (state: string, data?: any) => {
        if (props.onStateChange) {
            props.onStateChange(state, data);
        }
        else {
            return;
        }
    };

    const registerLink = () => {
        stateChangeHandler("signUp");
    };

    const signIn = async (event: FormEvent, username: string, password: string) => {
        event.preventDefault();
        setStatus(Status.LOADING);

        try {
            const user = await Auth.signIn(username, password);
            stateChangeHandler("signedIn", user);
        }
        catch (error: any) {
            if (error.code === "UserNotConfirmedException") {
                stateChangeHandler("confirmSignUp", username);
                setStatus(Status.LOADED);
            }
            else {
                console.error(error);
                if (error.message) {
                    toast.error(error.message, toastErrorConfig);

                    setStatus(Status.ERROR);
                }
            }
        }
    }

    if (!["signIn", "signedOut", "signedUp"].includes(props.authState ?? "")) {
        return null;
    }
    else {
        return (
            <>
                <ToastContainer />

                <Container className="signInContainer">
                    <Row className="text-center mb-4">
                        <Col lg="2" sm="12"></Col>
                        <Col lg="3" sm="12" className="signInTitleContainer">
                            <img className="signInLogo" src={logo} alt="Team Casual Logo" />
                        </Col>

                        <Col lg="3" sm="12" className="signInTitleContainer">
                            <h2 className="text-white text-center signInTitle">Team Casual</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg="3" sm="12"></Col>
                        <Col lg="6" sm="12">
                            <Card className="signInCard">
                                <Card.Body className="signInCardBody">
                                    <form onSubmit={(e) => signIn(e, username, password)}>
                                        <Row>
                                            <Col>
                                                <label htmlFor="email">Email</label>
                                                <InputGroup className="mb-5">
                                                    <FormControl
                                                        id="email"
                                                        type="email"
                                                        placeholder="Enter your email address"
                                                        onChange={e => setUsername(e.target.value)}
                                                        required />
                                                </InputGroup>

                                                <label htmlFor="email">Password</label>
                                                <InputGroup className="mb-5">
                                                    <FormControl
                                                        id="password"
                                                        type="password"
                                                        placeholder="Enter your password"
                                                        onChange={e => setPassword(e.target.value)}
                                                        required />
                                                </InputGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="text-center">
                                                {status !== Status.LOADING &&
                                                    <>
                                                        <Row>
                                                            <Col className="text-left">
                                                                <Button className="signInButton text-white" type="submit" variant="outline">Login</Button>
                                                            </Col>

                                                            <Col className="text-right">
                                                                <Button className="registerLink text-white" type="button" variant="outline" onClick={() => registerLink()}>Register</Button>
                                                            </Col>
                                                        </Row>
                                                    </>
                                                }

                                                {status === Status.LOADING &&
                                                    <Spinner animation="grow" style={{ color: "#61dafb" }}>
                                                        <span className="sr-only">Loading...</span>
                                                    </Spinner>
                                                }
                                            </Col>
                                        </Row>
                                    </form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}