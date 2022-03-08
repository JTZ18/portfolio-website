import React from 'react'
import styled from 'styled-components'

function GeckoContent() {
  return (
    <Container>
      <ImageContainer onClick={() => window.open('')}>
        <img src="/Gecko.PNG" />
      </ImageContainer>
      <Title>
        Tectonic Tales
      </Title>
      <Description>
        Had the privilege of working with a renouned Oscar Award animator Nickson Fong. He wanted to launch an NFT collection to create a community of 3D animators to come together to make animated series together. I was a part of his NFT profile picture random art generation process where we made 8,888 unique NFTs. I was also tasked to launch the smart contract on the Ethereum blockchain for the sale of the NFTs. On top of that, I helped to develop his NFT informational website in Three.js which is a library that helps build 3D websites. 
      </Description>
      <ButtonGroup>
        <Button onClick={() => window.open('https://github.com/JTZ18/imported-glb-web')}>
          <img src="/GitHub.png" />
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default GeckoContent

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
  width: 40%;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

  img {
    border-radius: 20px;
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

  a {
    color: white;
  }
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