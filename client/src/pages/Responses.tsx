import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";


function Responses(){

const { id } = useParams();

const [responses,setResponses]=useState([]);

const [loading,setLoading]=useState(true);


useEffect(()=>{

fetchResponses();

},[]);


const fetchResponses=async()=>{

try{

const res=

await API.get(

`/responses/${id}`

);

setResponses(

res.data

);

}

catch(error){

console.log(error);

}

finally{

setLoading(false);

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

Responses

</h1>


{

loading ?

(

<p>

Loading...

</p>

)

:

responses.length===0 ?

(

<p>

No Responses Yet

</p>

)

:

responses.map((response:any,index)=>(

<div

key={index}

style={{

background:"white",

padding:"20px",

marginTop:"20px",

borderRadius:"10px",

boxShadow:

"0 0 10px rgba(0,0,0,0.1)"

}}

>

<h3>

Submission {index+1}

</h3>


{

Object.entries(

response.answers

).map(

([key,value]:any)=>(

<p key={key}>

<b>

{key}

</b>

:

{" "}

{value}

</p>

)

)

}

</div>

))

}

</div>

);

}

export default Responses;