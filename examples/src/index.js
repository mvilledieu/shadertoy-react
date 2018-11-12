import React, { Component } from 'react';
import { render} from 'react-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import ShadertoyReact from '../../src';
import fs from './shaders/fs';
import fsImages from './shaders/fsImages';

const GlobalStyle = createGlobalStyle`
    body, html {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
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

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            fadeIn: false, 
        }
    }

    render(){
        return <Container>
            <Test1 fadeIn={this.state.fadeIn}>
                <ShadertoyReact 
                    fs={fsImages}
                    textures={[
                        {url: 'https://i.imgur.com/uIEexIc.jpg'},
                        {url: 'https://i.imgur.com/OA5jUWi.jpg'},
                        {url: 'http://techslides.com/demos/sample-videos/small.ogv'}
                    ]}
                    onDoneLoadingTextures={() =>{
                        this.setState({fadeIn: true});
                        console.log('onDoneLoadingTextures');
                    }}
                />
            </Test1>
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
