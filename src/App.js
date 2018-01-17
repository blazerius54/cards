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
      selectedImages: imagesMain,
      pickedCards: [],
      isPickedCardsFull: false,
      // finalArray: this.state.selectedImages.filter((card)=>{return card}) !!!!!!!!!!!!!
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
    setTimeout(() => {
      let temproraryImg = JSON.parse(JSON.stringify(this.state.selectedImages));
      temproraryImg.forEach((item) => { item.isFlipped = false });
      this.setState({
        selectedImages: temproraryImg
      })
    }, 5000)
  }

  componentDidMount() {
    this.randomizeCards.bind(this)()
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

    this.flipTheCard.bind(this)(i)
    
    this.setState({
      pickedCards: [...this.state.pickedCards, oldSelectedImages[i]]      
    })
    
    this.checkArray.bind(this)(i)
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
              pickedCards: oldPickedCards
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
              pickedCards: [], 
              isPickedCardsFull: false
            })
          }
        }
      }, 2000)
      
    }
    if(this.state.pickedCards.length === 2){
    }
  }


  render() {
    return (
      <div className="App">
        {/* для массива */}
        <div className='board'>
            {this.state.selectedImages!==undefined?
              this.state.selectedImages.map((item, index)=>{
                return (
                  <Card 
                  key={index}
                  index={index}
                  src={item.src}
                  isFlipped={item.isFlipped}
                  // setImagesMain={this.setImagesMain.bind(this)}
                  setPickedCard={this.setPickedCard.bind(this)}
                  />
                )
              }):'blo'
            }
        </div>
        <button 
        onClick={this.randomizeCards.bind(this)}
        >click</button>

      </div>
    );
  }
}


export default App;