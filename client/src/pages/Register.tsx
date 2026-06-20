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

<h2 style={titleStyle}>Create Account</h2>

<p style={subtitleStyle}>Join FormFlow and start creating forms</p>


<div style={inputWrapperStyle}>

<label style={labelStyle}>Full Name</label>

<input

type="text"

name="name"

placeholder="John Doe"

onChange={handleChange}

style={inputStyle}

/>

</div>


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

                Create Account

                </button>


<div style={dividerStyle}>

<span style={dividerTextStyle}>Already have an account?</span>

</div>


<button

                type="button"

                onClick={()=>navigate("/")}

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

                Sign In

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


export default Register;