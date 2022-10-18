import React, {useEffect, useState} from 'react';
import { Container, Row, Col, InputGroup, FormControl, ModalFooter } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import { BiSearch } from 'react-icons/bi';
import SearchFilter from 'react-filter-search';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [theme] = useThemeHook();
    const [searchInput, setSearchInput] = useState('');
    const [productData, setProductData] = useState([]);

    async function getResponse(){
        const res = await fetch('https://fakestoreapi.com/products')
                          .then(res=> res.json());
                          setProductData(await res);
    }

    useEffect(()=>{
        getResponse();
    },[]);

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col className="mb-3 mx-auto text-center espaco-titulo">
                    <h1 className={theme? 'text-light my-5': 'text-black my-5'}>Absolutamente tudo para você e sua casa!</h1>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className={theme? 'bg-black text-dark-primary': 'bg-light text-light-primary'}>
                            <BiSearch size="2rem" />
                        </InputGroup.Text>
                        <FormControl 
                            placeholder="O que vocẽ está procurando hoje?"
                            value={searchInput}
                            onChange={(e)=> setSearchInput(e.target.value)}
                            className={theme? 'bg-light-black text-light': 'bg-light text-black'}
                        />
                    </InputGroup>
                </Col>
                <SearchFilter 
                    value={searchInput}
                    data={productData}
                    renderResults={results =>(
                        <Row className="justify-content-center">
                            {results.map((item, i)=>(
                                <ProductCard data={item} key={i} />
                            ))}
                        </Row>
                    )}
                />
                
            </Row>
            
            <Row className="justify-content-center">
                <Col className="mb-3 mx-auto text-center frase-rodape">
                    <p className={theme? 'text-light my-5': 'text-black my-5'}>"Este job foi realizado com esforço e dedicação para alcançar um único resultado: <br/>
Fazer parte do time Job Space" <span>Marcelo Post</span></p>
                </Col>
            </Row>

        </Container>
        
    );
};

export default Home;