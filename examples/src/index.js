import React, { Component } from 'react';
import { render} from 'react-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import ShadertoyReact from '../../src/index.js';
import fs from './shaders/fs';
import fsImages from './shaders/fsImages';
import mouse from './shaders/mouse';
import clock from './shaders/clock';
import deviceorientation from './shaders/deviceorientation.js';

const GlobalStyle = createGlobalStyle`
    body, html {
        position: fixed;
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
`;

const Test = styled.div`
    position: relative;
    width: 33.333% !important;
    height: 33.333% !important;
`;

const Test1 = styled.div`
    position: relative;
    width: 33.333% !important;
    height: 33.333% !important;
    opacity: 0;

    transition: opacity 500ms;
    opacity : ${ props => props.fadeIn ?  1 : 0 }
`;

let counter = 0;
class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            fadeIn: false, 
            val: 0,
        }
        setInterval(() => {
            this.setState({ val: counter+=0.1 });
        }, 100);
        
    }

    render(){
        console.log(this.state.val);
        return <Container>
            <Test1 fadeIn={this.state.fadeIn}>
                <ShadertoyReact 
                    fs={fsImages}
                    devicePixelRatio={0.2}
                    textures={[
                        {url: 'https://i.imgur.com/uIEexIc.jpg'},
                        {url: 'http://techslides.com/demos/sample-videos/small.ogv'}
                    ]}
                    uniforms={{
                        uTest : { type: '2fv', value: [this.state.val, 1., 2., 2.] },
                        uTest2 : { type: '2f', value: [this.state.val, 1.] },
                    }}
                    onDoneLoadingTextures={() =>{
                        this.setState({fadeIn: true});
                        console.log('onDoneLoadingTextures');
                    }}
                />
            </Test1>
            <Test>  
                <ShadertoyReact fs={mouse} />
            </Test>  
            <Test>  
                <ShadertoyReact fs={clock}/>
            </Test>  
            <Test>  
                <ShadertoyReact fs={deviceorientation}/>
            </Test>
            <Test>  
                <ShadertoyReact fs={fs}/>
            </Test>
            <Test>  
                <ShadertoyReact fs={fs}/>
            </Test>
            <Test>  
                <ShadertoyReact fs={fs}/>
            </Test>
            <Test>  
                <ShadertoyReact fs={fs}/>
            </Test>
            <Test>  
                <ShadertoyReact fs={fs}/>
            </Test>
            <GlobalStyle />
        </Container> ;
    }
}
    

render(<App />, document.getElementById("root"));
