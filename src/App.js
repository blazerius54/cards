import React, { Component } from 'react';
import './App.css';
import Card from './components/card'
// function shuffle(array) {
//   var currentIndex = array.length, temporaryValue, randomIndex;

//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {

//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     // And swap it with the current element.
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }

// // Used like so
// var arr = [2, 11, 37, 42];
// arr = shuffle(arr);
// console.log(arr);


function importAll(r) {
  return r.keys().map(r);
}

let imagesSRC = importAll(require.context('./images', false, /\.(png|jpe?g)$/));
let imagesMain
let images = [];
images.length = 4;


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
  
    this.flipp = this.flipp.bind(this)
  }

  setImagesMain() {
    let indexArr = [];
    for (let i = 0; i < images.length; i++) {
      images[i] = { src: null, isFlipped: true,};
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
        finalArray: this.state.selectedImages.filter((card) => { return card.src }),
        gameOver: false
      })
    }
    this.setState({
      isGameOn: true
    })
    setTimeout(() => {
      let temproraryImg = JSON.parse(JSON.stringify(this.state.selectedImages));
      temproraryImg.forEach((item) => { item.isFlipped = false });
      this.setState({
        selectedImages: temproraryImg
      })
    }, 5000)
  }

  componentDidMount() {
    this.randomizeCards.bind(this)();
    this.setState({
      finalArray: this.state.selectedImages.filter((card) => { return card.src })
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
        this.state.selectedImages[i].id = i;
        resultArr[rndNum] = this.state.selectedImages[i];
  
      }
    };
    this.setState({
      selectedImages: resultArr
    })
  }

  flipp (e) {
    console.log(e.target)
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
      pickedCards: [...this.state.pickedCards, oldSelectedImages[i]]      
    })
    
    this.checkArray.bind(this)(i);
  }
  
  checkIsGameOver () {
    if(this.state.openedCards.length === this.state.selectedImages.length) {
      this.setState({
        isGameOn: false,
        gameOver: true,
        isFirstGame: false,

        score: 0,
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
              score: this.state.score + this.state.finalArray.length * 42,
              pickedCards: oldPickedCards,
              finalArray: this.state.selectedImages.filter((card) => { return card.src }),
              openedCards: this.state.selectedImages.filter((card) => { return card.isFlipped }),
              
            });
            this.setState({
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

  renderGame () {
      return (
        <div className='game'>
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
            }) : 'blo'
          }
        </div>
        <div>
          <p>Очки: {this.state.score}</p>
        </div>
      </div>
      )
  }

  renderStartBtn () {
      return ( 
        <button
        onClick={this.startTheGame.bind(this)}
        >Начать</button>
      )
    
  }

  renderGameOver () {
      return (
        <p>{this.state.score}</p>
      )
  }

  render() {
    return (
      <div className="App">
        {this.state.isGameOn? this.renderGame(): ''}
        {!this.state.isGameOn? this.renderStartBtn(): ''}
        {this.state.gameOver? this.renderGameOver(): ''}
      </div>
    );
  }
}


export default App;