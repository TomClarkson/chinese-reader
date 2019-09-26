export type TokenMatch = {
  traditional: string;
  simplified: string;
  pinyin: string;
  pinyinPretty: string;
  english: string;
};

export type Token = {
  traditional: string;
  simplified: string;
  matches: TokenMatch[];
};

export type WordToken = {
  traditional: String;
  simplified: String;
  matches: TokenMatch[];
  hanzi: string;
  isHanzi: boolean;
  pinyin: string | undefined;
};

export type Charset = "simplified" | "traditional";
