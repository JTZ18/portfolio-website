import React from 'react'
import styled from 'styled-components'

function TeslaContent() {
  return (
    <Container>
      <ImageContainer onClick={() => window.open('https://tesla-clonex-web.herokuapp.com/')}>
        <img src="/Tesla.PNG" />
      </ImageContainer>
      <Title>
        Tesla Clone Website
      </Title>
      <Description>
        Tesla Clone Website is a website that I built using React. It was one of my first few projects where I learnt about styled components. It was a nice intro to Redux and state management in react. This project helped me to practice declaring functional componenets, passing props, lifting states and styling in CSS. Concepts such as flexbox and animations were used. The website was then hosted and deployed on heroku.
      </Description>
      <ButtonGroup>
        <Button onClick={() => window.open('https://github.com/JTZ18/Tesla-clone-webapp')}>
          <img src="/GitHub.png" />
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default TeslaContent

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