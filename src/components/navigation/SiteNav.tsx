import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core"; // TODO: Update fort-awesome and remove this cast

import CustomSignOut from "../auth/CustomSignOut/CustomSignOut";
//import { SignOut } from 'aws-amplify-react';

export interface SiteNavProps {
    user: any
}

const SiteNav = (props: SiteNavProps) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
                Team Casual
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/Minecraft">
                        <Nav.Link>Minecraft</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/DnD">
                        <Nav.Link>DnD</Nav.Link>
                    </LinkContainer>
                </Nav>

                <Nav>
                    {props.user === null &&
                        <LinkContainer to="/Login">
                            <Nav.Link>
                                <FontAwesomeIcon icon={faSignInAlt as IconProp} /> Login
                            </Nav.Link>
                        </LinkContainer>
                    }

                    {props.user !== null &&
                        <>
                            <Navbar.Text className="mr-4">
                                <small>{props.user.attributes.email}</small>
                            </Navbar.Text>

                            <Navbar.Brand>
                                <CustomSignOut />
                            </Navbar.Brand>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default SiteNav;