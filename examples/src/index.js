import React from 'react';
import { render} from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
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

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Test = styled.div`
    position: relative;
    width: 33.333% !important;
    height: 33.333% !important;
`;

const App = () =>
    <Container>
        <Test>
            <ShadertoyReact 
                fs={fsImages}
                textures={[
                    {url: 'https://i.imgur.com/uIEexIc.jpg'},
                    {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3GNakjyz1cQes5gq-gCH9o1QmBl0fjvAV0hwvn_DRpQfR1ZcKIg'},
                ]}
            />
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
        <Test>  
            <ShadertoyReact fs={fs}/>
        </Test>
        <GlobalStyle />
    </Container>

render(<App />, document.getElementById("root"));
