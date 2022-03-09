import React from 'react'
import styled from 'styled-components'

function AboutContent() {
  return (
    <Container>
      <Profile>
        <ImageContainer>
          <img src="/pp.png" />
        </ImageContainer>
        <ProfileDescriptors>
          <Name>
            Jon-Taylor
          </Name>
          <Title>
            Front End Web Developer NFTs Smart contracts
          </Title>
        </ProfileDescriptors>
      </Profile>
      
      <Description>
        I enjoy making Web Experiences as enjoyable as possible. Be it through UI/UX design or even 3D web experiences. With the big hype over the metaverse now, I believe 3D VR Web Expereinces will be the way we connect with one another in the future and I intend to be a part of building that future. 
      </Description>
      <ButtonGroup>
        <Button onClick={() => window.open("https://www.linkedin.com/in/jontaylorlim/")}>
          <img src="/LI.png" />
        </Button>
        <Button onClick={() => window.open("https://github.com/JTZ18")}>
          <img src="/GitHub.png" />
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default AboutContent

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px;

  @media only screen and (max-width: 1000px) {
    width: 100%;
    padding: 0px;
    padding-right: 4%;
  }

`

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ImageContainer = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 30%;

  img{
    border-radius: 50%;
    width: 100%;
  }
`

const ProfileDescriptors = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Name = styled.div`
  margin-bottom: 10px;
  font-size: 1.5rem;
`

const Title = styled.div`
  margin-bottom: 30px;
  font-size: 1.5rem;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.5;
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