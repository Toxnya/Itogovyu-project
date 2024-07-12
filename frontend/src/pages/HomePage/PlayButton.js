import React from 'react'
import {faCirclePlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PlayButton = ({ onClick }) => {
    return (
        <div className="play-button" onClick={onClick}>
            <FontAwesomeIcon icon={faCirclePlay} color="white" size="4x"/>
        </div>
    );
};

export default PlayButton;