import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Login(){

const navigate=useNavigate();

const [form,setForm]=useState({

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

console.log("Login button clicked");

try{

const res=await API.post(

"/auth/login",

form

);

console.log(res);

localStorage.setItem(

"token",

res.data.token

);


alert("Login Successful");


navigate(

"/dashboard"

);

}

catch(error:any){

console.log(error);

alert(

error?.response?.data?.message ||

error.message ||

"Login Failed"

);

}

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

Login

</h1>


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

Login

</button>

</form>

</div>

);

}

<p
style={{

marginTop:"20px",

textAlign:"center"

}}
>

Don't have an account?

<button

onClick={()=>

navigate("/register")

}

style={{

background:"none",

border:"none",

color:"#2575fc",

cursor:"pointer",

fontWeight:"bold"

}}

>

Register

</button>

</p>

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
}

export default Login;