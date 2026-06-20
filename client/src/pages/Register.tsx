import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Register(){

const navigate=useNavigate();

const [form,setForm]=useState({

name:"",

email:"",

password:""

});


const handleChange=(e:any)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};


const handleSubmit=async(e:any)=>{

e.preventDefault();

try{

await API.post(

"/auth/register",

form

);

alert("Registration Successful");

navigate("/");

}

catch(error:any){

alert(

error.response.data.message

);

}

};


return(

<div style={{

height:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

background:

"linear-gradient(to right,#6a11cb,#2575fc)"

}}>

<form

onSubmit={handleSubmit}

style={{

background:"white",

padding:"40px",

borderRadius:"20px",

width:"350px",

boxShadow:"0 0 20px rgba(0,0,0,0.3)"

}}

>

<h1>

Register

</h1>


<input

type="text"

name="name"

placeholder="Enter Name"

onChange={handleChange}

style={inputStyle}

/>


<input

type="email"

name="email"

placeholder="Enter Email"

onChange={handleChange}

style={inputStyle}

/>


<input

type="password"

name="password"

placeholder="Enter Password"

onChange={handleChange}

style={inputStyle}

/>


<button

style={buttonStyle}

>

Register

</button>

</form>

</div>

);

}


const inputStyle={

width:"100%",

padding:"12px",

marginTop:"15px",

borderRadius:"8px",

border:"1px solid gray"

};


const buttonStyle={

width:"100%",

padding:"12px",

marginTop:"20px",

background:"#2575fc",

color:"white",

border:"none",

borderRadius:"8px",

cursor:"pointer"

};


export default Register;