import React, { useState } from "react";
import styled from "styled-components";
import { app } from "./../../base";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import imgAvatar from "./avatar.png";

export const Register = () => {
  const history = useHistory();
  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(imgAvatar);
  const [avatar, setAvatar] = useState("");

  const [percent, setPercent] = useState(0.00001);

  const onToggle = () => {
    setToggle(!toggle);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);

    const fileRef = await app.storage().ref();
    const storeRef = fileRef.child("avatar/" + file.name).put(file);

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
          setAvatar(URL);
          console.log(URL);
        });
      }
    );
  };

  const signUp = async () => {
    const saveUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (saveUser) {
      await app.firestore().collection("users").doc(saveUser.user.uid).set({
        avatar,
        name,
        email,
        password,
        createdBy: saveUser.user.uid,
      });
      history.push("/");
    }
  };

  const signIn = async () => {
    const saveUser = await app
      .auth()
      .signInWithEmailAndPassword(email, password);

    history.push("/");
  };

  const GoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const saveUser = await app.auth().signInWithPopup(provider);

    if (saveUser) {
      await app.firestore().collection("users").doc(saveUser.user.uid).set({
        avatar: saveUser.user.photoURL,
        name: saveUser.user.displayName,
        email: saveUser.user.email,
        password,
        createdBy: saveUser.user.uid,
      });
      history.push("/");
    }

    history.push("/");
  };

  return (
    <Container>
      <Wrapper>
        <RegisterComp>
          {toggle ? (
            <Sign>
              <Title>Register An Account</Title>
              <Card>
                <Image src={image} />
                <Label htmlFor="pix">Upload an Image</Label>
                <Input
                  placeholder=""
                  type="file"
                  id="pix"
                  onChange={uploadImage}
                />

                <Form>
                  <Holder>
                    <MainLabel>Name</MainLabel>
                    <MainInput
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Holder>
                  <Holder>
                    <MainLabel>Email</MainLabel>
                    <MainInput
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Holder>
                  <Holder>
                    <MainLabel>Password</MainLabel>
                    <MainInput
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Holder>

                  <ButtonB>
                    <Button bg="#004080" onClick={signUp}>
                      Sign Up
                    </Button>
                  </ButtonB>
                  <ButtonB>
                    <Title> or prefers Google </Title>
                  </ButtonB>
                  <ButtonB>
                    <Button bg="red" onClick={GoogleSignIn}>
                      Sign Up with Google
                    </Button>
                  </ButtonB>
                </Form>
              </Card>
              <Title>
                Already have an Account,
                <span onClick={onToggle}>Sing in here</span>
              </Title>
            </Sign>
          ) : (
            <Sign>
              <Title>Sign in to your Account</Title>
              <Card>
                <Form>
                  <Holder>
                    <MainLabel>Email</MainLabel>
                    <MainInput placeholder="Enter Email" />
                  </Holder>
                  <Holder>
                    <MainLabel>Password</MainLabel>
                    <MainInput placeholder="Enter Password" />
                  </Holder>

                  <ButtonB>
                    <Button bg="#004080" onClick={signUp}>
                      Sign In
                    </Button>
                  </ButtonB>
                  <ButtonB>
                    <Title> or prefers Google </Title>
                  </ButtonB>
                  <ButtonB>
                    <Button bg="red" onClick={GoogleSignIn}>
                      Sign in with Google
                    </Button>
                  </ButtonB>
                </Form>
              </Card>
              <Title>
                Already have an Account,
                <span onClick={onToggle}>Sing Up here</span>
              </Title>
            </Sign>
          )}
        </RegisterComp>
      </Wrapper>
    </Container>
  );
};

const Sign = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ButtonB = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`;

const Button = styled.div`
  width: 80%;
  height: 50px;
  background-color: ${({ bg }) => bg};
  justify-content: center;
  display: flex;
  align-items: center;
  color: white;
  border-radius: 5px;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    cursor: pointer;
    transform: scale(0.97);
  }
`;

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
const Card = styled.div`
  width: 100%;
  height: 100%;
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
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

const Wrapper = styled.div`
  min-height: 90vh;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding-top: 100px;
  width: 100%;
  min-height: 90vh;
  height: 100%;
`;
