import React from 'react';
import "./Instructions.scss";

const Instructions = () => {
    return (
        <div className="instructions">
            <p className="instructions__title">Test Your Memory!</p>
            <p className="instructions__instructions">Click on a card to reveal the contents on the backside and match it with its pair</p>
        </div>
    );
};

export default Instructions;