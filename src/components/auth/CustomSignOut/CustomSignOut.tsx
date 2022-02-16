import React from "react";
import { Auth } from "aws-amplify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core"; // TODO: Update fort-awesome and remove this cast

import  "./CustomSignOut.scss";

const CustomSignOut = () => {
    return (
        <span className="customSignOut" onClick={() => Auth.signOut()}>
            <FontAwesomeIcon icon={faSignOutAlt as IconProp} /> Logout
        </span>
    );
}

export default CustomSignOut;