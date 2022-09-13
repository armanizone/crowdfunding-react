import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  opened: false,
}

const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    Open: (state) => {
      state.opened = true
    },
    Close: (state) => {
      state.opened = false
    }
  }
})

export const {Open, Close} = authModalSlice.actions

export default authModalSlice.reducer