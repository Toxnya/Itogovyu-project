import React from 'react';
import registerIcon from '../../images/icons8-user-90.png';

const AuthIcon = ({ openAuthModal }) => {
    return (
        <img
            src={registerIcon}
            alt="Register/Login"
            className="icon"
            onClick={openAuthModal}
        />
    );
};

export default AuthIcon;
