import { useState, useEffect, createElement } from "react";
import styled from "styled-components";

const SentenceString = "Hello Elliot! Nice Lederhosn, give me a Mass Bier!";
const texts = SentenceString.split(" ");
const longString =
  "Lorem @ipsum dolor sit amet, @elit, sed do #incididunt https://www.lipsum.com/ dolore magna #animidest #laborum.";
const words = longString.split(" ");
const hastags = [];
const mentions = [];
const links = [];
const normal = [];

//MY STYLED COMPONENTS
const MyApp = styled.div(() => ({
  margin: 20,
  marginTop: 70,
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
}));

const ChallengeContainer = styled.div((props) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: props.yellow ? "#ffb85c" : "#9AC2C9",
  padding: 20,
  marginBottom: 20,
  alignSelf: "center",
  width: 500,
}));

const ChallengeContent = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  alignItems: "center",
  color: "white",
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
  fontWeight: "bold",
}));

const Mention = styled.text(() => ({
  fontWeight: "bold",
  color: "blue",
}));

const Link = styled.text(() => ({
  textDecorationLine: "underline",
}));

const Regular = styled.text(() => ({}));

const styleWordsInTweet = function (WordsArray) {
  //loop through the original array and create a new Array of Objects with matching type names
  const styledWords = WordsArray.map(function (word) {
    const wordObject = { text: word, type: "To be Assigned" };

    if (word.startsWith("#")) {
      wordObject.type = "Hashtag";
    } else if (word.startsWith("@")) {
      wordObject.type = "Mention";
    } else if (word.startsWith("https://")) {
      wordObject.type = "Link";
    } else {
      wordObject.type = "Regular";
    }

    return wordObject;
  });

  //loop through the newly created array above and return a styled component based on the type name
  const styledTweet = styledWords.map(function (styledWord) {
    if (styledWord.type === "Hashtag") {
      return <Hashtag>{styledWord.text} </Hashtag>;
    } else if (styledWord.type === "Mention") {
      return <Mention>{styledWord.text} </Mention>;
    } else if (styledWord.type === "Link") {
      return <Link>{styledWord.text} </Link>;
    } else {
      return <Regular>{styledWord.text} </Regular>;
    }
  });

  //return the Array
  return styledTweet;
};

function App() {
  const [currIndex, setCurrIndex] = useState(0);
  const [tweetIndex, setTweetIndex] = useState(0);
  const [tweets, setTweets] = useState([
    "If you could go back and experience a gamne for the first time everyday, what would it be?",
    "LEC Team Managager @Rogue / jinx otp",
    "First W with Janna top in pro @dreedy_lol #LEC2022",
    "Check out my new website https://elliottrarden.me",
    "@account_name #someHashtag someurl.com this is a tweet",
  ]);

  const styledWords = tweets[tweetIndex % tweets.length].split(" ").map(function (word) {
    const wordObject = { text: word, type: "To be Assigned" };

    if (word.startsWith("#")) {
      wordObject.type = "Hashtag";
    } else if (word.startsWith("@")) {
      wordObject.type = "Mention";
    } else if (word.startsWith("https://")) {
      wordObject.type = "Link";
    } else {
      wordObject.type = "Regular";
    }

    return wordObject;
  });

  const currentText = texts[currIndex % texts.length];

  return (
    <MyApp>
      <ChallengeContainer>
        <Headline1>
          CHALLENGE 1.a :<br></br> Rotate through an array of texts
        </Headline1>

        <ChallengeContent>
          <p>{currentText}</p>

          <div>
            <MyButton
              disabled={currIndex === 0}
              onClick={function () {
                setCurrIndex(currIndex - 1);
              }}
            >
              Prev
            </MyButton>

            <MyButton
              next
              onClick={function () {
                setCurrIndex(currIndex + 1);
              }}
            >
              Next
            </MyButton>
          </div>
        </ChallengeContent>
      </ChallengeContainer>

      <ChallengeContainer yellow>
        <Headline1>
          CHALLENGE 1.b: <br></br> show Tweets provided by API, move through
          them and format @, # and Links
        </Headline1>
        <ChallengeContent>
          <p>{tweets[tweetIndex]?.Name}</p>
          <div>{styledWords.map((sw) => {
            switch (sw.type) {
              case "Hashtag":
                return <Hashtag>{sw.text} </Hashtag>;
              case "Mention":
                return <Mention>{sw.text} </Mention>;
              case "Link":
                return <Link>{sw.text} </Link>;
              case "Regular":
                return <Regular>{sw.text} </Regular>;
              default:
                return <></>
            }
          })}</div>

          <div>
            <MyButton
              onClick={function () {
                setTweetIndex(tweetIndex - 1);
              }}
            >
              Prev
            </MyButton>

            <MyButton
              next
              onClick={function () {
                setTweetIndex(tweetIndex + 1);
              }}
            >
              Next
            </MyButton>
          </div>
        </ChallengeContent>
      </ChallengeContainer>
    </MyApp>
  );
}

export default App;

/*
//Questions:


    1. If i press "Prev" a bunch of times before anything else, i get 3 empty array elements and only the "Hello" is showing again?
       It works if i go forwards tho.. is the array notloaded yet or sth?

    2. What's the twitter api from your example? I can't find it :/ Used the yoga one again as a replacement for now

    3. My Effect to store words in @, # and link arrays gets called twice when i reload the page and now it counts double ..
*/
