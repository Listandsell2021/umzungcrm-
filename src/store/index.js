// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import service from 'src/store/apps/service'
import products from 'src/store/apps/products'

export const store = configureStore({
  reducer: {
    createSlice,
    products,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    service
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
