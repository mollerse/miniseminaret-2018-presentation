import React from "react";
import { render } from "react-dom";
import {
  Deck,
  Slide,
  Notes,
  Heading,
  Magic,
  Anim,
  Link,
  Text,
  BlockQuote,
  Quote,
  Cite,
  Appear,
  Code,
  Image,
  List,
  ListItem
} from "spectacle";
import createTheme from "spectacle/lib/themes/default";
const fs = require("fs");
import WebGLSlide from "./WebGLSlide";

const theme = createTheme(
  {
    primary: "#333",
    secondary: "#FFF",
    tertiary: "hsl(209,100%,60%)",
    quarternary: "#FFF"
  },
  {
    primary: "sans-serif"
  }
);

const defaultSlideProps = {
  align: "center center",
  className: "default-slide"
};

const AppearingBlock = props => (
  <Appear {...props}>
    <div>{props.children}</div>
  </Appear>
);

function Presentation() {
  return (
    <Deck theme={theme} transition={[]} progress="none" controls={false}>
      <Slide {...defaultSlideProps}>
        <Heading caps fit size={1}>
          Kreativ
        </Heading>
        <Heading caps fit size={1}>
          Programmering
        </Heading>
        <Text caps>for programmere</Text>
        <Text>Stian Veum Møllersen / @mollerse</Text>
      </Slide>

      <Slide {...defaultSlideProps}>
        <Text>Hva er</Text>
        <Text fit>
          <em>kreativ</em>
        </Text>
        <Text>programmering?</Text>
        <Appear order={1}>
          <img
            width="100%"
            src="assets/demoscene.png"
            style={{
              top: `0%`,
              left: `0%`
            }}
          />
        </Appear>
        <Appear order={2}>
          <img
            width="100%"
            src="assets/inconvergent.png"
            style={{
              top: `0%`,
              left: `0%`
            }}
          />
        </Appear>
        <Appear order={3}>
          <img
            width="100%"
            src="assets/lynnfisher.png"
            style={{
              top: `0%`,
              left: `0%`
            }}
          />
        </Appear>
        <Appear order={4}>
          <img
            width="100%"
            src="assets/sollewitt.jpg"
            style={{
              top: `0%`,
              left: `0%`
            }}
          />
        </Appear>
        <Appear order={5}>
          <img
            height="100%"
            src="assets/galaxykate.png"
            style={{
              top: `0%`,
              left: `25%`
            }}
          />
        </Appear>
        <Appear order={6}>
          <img
            height="100%"
            src="assets/klingemann.jpg"
            style={{
              top: `0%`,
              left: `25%`
            }}
          />
        </Appear>
        <Appear order={7}>
          <img
            width="90%"
            src="assets/samaaron.jpg"
            style={{
              top: `0%`,
              left: `5%`
            }}
          />
        </Appear>
        <Appear order={8}>
          <img
            width="75%"
            src="assets/teropa.png"
            style={{
              top: `0%`,
              left: `12.5%`
            }}
          />
        </Appear>
        <Appear order={9}>
          <img
            width="50%"
            src="assets/teropa2.png"
            style={{
              top: `0%`,
              left: `25%`
            }}
          />
        </Appear>
        <Appear order={10}>
          <img
            width="75%"
            src="assets/simonegiertz.png"
            style={{
              top: `0%`,
              left: `12.5%`
            }}
          />
        </Appear>
        <Appear order={11}>
          <img
            width="100%"
            src="assets/zork.jpg"
            style={{
              top: `0%`,
              left: `0%`
            }}
          />
        </Appear>
        <Appear order={12}>
          <Image
            width="100%"
            src="assets/quine.png"
            style={{
              top: `0%`,
              left: `0%`,
              maxWidth: "none",
              maxHeight: "none"
            }}
          />
        </Appear>
      </Slide>

      <Slide {...defaultSlideProps}>
        <Text caps fit>
          Expression
        </Text>
        <Text>over</Text>
        <Text fit>
          <em>function</em>
        </Text>
      </Slide>

      <Slide {...defaultSlideProps}>
        <Text>Hvordan være</Text>
        <Text fit caps>
          <em>kreativ</em>?
        </Text>
      </Slide>

      <Slide {...defaultSlideProps}>
        <Text>Ingen</Text>
        <Text fit caps>
          <em>regler</em>
        </Text>
      </Slide>

      <Slide {...defaultSlideProps}>
        <List>
          <Appear>
            <ListItem>Start enkelt</ListItem>
          </Appear>
          <Appear>
            <ListItem>Tweake parametre</ListItem>
          </Appear>
          <Appear>
            <ListItem>Randomisere & interpolere</ListItem>
          </Appear>
          <Appear>
            <ListItem>Multiplisere & iterere</ListItem>
          </Appear>
          <Appear>
            <ListItem>Koble på input</ListItem>
          </Appear>
        </List>
      </Slide>

      <Slide {...defaultSlideProps} className="webgl-slide">
        <WebGLSlide />
      </Slide>

      <Slide {...defaultSlideProps}>
        <Text>Alle kan være</Text>
        <Text fit>
          <em>kreative</em>
        </Text>
        <Text>🤹‍♂️</Text>
      </Slide>

      <Slide {...defaultSlideProps}>
        <Text>Kreativ programmering er</Text>
        <Text caps fit>
          lærerikt
        </Text>
      </Slide>

      <Slide {...defaultSlideProps}>
        <Text>Kreativ programmering er</Text>
        <Text caps fit>
          &nbsp; nyttig &nbsp;
        </Text>
      </Slide>

      <Slide {...defaultSlideProps}>
        <Text>men først og fremst</Text>
        <Text caps fit>
          morsomt
        </Text>
      </Slide>

      <Slide {...defaultSlideProps}>
        <Heading caps size={1}>
          Takk for meg!
        </Heading>
        <Text>Stian Veum Møllersen / @mollerse</Text>
      </Slide>
    </Deck>
  );
}
const mount = document.createElement("div");
document.body.appendChild(mount);
render(<Presentation />, mount);
