import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function CreateForm(){

const navigate = useNavigate();

const [title,setTitle]=useState("");

const [description,setDescription]=useState("");

const [isCreated,setIsCreated]=useState(false);

const [fields,setFields]=useState([

{

label:"",

type:"text"

}

]);


const addField=()=>{

setFields([

...fields,

{

label:"",

type:"text"

}

]);

};


const handleFieldChange=(

index:number,

key:string,

value:string

)=>{

const updated=[...fields];

updated[index]={

...updated[index],

[key]:value

};

setFields(updated);

};


const saveForm=async()=>{

try{

const token=

localStorage.getItem("token");


await API.post(

"/forms",

{

title,

description,

fields

},

{

headers:{

Authorization:

`Bearer ${token}`

}

}

);

setIsCreated(true);

}

catch(error:any){

console.log(error);

alert(

"Error creating form"

);

}

};


if (isCreated) {

        return (

            <div

                style={{

                    minHeight: "100vh",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",

                    padding: "20px"

                }}

            >

                <div

                    style={{

                        background: "white",

                        borderRadius: "16px",

                        padding: "60px 40px",

                        textAlign: "center",

                        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",

                        maxWidth: "500px",

                        width: "100%"

                    }}

                >

                    <div

                        style={{

                            fontSize: "80px",

                            marginBottom: "20px",

                            color: "#28a745"

                        }}

                    >

                        ✓

                    </div>


                    <h1

                        style={{

                            fontSize: "36px",

                            fontWeight: "bold",

                            color: "#1a1a1a",

                            marginBottom: "10px",

                            margin: 0

                        }}

                    >

                        Form Created!

                    </h1>


                    <p

                        style={{

                            fontSize: "18px",

                            color: "#666",

                            marginTop: "15px",

                            marginBottom: "30px",

                            lineHeight: 1.6

                        }}

                    >

                        Your form <strong>"{title}"</strong> has been created successfully!

                    </p>


                    <button

                        onClick={() => navigate("/dashboard")}

                        style={{

                            padding: "12px 30px",

                            background: "#2575fc",

                            color: "white",

                            border: "none",

                            borderRadius: "8px",

                            fontSize: "16px",

                            fontWeight: "500",

                            cursor: "pointer",

                            transition: "background 0.3s ease"

                        }}

                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = "#1a5bb8"}

                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = "#2575fc"}

                    >

                        Go to Dashboard

                    </button>


                    <p

                        style={{

                            fontSize: "14px",

                            color: "#999",

                            marginTop: "20px",

                            marginBottom: 0

                        }}

                    >

                        You can now share, edit, and view responses for your form.

                    </p>

                </div>

            </div>

        );

    }


    return(

<div style={containerStyle}>

<div style={headerStyle}>

<h1 style={pageTitle}>Create New Form</h1>

<p style={pageSubtitle}>Build your form step by step</p>

</div>


<div style={formContainerStyle}>

<div style={formInputGroupStyle}>

<label style={labelStyle}>Form Title</label>

<input

type="text"

placeholder="e.g. Customer Feedback"

value={title}

onChange={(e)=>{ setTitle(e.target.value) }}

style={inputStyle}

/>

</div>


<div style={formInputGroupStyle}>

<label style={labelStyle}>Description</label>

<textarea

placeholder="Describe your form..."

value={description}

onChange={(e)=>{ setDescription(e.target.value) }}

style={{...inputStyle, height:"100px", resize: "vertical" as const}}

/>

</div>


<div style={fieldsContainerStyle}>

<h2 style={sectionTitleStyle}>Form Fields</h2>

<p style={sectionSubtitleStyle}>{fields.length} field(s) added</p>


{fields.map((field,index)=>(

<div key={index} style={fieldCardStyle}>

<div style={fieldHeaderStyle}>

<span style={fieldNumberStyle}>Field {index + 1}</span>

</div>

<div style={fieldInputsStyle}>

<div style={halfWidthStyle}>

<label style={labelStyle}>Field Label</label>

<input

type="text"

placeholder="e.g. Email Address"

value={field.label}

onChange={(e)=>

handleFieldChange(index, "label", e.target.value)

}

style={inputStyle}

/>

</div>


<div style={halfWidthStyle}>

<label style={labelStyle}>Field Type</label>

<select

value={field.type}

onChange={(e)=>

handleFieldChange(index, "type", e.target.value)

}

style={inputStyle}

>

<option value="text">Text</option>

<option value="email">Email</option>

<option value="number">Number</option>

<option value="textarea">Textarea</option>

<option value="select">Select</option>

<option value="checkbox">Checkbox</option>

<option value="radio">Radio</option>

<option value="file">File Upload</option>

</select>

</div>

</div>

</div>

))}


<button

onClick={addField}

style={addFieldButtonStyle}

onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = "#f0f0f0"}

onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = "#f5f5f5"}

>

+ Add Field

</button>

</div>


<div style={actionButtonsStyle}>

<button

onClick={saveForm}

style={primaryButtonStyle}

onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = "#1a5bb8"}

onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = "#2575fc"}

>

Create Form

</button>

</div>

</div>

</div>

);

}


const containerStyle = {

minHeight: "100vh",

background: "#f8f9fa",

padding: "40px 30px"

};

const headerStyle = {

marginBottom: "40px"

};

const pageTitle = {

fontSize: "32px",

fontWeight: "bold",

color: "#1a1a1a",

margin: "0 0 8px 0"

};

const pageSubtitle = {

fontSize: "14px",

color: "#666",

margin: 0

};

const formContainerStyle = {

maxWidth: "700px",

background: "white",

borderRadius: "12px",

padding: "30px",

boxShadow: "0 2px 8px rgba(0,0,0,0.05)"

};

const formInputGroupStyle = {

marginBottom: "25px"

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

fontFamily: "inherit",

transition: "all 0.3s ease"

};

const fieldsContainerStyle = {

marginBottom: "30px"

};

const sectionTitleStyle = {

fontSize: "18px",

fontWeight: "600",

color: "#1a1a1a",

margin: "0 0 8px 0"

};

const sectionSubtitleStyle = {

fontSize: "13px",

color: "#666",

margin: "0 0 20px 0"

};

const fieldCardStyle = {

background: "#f8f9fa",

border: "1px solid #e0e0e0",

borderRadius: "8px",

padding: "15px",

marginBottom: "15px"

};

const fieldHeaderStyle = {

marginBottom: "12px"

};

const fieldNumberStyle = {

fontSize: "12px",

fontWeight: "600",

color: "#2575fc",

textTransform: "uppercase" as const

};

const fieldInputsStyle = {

display: "flex",

gap: "15px"

};

const halfWidthStyle = {

flex: 1

};

const addFieldButtonStyle = {

width: "100%",

padding: "12px",

marginTop: "10px",

background: "#f5f5f5",

color: "#666",

border: "1px dashed #ddd",

borderRadius: "8px",

cursor: "pointer",

fontWeight: "500",

fontSize: "14px",

transition: "all 0.3s ease"

};

const actionButtonsStyle = {

display: "flex",

gap: "10px",

marginTop: "30px"

};

const primaryButtonStyle = {

flex: 1,

padding: "12px",

background: "#2575fc",

color: "white",

border: "none",

borderRadius: "8px",

cursor: "pointer",

fontWeight: "600",

fontSize: "15px",

transition: "all 0.3s ease"

};


export default CreateForm;