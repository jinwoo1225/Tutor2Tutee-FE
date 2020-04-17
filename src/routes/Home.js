import React from 'react';
import CardComp from '../components/CardComp';
import { Container } from 'react-bootstrap';

function Home(){
    return(
        <Container className='pt-3'>
            <CardComp />
        </Container>
    )
}

export default Home;