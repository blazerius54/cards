import React, { Component } from 'react';
import startGame from '../images/other/StartGame.png'

class Start extends Component {
    startTheGame() {
        this.props.startTheGame()
    }
    render () {
        return (
        <div className='start-div'>
            <img src={startGame} alt=''/>
            <span>MEMORY GAME</span>
            <button
            onClick={this.startTheGame.bind(this)}
            >Начать
            </button>
        </div>)
    }
}

export default Start