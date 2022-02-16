import React, { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col, Card, InputGroup, FormControl, Button, Spinner, Form } from "react-bootstrap";
import { Status } from "../../../models/enums/Status";
import { Auth, Logger } from 'aws-amplify';
import { toastErrorConfig, toastInfoConfig } from "../../common/toastHelpers";
import { IAuthenticatorProps } from "aws-amplify-react/lib-esm/Auth/Authenticator";


import logo from '../../../logo.svg';

import "./CustomConfirmSignUp.scss";
import { validateConfirmationCode } from "../authHelpers";
import { useEffect } from "react";

const logger = new Logger("CustomConfirmSignUp");

export const CustomConfirmSignUp = (props: IAuthenticatorProps) => {
    const [status, setStatus] = useState<Status>(Status.LOADED);
    const [validated, setValidated] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [codeResent, setCodeResent] = useState<boolean>(false);

    useEffect(() => {
        setUsername(props.authData ?? "");
        setCodeResent(false);
    }, [props.authData]);

    const backButton = () => {
        if (props.onStateChange) {
            props.onStateChange("signIn");
        }
    };

    const updateCode = (event: any, newCode: string) => {
        validateConfirmationCode(event, newCode);
        setCode(newCode);
    };

    const resendConfirmation = async () => {
        if (!codeResent) {
            try {
                logger.info(`Resending confirmation code to: ${username}`);

                await Auth.resendSignUp(username);
                setCodeResent(true);
                toast.info("Email Sent.", toastInfoConfig);
            }
            catch (error) {
                logger.error(`Error resending confirmation code: ${error.message}`);

                if (error.message) {
                    toast.error(error.message, toastErrorConfig);

                    setStatus(Status.ERROR);
                }
            }
        }
    }

    const confirmSignUp = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity()) {
            try {
                logger.info(`Checking confirmation code, username: ${username}`);

                await Auth.confirmSignUp(username, code);

                if (props.onStateChange) {
                    props.onStateChange("signedUp");
                }
            }
            catch (error) {
                logger.error(`Error confirming code: ${error.message}`);

                if (error.message) {
                    toast.error(error.message, toastErrorConfig);

                    setStatus(Status.ERROR);
                }
            }
        }

        setValidated(true);
    };

    if (props.authState !== "confirmSignUp") {
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
                            <h2 className="text-white text-center signUpTitle">Confirm Your Account</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <p className="text-white text-center">A 6 digit verification code should have been sent to the email address below.</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg="3" sm="12"></Col>
                        <Col lg="6" sm="12">
                            <Card className="signUpCard">
                                <Card.Body className="signUpCardBody">
                                    <Form onSubmit={confirmSignUp} validated={validated} noValidate>
                                        <Row>
                                            <Col>
                                                <label htmlFor="email">Email</label>
                                                <InputGroup className="mb-5">
                                                    <FormControl
                                                        id="email"
                                                        type="email"
                                                        placeholder="Enter your email address"
                                                        defaultValue={username}
                                                        onChange={e => setUsername(e.target.value)}
                                                        required />
                                                </InputGroup>

                                                <label htmlFor="code">Code</label>
                                                <InputGroup className="mb-5">
                                                    <FormControl
                                                        id="code"
                                                        type="text"
                                                        placeholder="Enter your confirmation code"
                                                        onChange={e => updateCode(e, e.target.value)}
                                                        required />

                                                    <Form.Control.Feedback type="invalid">
                                                        Code must:
                                                        <ul>
                                                            <li>Be 6 characters in length.</li>
                                                        </ul>
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

                                                            <Col className="text-center">
                                                                <Button className="signUpButton text-white" type="button" variant="outline" onClick={() => resendConfirmation()} disabled={codeResent}>Resend</Button>
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