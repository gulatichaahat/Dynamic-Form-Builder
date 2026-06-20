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

};

return(

<div style={containerStyle}>

<div style={leftSectionStyle}>

<h1 style={brandTitleStyle}>FormFlow</h1>

<p style={brandSubtitleStyle}>Create beautiful forms in seconds</p>

<p style={featureStyle}>✓ Easy to use</p>

<p style={featureStyle}>✓ Professional designs</p>

<p style={featureStyle}>✓ Real-time analytics</p>

</div>

<form

onSubmit={handleSubmit}

style={formCardStyle}

>

<h2 style={titleStyle}>Welcome Back</h2>

<p style={subtitleStyle}>Sign in to your account</p>


<div style={inputWrapperStyle}>

<label style={labelStyle}>Email Address</label>

<input

type="email"

name="email"

placeholder="name@example.com"

onChange={handleChange}

style={inputStyle}

/>

</div>


<div style={inputWrapperStyle}>

<label style={labelStyle}>Password</label>

<input

type="password"

name="password"

placeholder="••••••••"

onChange={handleChange}

style={inputStyle}

/>

</div>


<button

                style={buttonStyle}

                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = "#1a5bb8"}

                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = "#2575fc"}

                >

                Sign In

                </button>


<div style={dividerStyle}>

<span style={dividerTextStyle}>New here?</span>

</div>


<button

                type="button"

                onClick={()=>navigate("/register")}

                style={secondaryButtonStyle}

                onMouseEnter={(e) => {

                    (e.target as HTMLButtonElement).style.background = "#f0f0f0";

                    (e.target as HTMLButtonElement).style.color = "#2575fc";

                }}

                onMouseLeave={(e) => {

                    (e.target as HTMLButtonElement).style.background = "white";

                    (e.target as HTMLButtonElement).style.color = "#666";

                }}

                >

                Create an account

                </button>

            </form>

        </div>

    );

}


const containerStyle = {

minHeight: "100vh",

display: "flex",

background: "#f8f9fa"

};

const leftSectionStyle = {

flex: 1,

background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",

color: "white",

padding: "60px 40px",

display: "flex",

flexDirection: "column" as const,

justifyContent: "center",

alignItems: "flex-start"

};

const brandTitleStyle = {

fontSize: "42px",

fontWeight: "bold",

marginBottom: "15px",

color: "white"

};

const brandSubtitleStyle = {

fontSize: "20px",

marginBottom: "40px",

color: "rgba(255,255,255,0.9)"

};

const featureStyle = {

fontSize: "16px",

marginBottom: "20px",

color: "rgba(255,255,255,0.85)",

fontWeight: "500"

};

const formCardStyle = {

flex: 1,

display: "flex",

flexDirection: "column" as const,

justifyContent: "center",

alignItems: "center",

padding: "60px 40px"

};

const titleStyle = {

fontSize: "28px",

fontWeight: "bold",

color: "#1a1a1a",

marginBottom: "8px"

};

const subtitleStyle = {

fontSize: "14px",

color: "#666",

marginBottom: "30px"

};

const inputWrapperStyle = {

width: "100%",

maxWidth: "400px",

marginBottom: "20px"

};

const labelStyle = {

display: "block",

marginBottom: "8px",

fontSize: "14px",

fontWeight: "500",

color: "#333"

};

const inputStyle = {

width: "100%",

padding: "12px 14px",

fontSize: "14px",

borderRadius: "8px",

border: "1px solid #ddd",

boxSizing: "border-box" as const,

transition: "all 0.3s ease",

fontFamily: "inherit"

};

const buttonStyle = {

width: "100%",

maxWidth: "400px",

padding: "12px",

marginTop: "10px",

background: "#2575fc",

color: "white",

border: "none",

borderRadius: "8px",

cursor: "pointer",

fontSize: "15px",

fontWeight: "600",

transition: "all 0.3s ease"

};

const dividerStyle = {

width: "100%",

maxWidth: "400px",

display: "flex",

alignItems: "center",

margin: "25px 0",

color: "#ddd"

};

const dividerTextStyle = {

flex: 1,

textAlign: "center" as const,

color: "#999",

fontSize: "13px"

};

const secondaryButtonStyle = {

width: "100%",

maxWidth: "400px",

padding: "12px",

background: "white",

color: "#666",

border: "1px solid #ddd",

borderRadius: "8px",

cursor: "pointer",

fontSize: "15px",

fontWeight: "600",

transition: "all 0.3s ease"

};


export default Login;