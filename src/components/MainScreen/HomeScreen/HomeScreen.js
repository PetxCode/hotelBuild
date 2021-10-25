import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { app } from "./../../../base";
import ShowCount from "./ShowCount";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const [myList, setMyList] = useState([]);

  const getData = async () => {
    await app
      .firestore()
      .collection("hotel")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setMyList(r);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Card>
          <CardHolder>
            {myList?.map((props, i) => (
              <MainCard key={i} to={`/detail/${props.id}`}>
                <Image src={props.hotelImage} />
                <Content>
                  <Title>{props.name}</Title>
                  <Desc>{props.desc}</Desc>
                  <Location>{props.location}</Location>
                  <Hold>
                    <Holder>
                      <Label>No of RMs No</Label>
                      <Result>
                        <ShowCount uid={props.id} />
                      </Result>
                    </Holder>
                    <Holder>
                      <Label>Rating</Label>
                      <Result>5</Result>
                    </Holder>
                    <Holder>
                      <Label>Available RMs</Label>
                      <Result>5</Result>
                    </Holder>
                  </Hold>
                </Content>
              </MainCard>
            ))}
          </CardHolder>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default HomeScreen;

// const Container = styled.div``

const Location = styled.div`
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  font-weight: bold;
  color: #004080;
`;

const Result = styled.div`
  font-weight: bold;
  font-size: 12px;
`;
const Label = styled.label`
  font-weight: bold;
  font-size: 12px;
  color: #004080;
`;

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
`;
const Hold = styled.div`
  width: 100%;
  justify-content: space-around;
  display: flex;
`;

const Desc = styled.div`
  font-size: 13px;
  letter-spacing: 1.2px;
  line-height: 1.3;
`;

const Title = styled.div`
  font-weight: bold;
  margin: 10px 0;
  color: #004080;
`;
const Content = styled.div`
  margin: 10px;
`;
const Image = styled.img`
  width: 100%;
  height: 250px;
  background-color: red;
  object-fit: cover;
`;

const CardHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const MainCard = styled(Link)`
  color: black;
  text-decoration: none;
  margin: 10px;
  width: 300px;
  min-height: 350px;
  padding-bottom: 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  overflow: hidden;
  transition: all 350ms;
  transform: scale(1);
  margin: 5px;

  :hover {
    transform: scale(1.01);

    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
`;

const Card = styled.div`
  padding-top: 20px;
  margin-top: 50px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;
const Wrapper = styled.div`
  width: 95%;
  height: 100%;
  min-height: 100vh;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding-top: 100px;
`;
