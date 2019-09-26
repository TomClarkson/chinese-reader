import React from "react";
import { View, Text } from "react-native";
import useTokenizedText from "./useTokenizedText";
import makeSentenceTokens from "./makeSentenceTokens";
import Word from "./Word";
import { WordToken, Charset } from "./types";

type SentenceProps = {
  hanzi: string;
  english: string | undefined;
  hasTokenSelected: boolean;
  selectedWordTokenIndex: number | undefined;
  onWordSelected: (w: WordToken, tokenIndex: number) => void;
  charset: Charset;
};

const Sentence = ({
  hanzi,
  english,
  selectedWordTokenIndex,
  hasTokenSelected,
  onWordSelected,
  charset
}: SentenceProps) => {
  const { tokens, loading } = useTokenizedText(hanzi);
  const sentenceTokens = makeSentenceTokens({ tokens, charset });
  if (loading) {
    return (
      <View style={{ marginBottom: 25 }}>
        <Text>{hanzi}</Text>
        {english && <Text>{english}</Text>}
      </View>
    );
  }

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 25 }}>
      {sentenceTokens.map((wordToken, i) => (
        <Word
          isOpen={hasTokenSelected && i === selectedWordTokenIndex}
          tokenIndex={i}
          onPress={onWordSelected}
          key={i}
          {...wordToken}
          characterFontSize={22}
          showPinyin={true}
          marginBottom={10}
          marginRight={2}
          pinyinMt={5}
          pinyinFontSize={14}
        />
      ))}
      {english && <Text>{english}</Text>}
    </View>
  );
};

export default Sentence;
