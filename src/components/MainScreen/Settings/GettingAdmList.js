import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { app } from "../../../base";
import imgAvatar from "./avatar.png";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
// import LinearProgress from "@mui/material/LinearProgress";
// import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "./../../Registration/AuthProvider";
import { v4 as uuid } from "uuid";

const GettingAdmList = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const [myList, setMyList] = useState([]);
  const [myList1, setMyList1] = useState([]);
  const [toggleRoom, setToggleRoom] = useState(false);
  const [toggle, setToggle] = useState(false);

  const [image, setImage] = useState(imgAvatar);
  const [image1, setImage1] = useState(imgAvatar);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [hotelNumb, setHotelNumb] = useState("");

  const [hotelImage, setHotelImage] = useState("");
  const [roomImage1, setRoomImage1] = useState("");

  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Regular");
  const [location, setLocation] = useState("Ajegunle");
  const [percent1, setPercent1] = useState(0.0000001);
  const [percent, setPercent] = useState(0.0000001);

  const onToggle = () => {
    setToggle(!toggle);
  };

  const getData = async () => {
    await app
      .firestore()
      .collection("admission2021")
      .onSnapshot((spanshot) => {
        const r = [];
        spanshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setMyList(r);
      });
  };

  const uploadImage1 = async (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage1(save);

    const fileRef = await app.storage().ref();
    const storeRef = fileRef.child("hotelRoom/" + file.name).put(file);

    storeRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapShot) => {
        const counter = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;

        setPercent1(counter);
        console.log(counter);
      },
      (err) => console.log(err.message),
      () => {
        storeRef.snapshot.ref.getDownloadURL().then((URL) => {
          setRoomImage1(URL);
          console.log(URL);
        });
      }
    );
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);

    const fileRef = await app.storage().ref();
    const storeRef = fileRef.child("hotel/" + file.name).put(file);

    storeRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapShot) => {
        const counter = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;

        setPercent(counter);
        console.log(counter);
      },
      (err) => console.log(err.message),
      () => {
        storeRef.snapshot.ref.getDownloadURL().then((URL) => {
          setHotelImage(URL);
          console.log(URL);
        });
      }
    );
  };

  const checkForData = async () => {
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
  const checkForDataSingle = async () => {
    await app
      .firestore()
      .collection("hotel")
      .doc(currentUser.uid)
      .get()
      .then((listingData) => setMyList1(listingData.data()));
  };

  const createNewHotel = async () => {
    const newHotel = await app.auth().currentUser;

    if (newHotel) {
      await app.firestore().collection("hotel").doc(newHotel.uid).set({
        name,
        location,
        hotelImage,
        desc,
        createdBy: newHotel.uid,
        isHotel: false,
      });
      history.push("/");
    }
  };

  const createNewRoom = async () => {
    const newHotel = await app.auth().currentUser;

    if (newHotel) {
      await app
        .firestore()
        .collection("hotel")
        .doc(newHotel.uid)
        .collection("room")
        .doc()
        .set({
          id: uuid(),
          hotelNumb,
          category,
          roomImage1,
          desc,
          createdBy: newHotel.uid,
          price,
        });
      history.push("/");
    }
  };

  useEffect(() => {
    getData();
    checkForData();
    checkForDataSingle();
    console.log(myList1);
  }, []);
  return (
    <Container>
      <Wrapper>
        <Card>
          <HeaderChoice>
            <Button
              onClick={() => {
                setToggleRoom(false);
                setToggle(true);
              }}
            >
              Register an Hotel
            </Button>
            <Button
              onClick={() => {
                setToggleRoom(true);
                setToggle(false);
              }}
            >
              Create an Room
            </Button>
          </HeaderChoice>

          {toggle ? (
            <Create>
              <Sign>
                <Title>Register an Hotel</Title>
                <CardForm>
                  {percent > 0.0000001 && percent <= 99 ? (
                    <ImageHolder>
                      {/* <LinearProgress
                        // color="secondary"
                        variant="determinate"
                        value={percent}
                      /> */}
                    </ImageHolder>
                  ) : null}
                  <Image src={image} />
                  <Label htmlFor="pix">Upload Hotel Image</Label>
                  <Input
                    placeholder=""
                    type="file"
                    id="pix"
                    onChange={uploadImage}
                  />

                  <Form>
                    <Holder>
                      <MainLabel>Hotel Name</MainLabel>
                      <MainInput
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </Holder>
                    <Holder>
                      <MainLabel>Brief Description</MainLabel>
                      <MainInput
                        placeholder="Enter Description"
                        value={desc}
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                      />
                    </Holder>

                    <Holder>
                      <MainLabel>Location</MainLabel>
                      <Locate
                        placeholder="Enter Category"
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                      >
                        <Option value="Ajegunle">Ajegunle</Option>
                        <Option value="Apapa">Apapa</Option>
                        <Option value="Festac">Festac</Option>
                      </Locate>
                    </Holder>

                    {/* {myList1?.isHotel.empty ? ( */}
                    <ButtonB>
                      <Button
                        // disabled={true}
                        bg="#004080"
                        onClick={() => {
                          createNewHotel();
                        }}
                      >
                        Create a New Hotel
                      </Button>
                    </ButtonB>
                    {/* ) : (
                      <ButtonB>
                        <Button
                          bg="#004080"
                          onClick={() => {
                            createNewHotel();
                          }}
                        >
                          Create a New Hotel
                        </Button>
                        end
                      </ButtonB>
                    )} */}
                  </Form>
                </CardForm>
                <Title>
                  {/* <span onClick={onToggle}>Sing in here</span> */}
                </Title>
              </Sign>
            </Create>
          ) : (
            <Create>
              <Sign>
                <Title>Create a Room</Title>
                <CardForm>
                  {percent1 > 0.0000001 && percent1 <= 99 ? (
                    <ImageHolder>
                      {/* <LinearProgress
                        // color="secondary"
                        variant="determinate"
                        value={percent}
                      /> */}
                    </ImageHolder>
                  ) : null}
                  <Image src={image1} />
                  <Label htmlFor="pix">Upload Hotel Room's Image</Label>
                  <Input
                    placeholder=""
                    type="file"
                    id="pix"
                    onChange={uploadImage1}
                  />

                  <Form>
                    <Holder>
                      <MainLabel>Room Number</MainLabel>
                      <MainInput
                        placeholder="Enter Hotel Room Number"
                        value={hotelNumb}
                        onChange={(e) => {
                          setHotelNumb(e.target.value);
                        }}
                      />
                    </Holder>
                    <Holder>
                      <MainLabel>Brief Description</MainLabel>
                      <MainInput
                        placeholder="Enter Hotel Description"
                        value={desc}
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                      />
                    </Holder>
                    <Holder>
                      <MainLabel>Enter Category</MainLabel>
                      <Locate
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      >
                        <Option value="Regular">Regular</Option>
                        <Option value="Standard">Standard</Option>
                        <Option value="Luxury">Luxury</Option>
                      </Locate>
                    </Holder>
                    <Holder>
                      <MainLabel>Price</MainLabel>
                      <MainInput
                        placeholder="Enter Price"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </Holder>

                    <ButtonB>
                      <Button
                        bg="red"
                        onClick={() => {
                          createNewRoom();
                        }}
                      >
                        Create New Room
                      </Button>
                    </ButtonB>
                  </Form>
                </CardForm>
                <Title>
                  {/* <span onClick={onToggle}>Sing in here</span> */}
                </Title>
              </Sign>
            </Create>
          )}
        </Card>
      </Wrapper>
    </Container>
  );
};

export default GettingAdmList;

const Option = styled.option`
  font-family: Raleway;
  margin: 10px 0;
  height: 40px;
  letter-spacing: 1.5px;
`;

const Locate = styled.select`
  font-family: Raleway;
  font-weight: bold;
  letter-spacing: 1.5px;
  padding-left: 10px;
  width: 300px;
  height: 40px;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 3px;
  margin-bottom: 20px;
`;

const ImageHolder = styled.div`
  width: 150px;
  height: 5px;
  background-color: red;
  margin-bottom: 20px;
  /* display: flex; */
  /* background-color: coral; */
`;

const CardForm = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin: 20px 0;
  background-color: #004080;
  color: white;
  padding: 15px 30px;
  border-radius: 40px;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`;
const Input = styled.input`
  display: none;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;

const Sign = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const ButtonB = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`;

// const Button = styled.div`
//   width: 80%;
//   height: 50px;
//   background-color: ${({ bg }) => bg};
//   justify-content: center;
//   display: flex;
//   align-items: center;
//   color: white;
//   border-radius: 5px;
//   transition: all 350ms;
//   transform: scale(1);

//   :hover {
//     cursor: pointer;
//     transform: scale(0.97);
//   }
// `;

const Form = styled.div`
  padding: 30px 40px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  border-radius: 5px;
`;

const Holder = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainLabel = styled.label`
  font-weight: bold;
  font-size: 12px;
  color: #004080;
`;
const MainInput = styled.input`
  padding-left: 10px;
  width: 300px;
  height: 40px;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 3px;
  margin-bottom: 20px;
`;

const RegisterComp = styled.div`
  width: 80%;
  min-height: 80vh;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-weight: bold;
  margin: 40px 0;

  span {
    margin-left: 5px;
    color: red;
    cursor: pointer;
  }
`;

const Create = styled.div``;

const HeaderChoice = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  outline: none;
  border: 0;
  color: white;
  background-color: #004080;
  width: 300px;
  height: 60px;
  margin: 10px;
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

// <Card>
// {myList.length}
// {myList?.map((props) => (
//   <div
//     style={{
//       display: "flex",
//       width: "100%",
//       justifyContent: "space-around",
//       // textAlign: "left",
//     }}
//   >
//     <div> {props.name}</div>
//     <div>{props.email} </div>
//     <div>{props.phone} </div>
//   </div>
// ))}
// </Card>
