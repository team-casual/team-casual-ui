import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col, Card, InputGroup, FormControl, Button, Spinner } from "react-bootstrap";
import { Status } from "../../../models/enums/Status";
import { LinkContainer } from "react-router-bootstrap";

import logo from '../../../logo.svg';

import "./CustomSignUp.scss";

export const CustomSignUp = () => {
    const [status, setStatus] = useState<Status>(Status.LOADED);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    return (
        <>
            <ToastContainer />

            <Container className="signUpContainer">
            <Row className="text-center">
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
                                <form onSubmit={(e) => { }}>
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

                                            <label htmlFor="email">Confirm Password</label>
                                            <InputGroup className="mb-5">
                                                <FormControl
                                                    id="password"
                                                    type="password"
                                                    placeholder="Confirm your password"
                                                    onChange={e => setConfirmPassword(e.target.value)}
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
                                                            <Button className="signUpButton text-white" type="submit" variant="outline">Submit</Button>
                                                        </Col>

                                                        <Col className="text-right">
                                                            <LinkContainer to="/login">
                                                                <Button className="loginLink text-white" type="button" variant="outline">Back</Button>
                                                            </LinkContainer>
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