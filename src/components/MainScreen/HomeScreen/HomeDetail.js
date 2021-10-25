import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { app } from "./../../../base";
import { useDispatch, useSelector } from "react-redux";
import { addHotel, addBooking } from "../../../Global/hotelState";

const HomeDetail = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.myReducer.bookings);

  const { id } = useParams();
  console.log(id);
  const [myList, setMyList] = useState([]);
  const [myList1, setMyList1] = useState([]);

  const getDataRoom = async () => {
    await app
      .firestore()
      .collection("hotel")
      .doc(id)
      .collection("room")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setMyList(r);
        dispatch(addHotel(r));
      });
  };

  const checkForDataSingle = async () => {
    await app
      .firestore()
      .collection("hotel")
      .doc(id)
      .get()
      .then((listingData) => setMyList1(listingData.data()));
  };

  useEffect(() => {
    getDataRoom();
    checkForDataSingle();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Card>
          <CardHolder>
            {myList?.map((props, i) => (
              <MainCard>
                <Image src={props.roomImage1} />
                <Content>
                  <Title>Room {props.hotelNumb}</Title>
                  <Desc>{props.desc}</Desc>
                  <Hold1>
                    <Holder>
                      <Label>Price</Label>
                      <Result>#{props.price}</Result>
                    </Holder>

                    <Holder>
                      <Label>Category</Label>
                      <Result>{props.category}</Result>
                    </Holder>

                    {/* <Holder>
                      <Label>Location</Label>
                      <Result>

                      </Result>
                    </Holder> */}

                    {/* <Location>Price</Location>
                    <Location>Ajegunle</Location> */}
                  </Hold1>
                  <Hold>
                    {/* <Holder>
                      <Label>No of RMs</Label>
                      <Result>5</Result>
                    </Holder>
                    <Holder>
                      <Label>Rating</Label>
                      <Result>5</Result>
                    </Holder>
                    <Holder>
                      <Label>No of RMs</Label>
                      <Result>5</Result>
                    </Holder> */}

                    <Button
                      onClick={() => {
                        dispatch(addBooking(props));
                      }}
                    >
                      Add to Bookings
                    </Button>
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

export default HomeDetail;

// const Container = styled.div``

const Button = styled.div`
  color: white;
  background-color: #004080;
  width: 80%;
  height: 60px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 20px;
  border-radius: 3px;
  transition: all 350ms;
  transform: scale(1);
  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const Location = styled.div`
  margin: 10px 0;
  /* width: 100%; */
  display: flex;
  /* justify-content: flex-end; */
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
const Hold1 = styled.div`
  width: 85%;
  justify-content: space-between;
  display: flex;
  margin: 0 20px;
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
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-weight: bold;
  margin: 10px 0;
  color: #004080;
  margin-bottom: 20px;
`;
const Content = styled.div`
  margin: 10px;
`;
const Image = styled.img`
  width: 100%;
  height: 250px;
  background-color: green;
  object-fit: cover;
`;

const CardHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const MainCard = styled.div`
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
