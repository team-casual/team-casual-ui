import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

import { SignOut } from 'aws-amplify-react';
import { Auth, Hub } from "aws-amplify";

const SiteNav = () => {
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const getUser = async () => {
            try {
                const userResponse = await Auth.currentUserInfo();
                setUser(userResponse);
            }
            catch (error) {
                setUser(null);
            }
        }

        Hub.listen("auth", getUser, "SiteNav");
    }, []);

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
                    {user === null &&
                        <LinkContainer to="/Login">
                            <Nav.Link>
                                <FontAwesomeIcon icon={faSignInAlt} /> Login
                        </Nav.Link>
                        </LinkContainer>
                    }

                    {user !== null &&
                        <SignOut />
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default SiteNav;