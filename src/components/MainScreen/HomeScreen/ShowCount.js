import React, { useState, useEffect } from "react";
import { app } from "./../../../base";

const ShowCount = ({ uid }) => {
  console.log(uid);
  const [myList, setMyList] = useState([]);

  const getDataRoom = async () => {
    await app
      .firestore()
      .collection("hotel")
      .doc(uid)
      .collection("room")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setMyList(r);
      });
  };

  useEffect(() => {
    getDataRoom();
  }, []);

  return (
    <div>
      <div>{myList.length}</div>
    </div>
  );
};

export default ShowCount;
