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

<div style={containerStyle}>

<div style={headerStyle}>

<h1 style={pageTitle}>📋 Form Responses</h1>

<p style={pageSubtitle}>View all submissions</p>

</div>


{loading ? (

<div style={loadingStyle}>

<p style={loadingTextStyle}>Loading responses...</p>

</div>

) : responses.length === 0 ? (

<div style={emptyStyle}>

<div style={emptyIconStyle}>📭</div>

<h3 style={emptyTitleStyle}>No responses yet</h3>

<p style={emptyTextStyle}>Responses will appear here once users submit your form</p>

</div>

) : (

<div style={responsesListStyle}>

<p style={responsesCountStyle}>{responses.length} response(s)</p>

{responses.map((response:any,index)=>(

<div key={index} style={responseCardStyle}>

<div style={responseHeaderStyle}>

<h3 style={responseNumberStyle}>Submission #{index+1}</h3>

<span style={responseTimeStyle}>

{new Date(response.createdAt).toLocaleDateString()}

</span>

</div>


<div style={responseContentStyle}>

{Object.entries(response.answers).map(([key,value]:any)=>(

<div key={key} style={answerItemStyle}>

<label style={answerLabelStyle}>{key}</label>

<p style={answerValueStyle}>

{Array.isArray(value) ? value.join(", ") : value}

</p>

</div>

))}

</div>

</div>

))}

</div>

)}

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

const loadingStyle = {

textAlign: "center" as const,

padding: "60px 20px"

};

const loadingTextStyle = {

fontSize: "14px",

color: "#666"

};

const emptyStyle = {

background: "white",

borderRadius: "12px",

padding: "60px 40px",

textAlign: "center" as const,

boxShadow: "0 2px 8px rgba(0,0,0,0.05)"

};

const emptyIconStyle = {

fontSize: "48px",

marginBottom: "20px"

};

const emptyTitleStyle = {

fontSize: "20px",

fontWeight: "600",

color: "#1a1a1a",

marginBottom: "8px"

};

const emptyTextStyle = {

color: "#666"

};

const responsesListStyle = {

maxWidth: "800px"

};

const responsesCountStyle = {

fontSize: "14px",

fontWeight: "500",

color: "#666",

marginBottom: "20px"

};

const responseCardStyle = {

background: "white",

borderRadius: "12px",

padding: "20px",

marginBottom: "15px",

boxShadow: "0 2px 8px rgba(0,0,0,0.05)"

};

const responseHeaderStyle = {

display: "flex",

justifyContent: "space-between",

alignItems: "center",

marginBottom: "15px",

paddingBottom: "15px",

borderBottom: "1px solid #f0f0f0"

};

const responseNumberStyle = {

fontSize: "16px",

fontWeight: "600",

color: "#1a1a1a",

margin: 0

};

const responseTimeStyle = {

fontSize: "12px",

color: "#999"

};

const responseContentStyle = {

display: "grid",

gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",

gap: "15px"

};

const answerItemStyle = {

backgroundColor: "#f8f9fa",

padding: "12px",

borderRadius: "8px"

};

const answerLabelStyle = {

fontSize: "12px",

fontWeight: "600",

color: "#2575fc",

textTransform: "uppercase" as const,

margin: "0 0 4px 0"

};

const answerValueStyle = {

fontSize: "13px",

color: "#333",

margin: 0,

lineHeight: "1.5"

};


export default Responses;