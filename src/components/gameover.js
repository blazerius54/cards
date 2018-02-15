import React, { Component } from 'react';
import endGame from '../images/other/Group2.png'


class GameOver extends Component {
    startTheGame() {
        this.props.startTheGame()
    }
    render () {
        return (
            <div className='game-over-div'>
                <img src={endGame} alt='' />
                <p>Поздравляем!</p>
                <p>Ваш итоговый счёт: {this.props.score}</p>
                <button
                    onClick={this.startTheGame.bind(this)}
                >Ещё раз</button>
            </div>
        )
    }
}

export default GameOver