import React from "react";
import styled from "styled-components";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  removeBooking,
  changeDays,
  addBooking,
} from "../../../Global/hotelState";
import { useHistory } from "react-router-dom";

const Bookings = () => {
  const bookingState = useSelector((state) => state.myReducer.bookings);
  const dispatch = useDispatch();
  const hist = useHistory();

  return (
    <Container>
      <Wrapper>
        <Card>
          <CardHolder>
            {bookingState.map((props, i) => (
              <MainCard key={i}>
                <Image src={props.roomImage1} />
                <Content>
                  <Title>{props.hotelNumb}</Title>
                  <Desc>{props.desc}</Desc>

                  <Hold>
                    <Icon
                      cl="red"
                      onClick={() => {
                        dispatch(changeDays(props));
                        console.log("Hello");
                      }}
                    >
                      <AiFillMinusCircle />
                    </Icon>
                    <Holder>
                      <Label>No of Days</Label>
                      <Result>{props.QTY}</Result>
                    </Holder>
                    <Icon
                      cl="green"
                      onClick={() => {
                        dispatch(addBooking(props));
                      }}
                    >
                      <AiFillPlusCircle />
                    </Icon>
                  </Hold>
                  <Hold>
                    <Space />
                  </Hold>
                  <Hold1>
                    <Holder>
                      <Label>Price</Label>
                      <Result>#{parseInt(props.price) * props.QTY}</Result>
                    </Holder>

                    <Holder>
                      <Label>Category</Label>
                      <Result>{props.category}</Result>
                    </Holder>

                    <Holder>
                      <Label>Location</Label>
                      <Result>Ajegunle</Result>
                    </Holder>
                  </Hold1>

                  <Hold>
                    <Button
                      onClick={() => {
                        dispatch(removeBooking(props));
                      }}
                    >
                      Cancel Bookings
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

export default Bookings;

// const Container = styled.div``

const Space = styled.div`
  width: 80%;
  border: 1px solid;
  border-color: lightgray;
  display: flex;
  justify-content: center;
  margin: 20px 0;
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */
`;

const Icon = styled.div`
  font-size: 25px;
  margin-top: 5px;
  color: ${({ cl }) => cl};
  cursor: pointer;
`;

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
  justify-content: center;
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
  background-color: blue;
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
  min-height: 75vh;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;
const Wrapper = styled.div`
  width: 95%;
  height: 80%;
  min-height: 100vh;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 50vh;
  padding-top: 100px;
`;
