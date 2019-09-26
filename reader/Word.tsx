import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { WordToken } from "./types";
import CharacterText from "./CharacterText";

type WordProps = {
  marginBottom: number;
  marginRight: number;
  characterFontSize: number;
  showPinyin: boolean;
  pinyinMt: number;
  pinyinFontSize: number;
  isOpen: boolean;
  tokenIndex: number;
  onPress: (w: WordToken, tokenIndex: number) => void;
};

const Word = ({
  showPinyin,
  isOpen,
  marginBottom,
  marginRight,
  pinyinMt,
  pinyinFontSize,
  characterFontSize,
  isHanzi,
  pinyin,
  hanzi,
  onPress,
  tokenIndex,
  ...wordTokenRest
}: WordToken & WordProps) => {
  const pinyinArr = isHanzi ? pinyin.split(" ") : [];

  const charactersArr = isHanzi ? hanzi.split("") : [];

  return (
    <TouchableOpacity
      disabled={!isHanzi}
      onPress={() => {
        onPress(
          {
            ...wordTokenRest,
            isHanzi,
            hanzi,
            pinyin
          },
          tokenIndex
        );
      }}
      style={{
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: isOpen ? "#eee" : "#fff",
        borderRadius: 2,
        marginBottom,
        marginRight
      }}
    >
      {!isHanzi && (
        <CharacterText
          isHanzi={isHanzi}
          character={hanzi}
          characterFontSize={characterFontSize}
        />
      )}
      {isHanzi && (
        <View style={{ flexDirection: "row" }}>
          {charactersArr.map((c, i) => (
            <CharacterText
              isHanzi={isHanzi}
              key={i}
              character={c}
              characterFontSize={characterFontSize}
            />
          ))}
        </View>
      )}
      {isHanzi && showPinyin && (
        <Text
          style={{
            marginTop: pinyinMt,
            color: "#000",
            fontSize: pinyinFontSize
          }}
        >
          {pinyin}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Word;
