import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Sentence from "./reader/Sentence";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { WordToken } from "./reader/types";
import WordTokenDetails from "./WordTokenDetails";

const graphqlEndpoint = "https://radicalhanzi.com/graphql"; // "http://localhost:5000/graphql"

const client = new ApolloClient({
  uri: graphqlEndpoint
});

const sentences = [
  {
    hanzi: "道可道，非恆道；",
    english: "The Dao [that] can be stated, is not the eternal Dao;"
  },
  {
    hanzi: "名可名，非恆名。",
    english: "The name [that] can be named, is not the eternal name."
  }
];

type SelectedToken =
  | { sentenceIndex: number; wordTokenIndex: number; wordToken: WordToken }
  | undefined;

export default function App() {
  const charset = "simplified";
  const [selectedToken, setSelectedToken] = useState<SelectedToken>(undefined);

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <View>
          {sentences.map((s, sentenceIndex) => {
            const isSelectedSentence =
              selectedToken && selectedToken.sentenceIndex === sentenceIndex;
            return (
              <Sentence
                key={sentenceIndex}
                charset={charset}
                hanzi={s.hanzi}
                english={s.english}
                hasTokenSelected={isSelectedSentence}
                selectedWordTokenIndex={
                  isSelectedSentence ? selectedToken.wordTokenIndex : undefined
                }
                onWordSelected={(wordToken, wordTokenIndex) => {
                  setSelectedToken({
                    wordToken,
                    sentenceIndex,
                    wordTokenIndex
                  });
                }}
              />
            );
          })}
        </View>

        {selectedToken && (
          <WordTokenDetails
            wordToken={selectedToken.wordToken}
            charset={charset}
            onClose={() => setSelectedToken(undefined)}
          />
        )}
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#fff",
    position: "relative"
  }
});
