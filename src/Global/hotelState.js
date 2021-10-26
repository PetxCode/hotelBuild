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

    // totalState: (state, { payload }) => {
    //   let { totalBookingsCost, totalRoomBooked } = state.bookings.reduce(
    //     (totalBookings, mainBooking) => {
    //       const { price, QTY } = mainBooking;

    //       const totalCost = price * QTY;

    //       mainBooking.totalBookings += totalCost;
    //       mainBooking.QTY += totalBookings;

    //       return totalBookings;
    //     },
    //     { totalBookingsCost: 0, totalRoomBooked: 0 }
    //   );

    //   state.bookingCost = totalBookingsCost;
    //   state.bookingRoom = totalRoomBooked;
    // },

    // totalState: (state, { payload }) => {
    //   let { totalCost, totalDays } = state.bookings.reduce(
    //     (totalRoomCost, bookingState) => {
    //       const { price, QTY } = bookingState;
    //       const totalPrice = price * QTY;

    //       totalRoomCost.totalDays += QTY;
    //       totalRoomCost.totalCost += totalPrice;

    //       return totalRoomCost;
    //     },
    //     { totalCost: 0, totalDays: 0 }
    //   );

    //   state.totalValuePrice = totalCost;
    //   state.totalValueQTY = totalDays;
    // },

    totalState: (state, { payload }) => {
      const { totalCost, totalDays } = state.bookings.reduce(
        (totalPrice, allBookings) => {
          const { price, QTY } = allBookings;

          const mainCost = price * QTY;

          totalPrice.totalDays += QTY;
          totalPrice.totalCost += mainCost;

          return totalPrice;
        },
        {
          totalCost: 0,
          totalDays: 0,
        }
      );

      state.tatalRoomCost = totalCost;
      state.totalRoomDays = totalDays;
    },
  },
});

export const { addBooking, addHotel, removeBooking, changeDays, totalState } =
  hotelState.actions;
export default hotelState.reducer;
