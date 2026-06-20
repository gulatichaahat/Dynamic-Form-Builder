import { useState } from "react";

import API from "../services/api";

function CreateForm(){

const [title,setTitle]=useState("");

const [description,setDescription]=useState("");

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


alert(

"Form Created Successfully"

);

}

catch(error:any){

console.log(error);

alert(

"Error creating form"

);

}

};


return(

<div

style={{

padding:"40px",

background:"#f5f5f5",

minHeight:"100vh"

}}

>

<h1>

Create Form

</h1>


<input

type="text"

placeholder="Form Title"

value={title}

onChange={(e)=>{

setTitle(

e.target.value

)

}}

style={inputStyle}

/>


<textarea

placeholder="Description"

value={description}

onChange={(e)=>{

setDescription(

e.target.value

)

}}

style={{

...inputStyle,

height:"100px"

}}

/>


<h2>

Fields

</h2>


{

fields.map(

(field,index)=>(

<div

key={index}

style={fieldCard}

>

<input

type="text"

placeholder="Field Label"

value={field.label}

onChange={(e)=>

handleFieldChange(

index,

"label",

e.target.value

)

}

style={inputStyle}

/>


<select

value={field.type}

onChange={(e)=>

handleFieldChange(

index,

"type",

e.target.value

)

}

style={inputStyle}

>

<option value="text">

Text

</option>

<option value="email">

Email

</option>

<option value="number">

Number

</option>

<option value="textarea">

Textarea

</option>

<option value="select">

Select

</option>

<option value="checkbox">

Checkbox

</option>

<option value="radio">

Radio

</option>

<option value="file">

File Upload

</option>

</select>

</div>

)

)

}


<button

onClick={addField}

style={buttonStyle}

>

+ Add Field

</button>


<button

onClick={saveForm}

style={{

...buttonStyle,

background:"#28a745"

}}

>

Save Form

</button>

</div>

);

}


const inputStyle={

display:"block",

width:"400px",

padding:"12px",

marginTop:"15px",

borderRadius:"8px",

border:"1px solid gray"

};


const fieldCard={

background:"white",

padding:"20px",

marginTop:"20px",

borderRadius:"10px",

width:"450px",

boxShadow:

"0 0 10px rgba(0,0,0,0.1)"

};


const buttonStyle={

padding:"12px 20px",

marginTop:"20px",

marginRight:"15px",

background:"#2575fc",

color:"white",

border:"none",

borderRadius:"8px",

cursor:"pointer"

};


export default CreateForm;