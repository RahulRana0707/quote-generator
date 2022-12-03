import { faCopy} from "@fortawesome/free-regular-svg-icons";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./App.css";

function App() {
  
  const [quote, setQuote] = useState("Deep Listening Is Miraculous For Both Listener And Speaker.When Someone Receives Us With Open-Hearted, Non-Judging, Intensely Interested Listening, Our Spirits Expand.");
  const [authorName, setauthorName] = useState("James");
  
  const generateQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let randomNumber = Math.floor(Math.random(0) * 1000);
        let quoteData = data[randomNumber].text;
        let quoteAuthor = data[randomNumber].author;
        setQuote(prevQuote => prevQuote = quoteData);
        setauthorName(prevAuthorName => prevAuthorName = quoteAuthor);
      });
  };
  const copyText = () => {
    navigator.clipboard.writeText(quote);
  };
  const speakQuote = () => {
    function getVoices() {
      let voices = speechSynthesis.getVoices();
      if (!voices.length) {
        let utterance = new SpeechSynthesisUtterance("");
        speechSynthesis.speak(utterance);
        voices = speechSynthesis.getVoices();
      }
      return voices;
    }
    let text = `${quote} said by ${authorName}`;
    let voice = getVoices();
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 2;
    utterance.rate = 1;
    utterance.voice = voice[0];
    utterance.volume = 1;
    speechSynthesis.speak(utterance);
  };
  return (
    <div className="app">
      <div className="container">
        <div className="contHeading">
          <h1>quote</h1>
        </div>
        <div className="quote">
          <span>"</span>
          <p>{quote}</p>
          <span>"</span>
        </div>
        <div className="authorName">
          <div className="bar"></div>
          <h2>{authorName}</h2>
        </div>
        <div className="bigBar"></div>
        <div className="button">
          <div className="tasks">
            <div className="taskBtn">
              <button onClick={speakQuote}>
                <FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon>
              </button>
            </div>
            <div className="taskBtn">
              <button onClick={copyText}>
                <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
              </button>
            </div>
          </div>
          <div className="generateQuote">
            <button onClick={generateQuote}>New Quote</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
