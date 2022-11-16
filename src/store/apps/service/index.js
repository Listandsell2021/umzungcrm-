import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'



// ** Fetch Users
export const fetchData = createAsyncThunk('appService/fetchData', async params => {
  const response = await axios.post('https://umzungcrmtest.vercel.app/api/getServiceData', {
    params
  })
  var test={
    "alldata":response.data,
    "params":params,
    "total":1,
    "service":response.data
  }

   console.log(test)
  return test
})

// ** Add User
export const addService = createAsyncThunk('appService/addService', async (data, { getState, dispatch }) => {

  var datas={"collection":"Services"}
  const response1 = await axios.post('https://umzungcrmtest.vercel.app/api/getLastId', {
    datas
  })
  console.log(data)
  
     var datanew={"sa_id":"sa1",
   "s_id":"s"+parseInt(response1.data)+1,
   "tittle":data.tittle,
   "price":data.price,
   "service_type":"fixed price",
   "avatar":"/images/avatars/bed.png",
   "a_id":"a1","price_per_smeter":"0",
   "des ":"test service details",
   "desc":"test service details",
   "status":"active"}
   
    


  
  const response = await axios.post('https://umzungcrmtest.vercel.app/api/postServices', {
    datanew
  })
  dispatch(fetchData(getState().user.params))
  

  return response.data
})

export const updateServices = createAsyncThunk('appService/addUser', async (data, { getState, dispatch }) => {

 
 
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
  const response = await axios.post('https://umzungcrmtest.vercel.app/api/updateService', {
    datanew
  })
  dispatch(fetchData(getState().user.params))
  

  return response.data
})

// ** Delete User
export const deleteUser = createAsyncThunk('appService/deleteUser', async (s_id, { getState, dispatch }) => {
  
 
  const response = await axios.post('https://umzungcrmtest.vercel.app/api/deleteService', {
    datanew: s_id
  })
  dispatch(fetchData(getState().user.params))

  return response.data 
})

export const appServiceSlice = createSlice({
  name: 'appService',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.service
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appServiceSlice.reducer
