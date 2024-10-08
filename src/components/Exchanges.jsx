import {useEffect, useState, React} from 'react';
import axios from 'axios';
import { server } from '../index';
import { Container, VStack, Heading, HStack, Text, Image } from '@chakra-ui/react';

import Loader from "../components/Loader";
import ErrorComponent from "./ErrorComponent";


const Exchanges = () => {

const [exchanges, setExchanges] = useState([]);
const [loading, setLoading] = useState(true);//the time till data is not fetched
const [error, setError] = useState(false);

  useEffect(()=>{
    const fetchExchanges = async()=>{
        try{
            const{data} = await axios.get(`${server}/exchanges`);
            setExchanges(data);
            setLoading(false);
        }catch(error){
            setError(true);
            setLoading(false);
        }
    };
    fetchExchanges();
  }, []);
  if(error)
    return <ErrorComponent message={"Error while fetching Exchanges"}/>;
    
  return (
    <Container maxW={"container.xl"}>
        {
            loading ?<Loader/> : <>  

            <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                {
                    exchanges.map((i)=>{
                        return <ExchangeCard key = {i.id} name={i.name} image={i.image} rank={i.trust_score_rank} url={i.url} /> 
                    })
                }
            </HStack>
            </>
        }
    </Container>
  )
}

const ExchangeCard=({name, image, url ,rank})=>{
   
    return (
        <a href={url} target={"blank"}><VStack w="52" p={'8'} shadow={'lg'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'} css={{ "&:hover":{transform:"scale(1.1)"}}}> 
        <Image src={image} w={'10'} h={'10'} objectFit={'contain'} alt={"exchanges"}/>
        <Heading size="md" noOfLines={1}>{rank}</Heading>
        <Text>{name}</Text>
        </VStack></a>
    )

    
}
export default Exchanges
