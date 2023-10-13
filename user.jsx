import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider, Icon, } from "@mui/material"
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Getuser,postuser,putuser} from './Userapi'
import Serviclist from './userlist'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export const Users=()=>{
    const [sid,setsid]=useState("")
    const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm()
    const [updateTime, setUpdateTime] = useState(new Date());
    const [dailogOpen,setDailogopen]=useState(false)
    const togledailog=()=>{
        setDailogopen(!dailogOpen)
    }
    const [user,setuser]=useState([])
    useEffect(()=>{
const Alluser=async()=>{
    const {data}=await Getuser()

    setuser(data)
}
Alluser()
},[updateTime])

const Adduser = async (data)=>{

    if(sid !==''){

        try{
         await putuser(sid,data)
         Swal.fire({
            icon: 'success',
            title:"Done",
            text: 'Your data has been updated',
            showConfirmButton: false,
            timer: 1500,
            
          })
          setUpdateTime (new Date())
       togledailog()
       reset();
           } catch(err){
       console.log("error ayaa jira ",err)
       
           }
           }
           else {
               try{
                   await postuser(data)
                   Swal.fire({
                    icon: 'success',
                    title:"Done",
                    text: 'Your data has been inserted',
                    showConfirmButton: false,
                    timer: 1500,
                    
                  })
                  
                 togledailog()
                 setUpdateTime (new Date())
                 reset()
                     } catch(err){
                 console.log("error ayaa jira ",err)
                 
                     }
       
           }
    
  
   
}

const UpateUser =async(data)=>{
    setValue("name",data.name)
    setValue("email",data.email)
    setValue("status", data.status)
    setValue("password", data.password)
   
    setsid(data._id)
    togledailog()

}
const Deletuserinfo =async(data)=>{
    console.log(data)
}
    return(
      <>
      
      <Box>
    <Divider sx={{height:10}}/>
<Box>
    <Alert severity="info">List Cleint </Alert>
</Box>
<Box sx={{display:'flex', justifyContent:'space-between'}} my={4}>
<Typography variant="h6">Lis Users</Typography>
<IconButton onClick={togledailog}>
    <AddCircleOutlineSharp/>
</IconButton>
</Box>
   <Dialog open={dailogOpen}onClose={togledailog}>
    <DialogTitle > Add New User</DialogTitle>
    <Box component={"form"} onSubmit={handleSubmit(Adduser)}>
        
<DialogContent>



<Box sx={{width:'400px'}} mt={2}>
<Stack  spacing={2} direction={'column'}>


<TextField label="name" {...register("name")} variant="outlined" size="small" fullWidth/>
<TextField label="email" {...register("email")} variant="outlined" size="small" fullWidth/>
<TextField label="userStatus" {...register("status")} variant="outlined" size="small" fullWidth/>
<TextField label="password" {...register("password")} variant="outlined" size="small" fullWidth/>


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
   {Users ? <Serviclist deleteuser={Deletuserinfo} UserData={user} update={UpateUser}/> :null}
        </Box>
      
      </>
    )
}