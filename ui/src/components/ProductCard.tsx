import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Button,
    useToast,
} from '@chakra-ui/react';
import paymentContract from '../../../build/contracts/Payment.json';
import Web3 from 'web3';
import axios from 'axios';

export default function ProductCard(props: any) {
    const paymentContractAddress = paymentContract.networks[5777].address;
    const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('http://localhost:7545'));
    const toast = useToast()

    function toastError() {
        toast({
            title: `Something went wrong`,
            status: "error",
            position: "bottom-left",
            isClosable: true,
        });
    }

    function toastSuccess() {
        toast({
            title: `Purchase successfully`,
            status: "success",
            position: "bottom-left",
            isClosable: true,
        });
    }

    async function handleBuy() {
        const accounts = await web3.eth.getAccounts();
        web3.eth.sendTransaction({
            from: accounts[0],
            to: paymentContractAddress,
            value: `${parseFloat(props.price) * 1000000000000000000}`
        }, function (error: any, transactionHash: any) {
            if (!error) {
                axios.post(`http://127.0.0.1:5050/savetx`, { fromAddress: accounts[0], txHash: transactionHash }, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                })
                    .then(res => {
                        if (res && res.data) {
                            toastSuccess()
                        } else {
                            toastError();
                        }
                    });
            } else {
                toastError();
            }
        })
    }

    return (
        <Center py={12} d="flex">
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <Box>
                    <Image
                        rounded={'lg'}
                        height={282}
                        width={282}
                        objectFit={'cover'}
                        src={props.imageUrl}
                    />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={800}>
                        {props.title}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={500} fontSize={'xl'}>
                            {props.price} ETH
                        </Text>
                    </Stack>
                </Stack>
                <Button
                    mt={5}
                    w={'full'}
                    bg={'teal.400'}
                    color={'white'}
                    rounded={'xl'}
                    boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                    _hover={{
                        bg: 'teal.500',
                    }}
                    _focus={{
                        bg: 'teal.500',
                    }}
                    onClick={handleBuy}>
                    BUY
                </Button>
            </Box>
        </Center>
    );
}