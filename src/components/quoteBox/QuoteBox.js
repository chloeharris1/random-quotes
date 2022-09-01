import React from "react";
import './QuoteBox.scss';

class QuoteBox extends React.Component {
    render() {
        return (
            <div id="quote-box">
                <div className="quote-text">
                    <i className="fa-solid fa-quote-left"></i><span id="text">{this.props.quote}</span><i className="fa-solid fa-quote-right"></i>
                </div>
                <div className="quote-author">- <span id="author">{this.props.author}</span></div>
                <div className="buttons">
                <a className="button" id="tweet-quote" href='www.twitter.com/intent/tweet' title="Tweet this quote" target="_blank" onClick={this.props.tweetQuote}><i className="fa-brands fa-twitter"></i></a>
                <button className="button" id="new-quote" title="New quote" onClick={this.props.getQuote}><i className="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
        )
    }
}

export default QuoteBox;
