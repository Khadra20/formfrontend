import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider, Breadcrumbs} from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AddCircleOutlineSharp, ClassSharp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {postsubject,Getsubjects,puclaient,delets} from './subjectapi'
import ClientList from './subjectlist'
import Swal from "sweetalert2";
import axios from "axios";
export const Subjects=()=>{
    const [colid,setcolid]=useState("")
    const [updateTime, setUpdateTime] = useState(new Date());
    const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm()
    const [dailogOpen,setdailog]=useState(false)
    const togledailog=()=>{
        setdailog(!dailogOpen)
    }
   
const [subject,setClient] = useState([])
   
useEffect(()=>{
    const Allsubjects =  async ()=>{
        
        const {data} = await  Getsubjects()
    
        // console.log(data)

        setClient(data)
    }
    Allsubjects()
},[updateTime])

const AddnewSubject = async (data)=>{

    if(colid !==''){

 try{
  await puclaient(colid,data)
  Swal.fire({
    icon: 'success',
    title:"Done",
    text: 'Your data has been updated',
    showConfirmButton: false,
    timer: 1500,
    
  })
togledailog()
setUpdateTime (new Date())
reset()
    } catch( err){
console.log("error ayaa jira ",err)

    }
    }
    else {
        try{
            await postsubject(data)
      
          Swal.fire({
            icon: 'success',
            title:"Done",
            text: 'Your data has been inserted',
            showConfirmButton: false,
            timer: 1500,
            
          })
          setUpdateTime (new Date())
          togledailog()
          reset()
              } catch( err){
          console.log("error ayaa jira ",err)
          
              }

    }
    
  
   
}
const updatedata = async (data)=>{
    // console.log("xogta la rabbo in la update gareeyo",data)
        setValue("name",data.name)
        setcolid(data._id)
        togledailog()
    
    }

const deletsubjectinfo =async(data)=>{
console.log(data)



}

   
    return <>
        <Box>
    <Divider sx={{height:10}}/>
<Box>
    <Alert severity="info">List subjects </Alert>
</Box>
<Box sx={{display:'flex', justifyContent:'space-between'}} my={4}>
<Typography variant="h6">Lis subjects</Typography>
<IconButton onClick={togledailog}>
    <AddCircleOutlineSharp/>
</IconButton>
</Box>
   <Dialog open={dailogOpen}onClose={togledailog}>
    <DialogTitle > Add New subject</DialogTitle>
    <Box component={"form"} onSubmit={handleSubmit(AddnewSubject)}>
<DialogContent>



<Box sx={{width:'400px'}} mt={2}>
<Stack  spacing={2} direction={'column'}>



<TextField label=" Name" {...register("name")} variant="outlined" size="small" fullWidth/>



    </Stack>
    </Box>
</DialogContent>
<DialogActions>
          <Button onClick={togledailog}>Cancel</Button>
          <Button variant="contained" sx={{bgcolor:"primary.main"}} type="submit"  size="small"> submit </Button>
 
        </DialogActions>

        </Box>

   </Dialog>
   <Divider/>
   {Subjects ? <ClientList  deletesubject={deletsubjectinfo} clientsData={subject} update={updatedata} /> : null }
        </Box>
        </>
      
    
}