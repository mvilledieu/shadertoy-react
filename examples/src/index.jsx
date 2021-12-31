import React, { Component } from "react";
import { render } from "react-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import ShadertoyReact from "../../src/index.jsx";
import fs from "./shaders/fs";
import fsImages from "./shaders/fsImages";
import mouse from "./shaders/mouse";
import clock from "./shaders/clock";
import deviceorientation from "./shaders/deviceorientation.js";
import classicSyntax from "./shaders/classicSyntax.js";
import customUniforms from "./shaders/customUniforms.js";

const GlobalStyle = createGlobalStyle`
  body, html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  opacity: 0;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Parent = styled.div`
  flex-grow: 1;
  height: calc(100vh / 3);
  width: calc(100vw / 3);
`;

const TestCallbackFading = styled(Parent)`
  opacity: 0;
  transition: opacity 500ms;
  opacity: ${(props) => (props.fadeIn ? 1 : 0)};
`;

let counter = 0;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeIn: false,
      val: 0,
    };
    setInterval(() => {
      this.setState({ val: (counter += 0.1) });
    }, 100);
  }

  render() {
    return (
      <Container>
        <TestCallbackFading fadeIn={this.state.fadeIn}>
          <ShadertoyReact
            fs={fsImages}
            precision={"highp"}
            textures={[{ url: "https://i.imgur.com/uIEexIc.jpg" }]}
            onDoneLoadingTextures={() => {
              this.setState({ fadeIn: true });
              console.log("onDoneLoadingTextures");
            }}
          />
        </TestCallbackFading>
        <Parent>
          <ShadertoyReact fs={mouse} />
        </Parent>
        <Parent>
          <ShadertoyReact fs={clock} />
        </Parent>
        <Parent>
          <ShadertoyReact fs={deviceorientation} />
        </Parent>
        <Parent>
          <ShadertoyReact
            fs={customUniforms}
            uniforms={{
              uTest: { type: "1f", value: this.state.val },
            }}
          />
        </Parent>
        <Parent>
          <ShadertoyReact fs={classicSyntax} />
        </Parent>
        <Parent>
          <ShadertoyReact fs={fs} />
        </Parent>
        <Parent>
          <ShadertoyReact fs={fs} />
        </Parent>
        <Parent>
          <ShadertoyReact fs={fs} />
        </Parent>
        <GlobalStyle />
      </Container>
    );
  }
}

render(<App />, document.getElementById("root"));
