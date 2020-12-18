import React, { Component } from 'react';
// import axios from 'axios';
// import {apiKey, apiURL} from "../../utils/axios";
import "./Card.scss";

class Card extends Component {

    clickHandler(cardNum){
        this.props.flipCard(cardNum)
    }
    
    render() {
        return (
            <div onClick={() => this.clickHandler(this.props.cardNum)} className={"card" + (!this.props.isClosed ? ' opened' : '') + (this.props.isMatch ? ' matched' : '')}>
                <div className="card__front"></div>
                <div className="card__back">
                    <p className="card__image">{this.props.cardEmoji}</p></div>
                </div>
        );
    }
}

export default Card;