import React, { Component } from 'react';

class Card extends Component {
    setPickedCard() {
        this.props.setPickedCard(this.props.src, this.props.index)
    }
    
    renderCard () {

      if(this.props.isFlipped === true) {
        return (  
          <img
          src={this.props.src} 
          alt="" 
          />
        )
      } else {
        return 'рубашка'
      }
    }
    
    render() {
      return(
        <div 
        className='img-container'
        onClick={this.setPickedCard.bind(this)} 
        >
          {this.renderCard()}
        </div>
      )
    }
  }

export default Card