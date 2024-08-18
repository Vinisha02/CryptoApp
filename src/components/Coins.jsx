import {useEffect, useState, React} from 'react'
import axios from 'axios';
import { server } from '../index';
import { Radio, Container, VStack, Heading, HStack, Text, Image, Button, RadioGroup } from '@chakra-ui/react';
import CoinsCard from "./CoinCard";
import Loader from "../components/Loader";
import ErrorComponent from "./ErrorComponent";


const Coins = () => {

const [coins, setCoins] = useState([]);
const [loading, setLoading] = useState(true);//the time till data is not fetched
const [error, setError] = useState(false);
const [page, setPage] = useState(1);
const [currency, setCurrency] = useState("inr");
const btns = new Array(132).fill(1);

  useEffect(()=>{
    const fetchCoins = async()=>{
        try{
            const{data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
            setCoins(data);
            setLoading(false);
        }catch(error){
            setError(true);
            setLoading(false);
        }
    };
    fetchCoins();
  }, [currency, page]);
  if(error)
    return <ErrorComponent message={"Error while fetching Exchanges"}/>;
    
  const currencySymbol = currency === "inr" ? '₹' : currency === "eur" ? '€' : '$';

  const changePage = ()=>{
    setPage(page+1);
    setLoading(true);
  }
  return (
    <Container maxW={"container.xl"}>
        {
            loading ?<Loader/> : (<>  

            <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
                <HStack spacing={'4'}>
                    <Radio value={"inr"}>INR</Radio>
                    <Radio value={"usd"}>USD</Radio>
                    <Radio value={"eur"}>EUR</Radio>
                </HStack>
            </RadioGroup>

            <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                {
                    coins.map((i)=>{
                        return <CoinsCard key = {i.id} id = {i.id} name={i.name} image={i.image} symbol={i.symbol} url={i.url} price={i.current_price} currencySymbol={currencySymbol}/> 
                    })
                }
            </HStack>

                <HStack overflowX={'auto'}>
                    {
                        btns.map((item, index)=>{
                            return <Button key={index} bgColor={"blackAlpha.900"} color={'white'} onClick={() => changePage(index+1)}>{index+1}</Button>
                        })
                    }
                </HStack>

            </>)
        }
    </Container>
  )
}

export default Coins;
