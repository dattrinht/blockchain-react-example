import { ChakraProvider, HStack } from "@chakra-ui/react";
import ConnectButton from "./components/ConnectButton";
import Layout from "./components/Layout";
import ProductCard from "./components/ProductCard";
import Web3 from 'web3';
import { Web3ReactProvider } from "@web3-react/core";

function getLibrary(provider: any, connector: any) {
  return new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('http://localhost:7545'));
}

export default function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider>
        <Layout>
          <ConnectButton />
          <HStack spacing="30px">
            <ProductCard
              title="Turtle"
              price="1"
              imageUrl="https://raw.githubusercontent.com/cryptozoon/images/master/turtle_1.gif"
            />
            <ProductCard
              title="Rock"
              price="5"
              imageUrl="https://raw.githubusercontent.com/cryptozoon/images/master/Rock_3.gif"
            />
            <ProductCard
              title="Dragon"
              price="10"
              imageUrl="https://raw.githubusercontent.com/cryptozoon/images/master/DR_Black.gif"
            />
          </HStack>
        </Layout>
      </ChakraProvider>
    </Web3ReactProvider >
  )
}