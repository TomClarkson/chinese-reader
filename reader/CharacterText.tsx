import React from "react";
import { Text } from "react-native";

const CharacterText = ({ character, characterFontSize, isHanzi }) => {
  const color = "#333";

  const fontWeight = isHanzi ? "300" : "100";

  return (
    <Text
      style={{
        fontWeight,
        color,
        fontSize: characterFontSize
      }}
    >
      {character}
    </Text>
  );
};

export default CharacterText;
