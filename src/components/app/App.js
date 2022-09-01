import React from 'react';
import './App.scss';

import QuoteBox from '../quoteBox/QuoteBox';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      // array to hold API data
      quoteData: [],
      quote: '',
      author: ''
    };
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.getQuote = this.getQuote.bind(this);
    this.tweetQuote = this.tweetQuote.bind(this);
  }
  componentDidMount(){
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => response.json())
      .then((data) => {
        this.setState({
         isLoaded: true,
         quoteData: [...data.quotes]
        }, this.getQuote);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  getRandomQuote() {
    return this.state.quoteData[Math.floor(Math.random() * this.state.quoteData.length)];
  }
  
  getQuote() {
    let randomQuote = this.getRandomQuote();
    this.setState({
      quote: randomQuote.quote,
      author: randomQuote.author
    })
  }

// Share quote to Twitter 
  tweetQuote() {
   const url = 'twitter.com';
    let text = `${this.state.quote} - ${this.state.author}`;
    window.open(
      "http://twitter.com/share?url=" +
          encodeURIComponent(url) +
          "&text=" +
          encodeURIComponent(text),
        "",
        "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
      );
  };

  render(){
    const { quote, author } = this.state;
    return (
      <div>
        <QuoteBox quote={quote} 
        author={author}
        getQuote={this.getQuote}
        tweetQuote={this.tweetQuote}/>
      </div>
    );
  }
}

export default App;
