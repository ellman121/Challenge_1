import { useState, useEffect } from 'react';
import styled from 'styled-components';

const texts = ["Hello", "Elliot!", "nice", "Lederhosen!", "Give", "me", "a" ,"Mass", "Bier!"]
const longString = "Lorem @ipsum dolor sit amet, consectetur adipiscing @elit, sed do eiusmod tempor #incididunt ut labore et https://www.lipsum.com/ dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit #animidest #laborum."


//MY STYLED COMPONENTS
const MyApp = styled.div(() => ({
  margin: 20,
  marginTop: 70,
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',

}));

const ChallengeContainer = styled.div((props) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: props.yellow ? "#ffb85c" : "#9AC2C9",
  padding: 20,
  marginBottom: 20,
  alignSelf: 'center',
  width: 500,
}));

const ChallengeContent = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: 20,

}));

const Headline1 = styled.h1(() => ({
  fontSize: 20,
  fontWeight: 1000,
  textAlign: "center",
  marginBottom: 30,
  color: "#4A5043",
}));

const MyButton = styled.button`
  background: white;
  color: ${(props) => (props.next ? "black" : "black")};
  font-size: 1em;
  margin: 1em;
  padding: 0.1em 1em;
  border: 0px solid white;
  border-radius: 10px;
  &:hover {
    background-color: ${(props) => (props.next ? "#8ec489" : "#ffb0b8")};
    color: white;
  }
`;

const Hashtag = styled.text(() => ({
  fontWeight: 'bold',
}));

const Mention = styled.text(() => ({
  fontWeight: 'bold',
  color: 'blue',
}));

const Link = styled.text(() => ({
  textDecorationLine: 'underline',
}));





function App() {



  const [currIndex, setCurrIndex] = useState(0);
  const [TweetIndex, setTweetIndex] = useState(0);
  const [Tweets, setTweets] = useState([]);

  const currentText = texts[currIndex % texts.length];
  const Server_URL = `https://elliottrarden.me/assets/stretches.json`;  //dummy Api for testing

  //get the twitter data:
  useEffect(() => {
    fetch(Server_URL)
      .then((response) => response.json())
      .then(function logData(jsn) {
        console.log(jsn.length);
        return jsn;
      })
      .then(function setData(resultArray) {
        setTweets(resultArray);
      });
  }, []);


  

  return (
    <MyApp>

      <ChallengeContainer>
        <Headline1>Challenge 1.a : Rotate through an array of texts</Headline1>

        <ChallengeContent>
          <p>
            {currentText}
          </p>

          <div>
            <MyButton onClick={function () {
              setCurrIndex(currIndex - 1)
            }}>Prev
            </MyButton>

            <MyButton next onClick={function () {
              setCurrIndex(currIndex + 1)
            }}>Next
            </MyButton>
          </div>

        </ChallengeContent>
      </ChallengeContainer>



      <ChallengeContainer yellow>
        <Headline1>Challenge 1.b: show Tweets provided by API and move through them</Headline1>
        <ChallengeContent>
          <p>
            {longString}
          </p>
          <p>{ Tweets[TweetIndex]?.Name}</p>

          <div>
            <MyButton onClick={function () {
              setTweetIndex(TweetIndex - 1)
            }}> Prev
            </MyButton>

            <MyButton next onClick={function () {
              setTweetIndex(TweetIndex + 1)
            }}> Next
            </MyButton>
          </div>

        </ChallengeContent>
      </ChallengeContainer>
    </MyApp>
  );
};

export default App;


/*
//Questions:


    1. If i press "Prev" a bunch of times before anything else, i get 3 empty array elements and only the "Hello" is showing again?
       It works if i go forwards tho.. is the array notloaded yet or sth?

    2. What's the twitter api from your example? I can't find it :/ Used the yoga one again as a replacement for now

*/