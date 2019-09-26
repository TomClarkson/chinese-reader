import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Token } from "./types";

const GET_TOKENS = gql`
  query Tokenise($text: String!) {
    tokenise(text: $text) {
      traditional
      simplified
      matches {
        traditional
        simplified
        pinyin
        pinyinPretty
        english
      }
    }
  }
`;

interface TokenizeResponse {
  tokenise: Token[];
}

const useTokenizedText = (text: string) => {
  const { error, loading, data } = useQuery<TokenizeResponse>(GET_TOKENS, {
    variables: { text }
  });

  const tokens = loading ? [] : data.tokenise;

  return { tokens, error, loading };
};

export default useTokenizedText;
