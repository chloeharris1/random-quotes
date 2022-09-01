import React from 'react';
import './App.scss';
// Import QuoteBox component
import QuoteBox from '../quoteBox/QuoteBox';

class App extends React.Component {
  constructor(props){
    super(props);
    // Initialize state
    this.state = {
      error: null,
      isLoaded: false,
      // Array to hold API data
      quoteData: [],
      quote: '',
      author: ''
    };
    // Bind 'this' so it becomes bound to the class methods when the component is initialized 
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.getQuote = this.getQuote.bind(this);
    this.tweetQuote = this.tweetQuote.bind(this);
  }
  // A React lifecycle method which is invoked immediately after a component is mounted 
  componentDidMount(){
    // Fetching quote data
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => response.json())
      .then((data) => {
        // Update state 
        this.setState({
         isLoaded: true,
        // Filling quoteData array with fetched quotes data, then using getQuote method to display a random quote when the page is loaded
         quoteData: [...data.quotes]
        }, this.getQuote);
      },
      // Handle errors
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }
  // Get a random quote from the quoteData array
  getRandomQuote() {
    return this.state.quoteData[Math.floor(Math.random() * this.state.quoteData.length)];
  }
  // Get the random quote and update quote and author state
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
  // Access current quote and author
    let text = `${this.state.quote} - ${this.state.author}`;
    // Open new window in the browser to share quote on Twitter
    window.open(
      "http://twitter.com/share?url=" +
          encodeURIComponent(url) +
          "&text=" +
          encodeURIComponent(text),
        "",
        "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
      );
  };
  // Passing state as props and handler methods to the QuoteBox child component
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
