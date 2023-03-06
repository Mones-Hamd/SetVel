import React from 'react'
import Header from '../Components/Header/Header'
import Navbar from '../Components/Navbar/Navbar'
import DataTable from '../Components/Table/Table'
import { useAuth } from './../hooks/useAuth';
import  Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


const Home = () => {
  const {user}=useAuth()
  return (
    <div>
    <Navbar />
    <Header />
    {!user?<Paper >
      <Typography>Please Sign in to manage your contacts</Typography>

    </Paper>: <DataTable /> }
   
    </div>
  )
}

export default Home