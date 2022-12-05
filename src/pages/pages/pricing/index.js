// ** React Imports
import { useState,forwardRef } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import MuiCardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'


import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContents from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
// ** Third Party Imports
import axios from 'axios'

// ** Demo Imports
import PricingCTA from 'src/views/pages/pricing/PricingCTA'
import PricingPlans from 'src/views/pages/pricing/PricingPlans'
import PricingHeader from 'src/views/pages/pricing/PricingHeader'
import PricingFooter from 'src/views/pages/pricing/PricingFooter'

import AccountOutline from 'mdi-material-ui/AccountOutline'
const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})
// ** Styled Components
const CardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: theme.spacing(20, 35, 35),
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(12.5, 20, 20)
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(10, 5)
  }
}))

const Pricing = ({ apiData }) => {
  // ** States
  const [plan, setPlan] = useState('monthly')
  const [show, setShow] = useState(false)
  const [title, settitle] = useState("")
  const [monthlyPrice,setmonthlyPrice] = useState("")
  const [subtitle,setsubtitle] = useState("")
  const [perMonth,setperMonth] = useState("")
  const [totalAnnual, settotalAnnual] = useState("")
  const [planBenefits1, setplanBenefits1] = useState("")
  const [planBenefits2, setplanBenefits2] = useState("")
  const [planBenefits3, setplanBenefits3] = useState("")
  const [planBenefits4, setplanBenefits4] = useState("")
  const [status, setStatus] = useState("")
  const [languages, setLanguages] = useState([])
  const handleChange = e => {
    if (e.target.checked) {
      setPlan('annually')
    } else {
      setPlan('monthly')
    }
  }

const handleChangeTitle = e => {
    settitle(e.target.value)
  }
  const handleChangePlanPrice = e => {
    setmonthlyPrice(e.target.value)
  }
  const handleChangeSubTitle = e => {
    setsubtitle(e.target.value)
  }
const handleChangePerMonthPriceUYearly= e => {
    setperMonth(e.target.value)
  }
  const handleChangeStatus = e => {
    setStatus(e.target.value)
  }
  const handleChangeAnnualPrice = e => {
    settotalAnnual(e.target.value)
  }
  const handleChangeBenifits1 = e => {
    setplanBenefits1(e.target.value)
  }
    const handleChangeBenifits2 = e => {
    setplanBenefits2(e.target.value)
  }
    const handleChangeBenifits3 = e => {
    setplanBenefits3(e.target.value)
  }
    const handleChangeBenifits4 = e => {
    setplanBenefits4(e.target.value)
  }

  
  return (
    <Card>
      <CardContent>
        <PricingHeader plan={plan} handleChange={handleChange} />
        <PricingPlans plan={plan} data={apiData} />
        
      </CardContent>
      
      <PricingCTA />
      <PricingFooter data={apiData} />
      
       
    </Card>
  )
}

export const getServerSideProps = async () => {
  
  const res1 = await axios.post('https://umzungcrmtest.vercel.app/api/getPackages')
  //const apiData = res.data
  var apiData=res1.data
 // console.log(apiData)
   apiData=apiData[0]
  //console.log(apiData2[0])
  return {
    props: {
      apiData
    }
  }
}

export default Pricing
