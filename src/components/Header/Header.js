import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  AiFillPieChart,
  AiFillBook,
  AiFillSetting,
  AiFillHome,
} from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "./../Registration/AuthProvider";
import { app } from "./../../base";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  const getData = async () => {
    await app
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((user) => {
        setUserData(user.data());
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Logo>.CodeLab Hotel</Logo>
        {currentUser ? (
          <Navigation>
            <Nav to="/">
              <Icon>
                <AiFillHome />
              </Icon>
              <span>Home</span>
            </Nav>
            <Nav to="/bookings">
              <Icon>
                <AiFillBook />
              </Icon>
              <span>Bookings</span>
            </Nav>
            <Nav to="/detail">
              <Icon>
                <AiFillPieChart />
              </Icon>
              <span>Stats</span>
            </Nav>
            <Nav to="/setting">
              <Icon>
                <AiFillSetting />
              </Icon>
              <span>Settings</span>
            </Nav>
          </Navigation>
        ) : null}
        <Space />
        {currentUser ? (
          <Action>
            <Nav1
              onClick={() => {
                app.auth().signOut();
              }}
            >
              <Icon>
                <Pix src={userData?.avatar} />
                <BiLogIn />
              </Icon>
              <span>Log Out</span>
            </Nav1>
          </Action>
        ) : (
          <Action>
            <Nav to="/register">
              <Icon>
                <BiLogIn />
              </Icon>
              <span>Log In</span>
            </Nav>
          </Action>
        )}
      </Wrapper>
    </Container>
  );
};

export default Header;

// const Logo = styled.div``

const Pix = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  background-color: red;
`;

const Space = styled.div`
  flex: 1;
`;
const Action = styled.div`
  display: flex;
  align-items: center;
`;

const Navigation = styled.div`
  display: flex;
`;
const Nav1 = styled.div`
  margin: 0 10px;
  display: flex;
  align-items: center;
  width: 110px;
  height: 50px;
  justify-content: center;
  border-radius: 3px;
  transition: all 350ms;

  span {
    font-weight: bold;
  }

  :hover {
    background-color: rgba(255, 255, 255, 0.6);
    color: #004080;
    cursor: pointer;
  }
`;
const Nav = styled(Link)`
  text-decoration: none;
  color: white;
  margin: 0 10px;
  display: flex;
  align-items: center;
  min-width: 110px;
  width: 100%;
  height: 50px;
  justify-content: center;
  border-radius: 3px;
  transition: all 350ms;

  span {
    font-weight: bold;
  }

  :hover {
    background-color: rgba(255, 255, 255, 0.6);
    color: #004080;
    cursor: pointer;
  }
`;
const Icon = styled.div`
  margin: 0 5px;
  margin-top: 6px;
  font-size: 25px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  margin: 0 30px;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 2px;
`;

const Wrapper = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const Container = styled.div`
  height: 100px;
  width: 100%;
  background-color: #004080;
  color: white;
  position: fixed;
  z-index: 100;
`;
