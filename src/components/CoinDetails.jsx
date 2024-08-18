import { Button, HStack, Box, Container, Radio, RadioGroup, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress } from '@chakra-ui/react';
import { useEffect, useState, React } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { server } from "../index";
import ErrorComponent from "./ErrorComponent";
import Chartt from "./Chart";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const params = useParams();

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (val) => {
    switch (val) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;
      default:
        setDays("24h");
        setLoading(true);
    }
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setChartArray(chartData.prices);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [params.id, days, currency]);

  if (error)
    return <ErrorComponent message={"Error While Fetching Coin"} />;

  const currencySymbol = currency === "inr" ? '₹' : currency === "eur" ? '€' : '$';

  return (
    <Container maxW={"container.xl"}>
      {
        loading ? <Loader /> :
          <>
            <Box width={"full"} borderWidth={1}>
              <Chartt arr={chartArray} days={days} currency={currencySymbol} />
            </Box>
            <HStack p={"4"} wrap={"wrap"}>
              {
                btns.map((i, index) => {
                  return <Button key={index} onClick={() => switchChartStats(i)}>{i}</Button>
                })
              }
            </HStack>

            <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
              <HStack spacing={'4'}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"usd"}>USD</Radio>
                <Radio value={"eur"}>EUR</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={"4"} p="16" alignItems={'flex-start'}>
              <Text alignSelf={'center'} opacity={'0.7'} fontSize={'small'}>
                Last Updated On {new Date(coin.market_data?.last_updated).toLocaleString()}
              </Text>

              <Image src={coin.image?.large} w={"16"} h={'16'} objectFit={'contain'}></Image>
              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>{currencySymbol}{coin.market_data?.current_price?.[currency]}</StatNumber>
                <StatHelpText>
                  <StatArrow type={coin.market_data?.price_change_percentage_24h > 0 ? 'increase' : 'decrease'} />
                  {coin.market_data?.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>

              <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={'white'}>{`#${coin.market_cap_rank}`}</Badge>

              <CustomBar high={`${currencySymbol}${coin.market_data?.high_24h?.[currency]}`} low={`${currencySymbol}${coin.market_data?.low_24h?.[currency]}`} />

              <Box w="full" p='4'>
                <Item title={'MAX SUPPLY'} value={coin.market_data?.max_supply} />
                <Item title={'CIRCULATING SUPPLY'} value={coin.market_data?.circulating_supply} />
                <Item title={'MARKET CAP'} value={`${currencySymbol}${coin.market_data?.market_cap?.[currency]}`} />
                <Item title={'ALL TIME LOW'} value={`${currencySymbol}${coin.market_data?.atl?.[currency]}`} />
                <Item title={'ALL TIME HIGH'} value={`${currencySymbol}${coin.market_data?.ath?.[currency]}`} />
              </Box>
            </VStack>
          </>
      }
    </Container>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
      <Text fontFamily={'Bebas Neue'} letterSpacing={"widest"}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  );
};

const CustomBar = ({ low, high }) => {
  return (
    <VStack w={"full"}>
      <Progress value={50} colorScheme={'teal'} w={'full'} />
      <HStack justifyContent={'space-between'} w={'full'}>
        <Badge children={low} colorScheme='red' />
        <Badge children={high} colorScheme='green' />
      </HStack>
    </VStack>
  );
};

export default CoinDetails;
