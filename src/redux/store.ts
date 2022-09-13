import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch as UseAppDispatch, useSelector as useAppSelector } from 'react-redux'
import authModalReducer from './slices/authModalSlice'
// ...
const store = configureStore({
  reducer: {
    authModalReducer: authModalReducer
  },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useDispatch: () => AppDispatch = UseAppDispatch 
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector 


export default store