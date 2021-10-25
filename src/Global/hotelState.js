import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotel: [],
  bookings: [],
};

const hotelState = createSlice({
  name: "Hotel",
  initialState,
  reducers: {
    addHotel: (state, { payload }) => {
      state.hotel = payload;
    },
    addBooking: (state, { payload }) => {
      const check = state.bookings.findIndex((el) => el.id === payload.id);
      if (check >= 0) {
        state.bookings[check].QTY += 1;
      } else {
        const addValue = {
          ...payload,
          QTY: 1,
        };
        state.bookings.push(addValue);
      }
    },
    changeDays: (state, { payload }) => {
      const check = state.bookings.findIndex((el) => el.id === payload.id);
      let checkValue = state.bookings[check].QTY;

      if (state.bookings[check].QTY > 1) {
        state.bookings[check].QTY -= 1;
      } else if (checkValue === 1) {
        state.bookings = state.bookings.filter((fl) => fl.id !== payload.id);
      }
    },
    removeBooking: (state, { payload }) => {
      state.bookings = state.bookings.filter((fl) => fl.id !== payload.id);
    },
  },
});

export const { addBooking, addHotel, removeBooking, changeDays } =
  hotelState.actions;
export default hotelState.reducer;
