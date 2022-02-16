import React, { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col, Card, InputGroup, FormControl, Button, Spinner, Form } from "react-bootstrap";
import { Status } from "../../../models/enums/Status";
import { validateConfirmPassword, validatePassword } from "../authHelpers";
import { MIN_PASSWORD_LENGTH } from "../MIN_PASSWORD_LENGTH";
import { Auth, Logger } from 'aws-amplify';
import { toastErrorConfig } from "../../common/toastHelpers";
import { IAuthenticatorProps } from "aws-amplify-react/lib-esm/Auth/Authenticator";

import logo from '../../../logo.svg';

import "./CustomSignUp.scss";

const logger = new Logger("CustomSignUp");

export const CustomSignUp = (props: IAuthenticatorProps) => {
    const [status, setStatus] = useState<Status>(Status.LOADED);
    const [validated, setValidated] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const backButton = () => {
        if (props.onStateChange) {
            props.onStateChange("signIn");
        }
    };

    const updatePassword = (event: any, newPassword: string) => {
        validatePassword(event, newPassword);
        setPassword(newPassword);
    };

    const updateConfirmPassword = (event: any, newPassword: string) => {
        validateConfirmPassword(event, newPassword, password);
    };

    const signUp = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity()) {
            try {
                logger.info(`New sign up request, username: ${username}`);

                const result = await Auth.signUp(username, password);

                if (!props.onStateChange) {
                    return;
                }
                else {
                    if (result.userConfirmed) {
                        const user = await Auth.signIn(username, password);
                        props.onStateChange("signedIn", user);
                    }

                    if (!result.userConfirmed) {
                        props.onStateChange("confirmSignUp", result.user.getUsername());
                    }
                }
            }
            catch (error: any) {
                logger.error(`Sign up error: ${error.message}`);

                if (error.message) {
                    toast.error(error.message, toastErrorConfig);

                    setStatus(Status.ERROR);
                }
            }
        }

        setValidated(true);
    }

    if (props.authState !== "signUp") {
        return null;
    }
    else {
        return (
            <>
                <ToastContainer />

                <Container className="signUpContainer">
                    <Row className="text-center mb-4">
                        <Col lg="2" sm="12"></Col>
                        <Col lg="3" sm="12" className="signUpTitleContainer">
                            <img className="signUpLogo" src={logo} alt="Team Casual Logo" />
                        </Col>

                        <Col lg="4" sm="12" className="signUpTitleContainer">
                            <h2 className="text-white text-center signUpTitle">Create an Account</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg="3" sm="12"></Col>
                        <Col lg="6" sm="12">
                            <Card className="signUpCard">
                                <Card.Body className="signUpCardBody">
                                    <Form onSubmit={signUp} validated={validated} noValidate>
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
                                                        onChange={e => updatePassword(e, e.target.value)}
                                                        required />

                                                    <Form.Control.Feedback type="invalid">
                                                        Passwords must:
                                                        <ul>
                                                            <li>Be {MIN_PASSWORD_LENGTH} characters in length.</li>
                                                            <li>Include a number</li>
                                                            <li>Include lowercase characters</li>
                                                            <li>Include uppercase characters</li>
                                                        </ul>
                                                    </Form.Control.Feedback>
                                                </InputGroup>

                                                <label htmlFor="email">Confirm Password</label>
                                                <InputGroup className="mb-5">
                                                    <FormControl
                                                        id="confirmPassword"
                                                        type="password"
                                                        placeholder="Confirm your password"
                                                        onChange={e => updateConfirmPassword(e, e.target.value)}
                                                        required />

                                                    <Form.Control.Feedback type="invalid">
                                                        Passwords must match.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="text-center">
                                                {status !== Status.LOADING &&
                                                    <>
                                                        <Row>
                                                            <Col className="text-left">
                                                                <Button className="signUpButton text-white" type="submit" variant="outline">Submit</Button>
                                                            </Col>

                                                            <Col className="text-right">
                                                                <Button className="loginLink text-white" type="button" variant="outline" onClick={() => backButton()}>Back</Button>
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
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}