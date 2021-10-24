import React from 'react'
import styled from "styled-components"
import {AiFillPieChart, AiFillBook, AiFillSetting, AiFillHome} from "react-icons/ai"
import {BiLogIn} from "react-icons/bi"
import {Link} from "react-router-dom"


const Header = () => {
  return (
    <Container>
      <Wrapper>
        <Logo>.CodeLab Hotel</Logo>
        <Navigation>
          <Nav>
            <Icon>
              <AiFillHome/>
            </Icon>
            <span>Home</span>
          </Nav>
          <Nav>
            <Icon>
              <AiFillBook/>
            </Icon>
            <span>Bookings</span>
          </Nav>
          <Nav>
            <Icon>
              <AiFillPieChart/>
            </Icon>
            <span>Stats</span>
          </Nav>
          <Nav>
            <Icon>
              <AiFillSetting/>
            </Icon>
            <span>Settings</span>
          </Nav>
        </Navigation>
        <Space />
        <Action>
        <Nav1>
            <Icon>
              <BiLogIn/>
            </Icon>
            <span>Log In</span>
          </Nav1>
        </Action>
      </Wrapper>
    </Container>
  )
}

export default Header

// const Logo = styled.div``

const Space = styled.div`
flex: 1
`
const Action = styled.div``

const Navigation = styled.div`
display:flex
`
const Nav1 = styled.div`
margin: 0 10px;
display:flex;
align-items:center;
width: 110px;
height: 50px;
justify-content: center;
border-radius: 3px;
transition: all 350ms;

span{
  font-weight: bold;
}

:hover{
background-color: rgba(255, 255, 255,0.6);
color:#004080;
cursor: pointer;
}
`
const Nav = styled(Link)`
text-decoration: none;
color: white;
margin: 0 10px;
display:flex;
align-items:center;
width: 110px;
height: 50px;
justify-content: center;
border-radius: 3px;
transition: all 350ms;

span{
  font-weight: bold;
}

:hover{
background-color: rgba(255, 255, 255,0.6);
color:#004080;
cursor: pointer;
}
`
const Icon = styled.div`
margin: 0 5px;
margin-top: 6px;
font-size: 25px;
font-weight: bold;
`

const Logo = styled.div`
margin: 0 30px;
font-size: 30px;
font-weight: bold;
letter-spacing:2px
` 

const Wrapper = styled.div`
height: 100px;
width: 100%;
display:flex;
align-items: center;
` 
const Container = styled.div`
height: 100px;
width: 100%;
background-color:#004080;
color: white;
position:fixed
` 