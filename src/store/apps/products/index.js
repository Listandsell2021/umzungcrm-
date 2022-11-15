import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'



// ** Fetch Users
export const fetchData = createAsyncThunk('appProducts/fetchData', async params => {
  const response = await axios.post('https://umzungcrmtest.vercel.app/api/getProductsData', {
    params
  })
  var test={
    "alldata":response.data,
    "params":params,
    "total":1,
    "users":response.data
  }

   //console.log(params)
  return test
})

// ** Add User
export const addProducts = createAsyncThunk('product/addProducts', async (data, { getState, dispatch }) => {

  var datas={"collection":"Products"}
  const response1 = await axios.post('https://umzungcrmtest.vercel.app/api/getLastId', {
    datas
  })
  console.log(data)
  console.log("test")
  console.log(response1.data)
   console.log(data.title)
    var datanew={
            "a_id":"a1",
            "sa_id":"s1",
            "tittle":data.title,
              "descriptions ":"test2 desc",
              "price":data.price,
            "size":
          {"length":data.length,
         "breath":data.breath,
    "height":data.height,
    "cubic_meter":data.cubic_meter},
"p_id":"p"+parseInt(response1.data)+1,
"avatar":"/images/avatars/4.png",
"status":"active"}


  
  const response = await axios.post('https://umzungcrmtest.vercel.app/api/postProducts', {
    datanew
  })
  dispatch(fetchData(getState().user.params))
  

  return response.data
})
export const adduser = createAsyncThunk('appProducts/adduser', async (data, { getState, dispatch }) => {

  var datas={"collection":"Products"}
  const response1 = await axios.post('https://umzungcrmtest.vercel.app/api/getLastId', {
    datas
  })
  console.log(data)
  console.log("test")
  console.log(response1.data)
   console.log(data.title)
    var datanew={
            "a_id":"a1",
            "sa_id":"s1",
            "tittle":data.tittle,
              "descriptions ":"test2 desc",
              "price":data.price,
            "size":
          {"length":data.length,
         "breath":data.breath,
    "height":data.height,
    "cubic_meter":data.cubic_meter},
"p_id":"p"+parseInt(response1.data)+1,
"avatar":"/images/avatars/4.png",
"status":"active"}


  
  const response = await axios.post('https://umzungcrmtest.vercel.app/api/postProducts', {
    datanew
  })
  dispatch(fetchData(getState().user.params))
  

  return response.data
})
export const updateProducts = createAsyncThunk('appProducts/addProducts', async (data, { getState, dispatch }) => {

 
 
    var datanew={
            "a_id":"a1",
            "sa_id":"s1",
            "tittle":data.tittle,
              "descriptions ":"test2 desc",
              "price":data.price,
            "length":data.length,
         "breath":data.breath,
    "height":data.height,
    "cubic_meter":data.cubic_meter,
"p_id":data.p_id,
"avatar":"/images/avatars/4.png",
"status":data.status}


  console.log(datanew)
  const response = await axios.post('https://umzungcrmtest.vercel.app/api/updateProduct', {
    datanew
  })
  dispatch(fetchData(getState().user.params))
  

  return response.data
})

// ** Delete User
export const deleteUser = createAsyncThunk('appProducts/deleteUser', async (p_id, { getState, dispatch }) => {
   console.log("tesy")
  console.log(p_id)
 
  const response = await axios.post('https://umzungcrmtest.vercel.app/api/deleteProduct', {
    datanew: p_id
  })
  dispatch(fetchData(getState().user.params))

  return response.data 
})

export const appProductsSlice = createSlice({
  name: 'appProducts',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appProductsSlice.reducer
