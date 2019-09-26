import { Token, WordToken, Charset } from "./types";

const hasHanzi = string => {
  const specialHanzi = ["𠂢"];
  if (specialHanzi.includes(string)) return true;
  const hanziRegex = new RegExp(`[\u3400-\u9FBF]`, "giu");
  return !!string.match(hanziRegex);
};

const ZERO_WIDTH_SPACE = "​";

const makeSentenceTokens = ({
  tokens,
  charset
}: {
  tokens: Token[];
  charset: Charset;
}): WordToken[] => {
  const hanziTokens = tokens
    .map(t => ({
      hanzi: t[charset],
      ...t
    }))
    .filter(h => h.hanzi !== ZERO_WIDTH_SPACE)
    .map(t => {
      const isHanzi = hasHanzi(t.hanzi);

      return {
        ...t,
        isHanzi,
        pinyin: t.matches[0] && t.matches[0].pinyinPretty
      };
    });

  return hanziTokens;
};

export default makeSentenceTokens;
