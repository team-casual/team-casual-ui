import React from "react";
import { Auth } from "aws-amplify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import  "./CustomSignOut.scss";

const CustomSignOut = () => {
    return (
        <span className="customSignOut" onClick={() => Auth.signOut()}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </span>
    );
}

export default CustomSignOut;