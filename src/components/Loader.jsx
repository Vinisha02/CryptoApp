import React from 'react'
import {Box, VStack, Spinner} from "@chakra-ui/react"
const Loader = () => {
    return <VStack h="90vh" justifyContent={"center"}>
      <Box transform = {"scale(3)"}>
        <Spinner size={"x1"}/>
      </Box>
    </VStack>
  };

export default Loader;
