import { Link } from "react-router-dom";

import {Text, VStack, Image, Heading} from '@chakra-ui/react';


const CoinsCard=({id, name, image, url, symbol, price, currencySymbol = '₹'})=>{
    return (
        <Link to={`/coin/${id}`} target={"blank"}>
            <VStack w="52" p={'8'} shadow={'lg'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'} css={{"&:hover":{transform:"scale(1.1)"}}}>
            <Image src={image} w={'10'} h={'10'} objectFit={'contain'} alt={"exchanges"} />
            <Heading size="md" noOfLines={1}>{symbol}</Heading>
            <Text noOfLines={1}>{name}</Text>
            <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
            </VStack>
        </Link>
    )
}

export default CoinsCard;