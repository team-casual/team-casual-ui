import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

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
                </Nav>

                <Nav>
                    {props.user === null &&
                        <LinkContainer to="/Login">
                            <Nav.Link>
                                <FontAwesomeIcon icon={faSignInAlt} /> Login
                            </Nav.Link>
                        </LinkContainer>
                    }

                    {props.user !== null &&
                        <CustomSignOut />
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default SiteNav;