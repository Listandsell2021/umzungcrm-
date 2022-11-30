import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'



// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async params => {
  const response = await axios.post('https://umzungcrmtest.vercel.app/api/getAdminData', {
    params
  })
  var test={
    "alldata":response.data,
    "params":params,
    "total":1,
    "users":response.data
  }

   console.log(params)
  return test
})
export const fetchplan=(async params =>
{
  
  const response = await axios.post('https://umzungcrmtest.vercel.app/api/getPackages', {
    
  })
 

   //console.log(params)
  return response.data
})
// ** Add User
export const addUser = createAsyncThunk('appUsers/addUser', async (data, { getState, dispatch }) => {
  var datas={"collection":"Admin"}
  const response1 = await axios.post('https://umzungcrmtest.vercel.app/api/getLastId', {
    datas
  })
  //console.log(data)
//console.log(response1.data)
  var datanew={"sa_id":"s1",
"a_id":"a"+parseInt(response1.data)+1,
"company_name":data.company,
"address":data.address,
"token":"1121212",
"date_registered":"211515",
"avatar":"/images/avatars/4.png",
"contact":data.contact,
"currentPlan":data.currentPlan,
"full_name":data.firstname+data.lastname,
"role":data.role,
"status":"pending",
"email":data.email,
"username":data.username}
  const response = await axios.post('https://umzungcrmtest.vercel.app/api/postAdmin', {
    datanew
  })
  dispatch(fetchData(getState().user.params))
  


  return response.data
})
export const updateUser = createAsyncThunk('appProducts/addProducts', async (data, { getState, dispatch }) => {

 
 
  var datanew={
     "sa_id":"sa1",
      "a_id":data.a_id,
     //"company_name":,
      "address":data.address,
      "token":"123333",
      //"date_registered":"24/11/2022",
      //"avatar":"/images/avatars/4.png",
      "contact":data.contact,
      //"currentPlan":"plan2",
      "full_name":data.full_name,
      "status":data.status,
      "email":data.email,
      //"role":"admin",
      "username":data.username
    }


  console.log(datanew)
 const response = await axios.post('https://umzungcrmtest.vercel.app/api/updateAdminlist', {
    datanew
  })
  dispatch(fetchData(getState().user.params))
  

  return response.data
})
// ** Delete User
export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { getState, dispatch }) => {
  const response = await axios.delete('/apps/users/delete', {
    data: id
  })
  dispatch(fetchData(getState().user.params))

  return response.data
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
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

export default appUsersSlice.reducer
