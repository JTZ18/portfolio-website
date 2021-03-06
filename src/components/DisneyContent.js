import React from 'react'
import styled from 'styled-components'

function DisneyContent() {
  return (
    <Container>
      <ImageContainer onClick={() => window.open('https://disney-plus-clone-c3c6b.web.app/home')}>
        <img src="/disney.PNG" />
      </ImageContainer>
      <Title>
        Disney Plus Clone Website
      </Title>
      <Description>
        Disney Plus Clone was a step up from the previous Tesla Clone. The tech stack used here was react and firebase. Here I experimented with connecting a front end react web application to a backend firestore database on firebase. This also allowed me to practice social google OAuth sign-in method for users. I also used API calls to call for data when a user enters a movie / show. Additional libraries used here was react-slick carousel which helped with the image slider in the main viewer.
      </Description>
      <ButtonGroup>
        <Button onClick={() => window.open('https://github.com/JTZ18/Disney-plus-clone')}>
          <img src="/GitHub.png" />
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default DisneyContent

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
  text-align: center;
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