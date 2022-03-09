import React from 'react'
import styled from 'styled-components'

function Liv3lyContent() {
  return (
    <Container>
      <ImageContainer onClick={() => window.open('http://liv3lynft.com')}>
        <img src="/Liv3ly.PNG" />
      </ImageContainer>
      <Title>
        LIV3LY NFT
      </Title>
      <Description>
        LIV3LY is a Singapore fitness event company whom I had the privilege of working with to implement their website. The website was for an NFT launch that accepted payments in Fiat currency. After implementing their website, I was also tasked to implement their smart contract for NFTs on the polygon blockchain which I developed in solidity. The tech stack used here was react, Expressjs, stripe and AWS Amplify. Amplify AWS helped to handle the backend requests and manage the data of who purchased the NFT. The library stripe was used to handle the payments made by customers
      </Description>
      <ButtonGroup>
        <Button onClick={() => window.open('https://github.com/JTZ18/liv3ly-website')}>
          <img src="/GitHub.png" />
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default Liv3lyContent

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px;

`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 2px solid gray;
  width: 70%;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

  img {
    border-radius: 20px;
    width: 100%;
  }

  &:hover {
      transform: scale(1.05);
      box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, 
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
      border: 2px solid white;
  }
`

const Title = styled.div`
  font-size: 1.5rem;
`

const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.5;
  letter-spacing: 0.5px;
  font-size: 1rem;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`
const Button = styled.div`
  cursor: pointer;
  border-radius: 50%;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
      transform: scale(1.05);
      box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, 
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
  }

  img {
    width: 50px;
  }


`