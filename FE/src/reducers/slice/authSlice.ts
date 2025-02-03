import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AUTHORITIES } from '../../constants/constants'
// import axios from 'axios'
import { defaultAuth, IAuth } from '../../models/reducers/auth.model'

const initialState: IAuth = defaultAuth

export const authenticate = createAsyncThunk('auth/login', async () => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        authorities: [AUTHORITIES.SYSTEM_ADMIN],
      })
    }, 3000)
  })
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthentication(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload
    },
    setAccount(state, action: PayloadAction<any>) {
      state.account = action.payload
      localStorage.setItem('account', JSON.stringify(action.payload))
    },
    logout(state) {
      state.isAuthenticated = false
      state.account = { authorities: [''] }
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('account')
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticate.rejected, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(authenticate.fulfilled, (state, _action) => ({
        ...state,
        loading: false,
        isAuthenticated: true,
        account: {
          authorities: [AUTHORITIES.USER],
        },
      }))
      .addCase(authenticate.pending, (state) => ({
        ...state,
        loading: true,
      }))
  },
})

export const { setAuthentication, setAccount, logout } = authSlice.actions
export default authSlice.reducer
