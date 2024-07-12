import React from 'react';


const registerIcon = 'https://res.cloudinary.com/dg3rglilr/image/upload/v1720534581/icons8-user-90_ufyn3x.png';

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
