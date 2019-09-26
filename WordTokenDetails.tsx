import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { WordToken, Charset } from "./reader/types";

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000"
  }
});

const CloseIcon = ({ height, width }) => (
  <Svg viewBox="0 0 352 512" height={height} width={width}>
    <Path
      fill="#999"
      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
    />
  </Svg>
);

const Backdrop = ({ animatedValue }) => {
  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.2],
    extrapolate: "clamp"
  });
  return <Animated.View style={[styles.backdrop, { opacity }]} />;
};

type WordTokenDetailsProps = {
  wordToken: WordToken;
  charset: Charset;
  onClose: () => void;
};

const Definitions = ({ definitions }: { definitions: string }) => {
  const meanings = definitions.split("/");

  return (
    <View>
      {meanings.map((meaning, index) => (
        <View key={index} style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text
            style={{
              marginTop: 1,
              fontSize: 11,
              fontWeight: "bold",
              marginRight: 4
            }}
          >
            {index + 1}
          </Text>

          <Text style={{ fontSize: 12, color: "#555" }}>{meaning}</Text>
        </View>
      ))}
    </View>
  );
};

class WordTokenDetails extends React.Component<WordTokenDetailsProps> {
  private backdropAnimatedValue: Animated.Value;
  private slideUpAnimatedValue: Animated.Value;
  constructor(props: WordTokenDetailsProps) {
    super(props);
    this.backdropAnimatedValue = new Animated.Value(0);
    this.slideUpAnimatedValue = new Animated.Value(0);
  }
  componentDidMount() {
    Animated.spring(this.backdropAnimatedValue, {
      toValue: 1
    }).start();

    Animated.spring(this.slideUpAnimatedValue, {
      toValue: 1
    }).start();
  }
  handleClose = () => {
    Animated.spring(this.backdropAnimatedValue, {
      toValue: 0
    }).start();

    Animated.spring(this.slideUpAnimatedValue, {
      toValue: 0
    }).start(this.props.onClose);
  };
  render() {
    const { wordToken, charset } = this.props;

    const height = 300;

    const translateY = this.slideUpAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0],
      extrapolate: "clamp"
    });

    const hasDifferentCharacter =
      wordToken.traditional !== wordToken.simplified;

    const differentCharset =
      charset === "traditional" ? "simplified" : "traditional";

    return (
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}
      >
        <Backdrop animatedValue={this.backdropAnimatedValue} />
        <Animated.View
          style={{
            transform: [{ translateY }],
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height,
            backgroundColor: "#fff",
            width: "100%",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
          }}
        >
          <View
            style={{
              height: 40,
              paddingLeft: 15,
              paddingRight: 15,
              flexDirection: "row",
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20 }}>{wordToken.hanzi}</Text>
              {hasDifferentCharacter && (
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    color: "#999"
                  }}
                >
                  ({wordToken[differentCharset]})
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={{ padding: 20 }}
              onPress={this.handleClose}
            >
              <CloseIcon height={20} width={20} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {wordToken.matches.map((match, i) => {
              const isLast = i === wordToken.matches.length - 1;

              return (
                <View
                  key={i}
                  style={{
                    padding: 20,
                    borderBottomColor: "#eee",
                    borderBottomWidth: isLast ? 0 : 1
                  }}
                >
                  <Text style={{ marginBottom: 10 }}>{match.pinyinPretty}</Text>
                  <Definitions definitions={match.english} />
                </View>
              );
            })}
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
}

export default WordTokenDetails;
