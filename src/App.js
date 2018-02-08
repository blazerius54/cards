import React, { Component } from 'react';
import './App.css';
import Start from './components/start';
import GameOver from './components/gameover';
import Card from './components/card';
import startGame from './images/other/StartGame.png';
import endGame from './images/other/Group2.png';

function importAll(r) {
  return r.keys().map(r);
}

let imagesSRC = importAll(require.context('./images', false, /\.(png|jpe?g)$/));
let imagesMain
let images = [];
images.length = 9;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameOn: false,
      gameOver: false,
      score: 0,
      selectedImages: imagesMain,
      pickedCards: [],
      isPickedCardsFull: false,
      finalArray: [],
      openedCards: [],
      isFirstGame: true
    }
  
  }

  setImagesMain() {
    let indexArr = [];
    for (let i = 0; i < images.length; i++) {
      images[i] = { src: null, isFlipped: true};
      let rndNum = Math.floor(Math.random() * imagesSRC.length)
      if (indexArr.includes(rndNum)) {
        rndNum = Math.floor(Math.random() * imagesSRC.length);
        i--;
      } else {
        indexArr.push(rndNum);
        images[i].src = imagesSRC[rndNum];
      }
    }

    imagesMain = images.concat(images);
    imagesMain = JSON.parse(JSON.stringify(imagesMain));
    
    for(let i=0; i<imagesMain.length; i++) {
      imagesMain[i].id = i
    }

    this.setState({
      selectedImages: imagesMain
    })
  }

  componentWillMount() {
    this.setImagesMain.bind(this)()
  }
  
  startTheGame() {
    if(!this.state.isFirstGame) {
      this.setImagesMain.bind(this)();
      this.randomizeCards.bind(this)();
      
      this.setState({
        // finalArray: this.state.selectedImages.filter((card) => { return card.src }),
        gameOver: false,
        score: 0
      })
    }
    this.setState({
      finalArray: this.state.selectedImages.filter((card) => { return card.src }),      
      isFirstGame: false,
      isGameOn: true
    })

    this.timeOutFunc.bind(this)()
  }
  

  timeOutFunc () {
    setTimeout(() => {
      let temproraryImg = JSON.parse(JSON.stringify(this.state.selectedImages));
      temproraryImg.forEach((item) => { item.isFlipped = false });
      this.setState({
        selectedImages: temproraryImg
      })
    }, 5000)
  }

  componentDidMount() {
    // this.randomizeCards.bind(this)();
    this.setState({
      // finalArray: this.state.selectedImages.filter((card) => { return card.src })
    })
    console.log('loaded')
  }

  randomizeCards() {
    let indexArr = [];
    let resultArr = [];
    resultArr.length = this.state.selectedImages.length;
    for(let i=0; i<this.state.selectedImages.length; i++) {
      let rndNum = Math.floor(Math.random()*this.state.selectedImages.length);
      if(indexArr.includes(rndNum)){
        rndNum = Math.floor(Math.random()*this.state.selectedImages.length);
        i--;
      } else {
        indexArr.push(rndNum);
        // images[i].src = imagesSRC[rndNum];
        // this.state.selectedImages[i].id = i;
        resultArr[rndNum] = this.state.selectedImages[i];
        console.log(this.state.selectedImages[i].id)
      }
    };
    console.log(indexArr)
    this.setState({
      selectedImages: resultArr
    })
  }


  
  flipTheCard (i) {
    //меняем значение flip карты
    let oldSelectedImages = this.state.selectedImages;
    if(!this.state.isPickedCardsFull) {
      oldSelectedImages[i].isFlipped = true;
    }
  }
  
  
  setPickedCard (card, i) {
    let oldSelectedImages = this.state.selectedImages;    

    this.flipTheCard.bind(this)(i);
    
    this.setState({
      pickedCards: [...this.state.pickedCards, oldSelectedImages[i]],
            
    })
    
    this.checkArray.bind(this)(i);
  }
  
  checkIsGameOver () {
    if(this.state.openedCards.length === this.state.selectedImages.length) {
      this.setState({
        isGameOn: false,
        gameOver: true,
        selectedImages: imagesMain,
        pickedCards: [],
        isPickedCardsFull: false,
        finalArray: [],
        openedCards: [],
      })
    }
  }

  checkArray (i) {
    if(this.state.pickedCards.length === 2) {
      this.setState({
        pickedCards:this.state.pickedCards
      })
    }

    if(this.state.pickedCards.length === 1) {
      if(this.state.selectedImages[i].id === this.state.pickedCards[0].id) {
        console.log('совпадение');
        this.setState({
          pickedCards:this.state.pickedCards,
          isPickedCardsFull: false
        })
      } else {
        this.setState({
          isPickedCardsFull: true
        })
      }

      let timer = setTimeout(()=>{
        if(this.state.pickedCards.length === 2 ) {
          if(this.state.pickedCards[0].src===this.state.pickedCards[1].src) {
            clearTimeout(timer);
            let oldPickedCards = this.state.pickedCards;
            oldPickedCards[0].src = null;
            oldPickedCards[1].src = null;
            
            this.setState({
              pickedCards: oldPickedCards,
              finalArray: this.state.selectedImages.filter((card) => { return card.src }),
              openedCards: this.state.selectedImages.filter((card) => { return card.isFlipped }),
              
            });
            this.setState({
              score: this.state.score + this.state.finalArray.length * 42,
              // selectedImages: this.state.selectedImages.filter((card)=>{return !card.isFlipped}),              
              // selectedImages: this.state.selectedImages.filter((card)=>{return !card.isFlipped}), 
              pickedCards: [], 
              isPickedCardsFull: false
            })

          } else {
            let oldSelectedImages = this.state.pickedCards;    
            oldSelectedImages[0].isFlipped = false;
            oldSelectedImages[1].isFlipped = false;
            
            this.setState({
              score: this.state.score - this.state.openedCards.length * 42,                                         
              pickedCards: [], 
              isPickedCardsFull: false
            })
          }
        }
        this.checkIsGameOver.bind(this)();    
        
      }, 1000)
      
    }
  }

  resetGame() {
    this.randomizeCards.bind(this)();
    this.setImagesMain.bind(this)();
    // this.startTheGame.bind(this)()
    this.timeOutFunc.bind(this)()
          this.setState({
            // isFirstGame: false,
                finalArray: this.state.selectedImages.filter((card) => { return card.src }),
            pickedCards: [],
            openedCards: [],
            score: 0
          })
        
  }

  renderGame () {
      return (
        <div className='game'>
          <div className='game-info'>
            <p>Очки: {this.state.score}</p>
            <button
            onClick={this.resetGame.bind(this)}
            >Начать заново</button>
          </div>
          <div className='board'>
            {this.state.selectedImages !== undefined ?
              this.state.selectedImages.map((item, index) => {
                return (
                  <Card
                    key={index}
                    index={index}
                    src={item.src}
                    isFlipped={item.isFlipped}
                    setPickedCard={this.setPickedCard.bind(this)}
                  />
                )
              }) : ''
            }
          </div>
        </div>
      )
  }

  render() {
    return (
      <div className="App">
        {this.state.isGameOn? this.renderGame(): ''}
        {this.state.isFirstGame? <Start startTheGame={this.startTheGame.bind(this)}/>: ''}
        {this.state.gameOver? <GameOver startTheGame={this.startTheGame.bind(this)} score={this.state.score}/>: ''}
      </div>
    );
  }
}


export default App;