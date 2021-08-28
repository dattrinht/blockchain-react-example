# Blockchain react example

## About The Project

Simple Blockchain payment project

### Built With
* [Golang](https://golang.org)
* [ReactJs](https://reactjs.org)
* [Solidity](https://soliditylang.org)
* [Truffle](https://www.trufflesuite.com)

### Functional requirements:
- [x] Connect to Metamask Wallet
- [x] Display Wallet Address and Balance
- [x] Create 3 products with price: 1 ETH, 5 ETH and 10 ETH
- [x] Purchased via smart contract gateway and send request with txHash to server

## Usage

### Smart contract
```sh
cd contracts
truffle migrations
```

### Server
```sh
cd server
go run .
```

### Client
```sh
cd ui
yarn install
yarn start
```
