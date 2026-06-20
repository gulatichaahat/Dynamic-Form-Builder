import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

import {

BarChart,

Bar,

XAxis,

YAxis,

Tooltip,

PieChart,

Pie,

Cell,

ResponsiveContainer

}

from "recharts";


function Analytics(){

const { id } = useParams();

const [analytics,setAnalytics]=useState<any>(null);

const [loading,setLoading]=useState(true);


useEffect(()=>{

fetchAnalytics();

},[]);


const fetchAnalytics=async()=>{

try{

const token=

localStorage.getItem("token");

const res=

await API.get(

`/analytics/${id}`,

{

headers:{

Authorization:

`Bearer ${token}`

}

}

);

setAnalytics(

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


if(loading)

return <h1>Loading...</h1>;


if(!analytics)

return <h1>No Data</h1>;


const barData=[

{

name:"Responses",

count:

analytics.totalSubmissions || 0

}

];


const pieData=[

{

name:"Responses",

value:

analytics.totalSubmissions || 0

},

{

name:"Remaining",

value:

Math.max(

100-

(analytics.totalSubmissions||0),

0

)

}

];


return(

<div style={containerStyle}>

<div style={headerStyle}>

<h1 style={pageTitle}>📊 Analytics</h1>

<p style={pageSubtitle}>Track your form performance</p>

</div>


<div style={statsGridStyle}>

<div style={statsCard}>

<div style={statsLabelStyle}>Total Responses</div>

<div style={statsNumber}>

{analytics.totalSubmissions}

</div>

</div>

<div style={statsCard}>

<div style={statsLabelStyle}>Total Views</div>

<div style={statsNumber}>

{analytics.totalViews || 0}

</div>

</div>

<div style={statsCard}>

<div style={statsLabelStyle}>Completion Rate</div>

<div style={statsNumber}>

{analytics.totalViews ? Math.round((analytics.totalSubmissions / analytics.totalViews) * 100) : 0}%

</div>

</div>

</div>


<div style={chartsContainerStyle}>

<div style={chartWrapperStyle}>

<h3 style={chartTitleStyle}>Response Trend</h3>

<div style={chartBoxStyle}>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={barData}>

<XAxis dataKey="name" />

<YAxis/>

<Tooltip/>

<Bar dataKey="count" fill="#2575fc" />

</BarChart>

</ResponsiveContainer>

</div>

</div>


<div style={chartWrapperStyle}>

<h3 style={chartTitleStyle}>Response Distribution</h3>

<div style={chartBoxStyle}>

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie

data={pieData}

dataKey="value"

outerRadius={100}

label

>

<Cell fill="#2575fc"/>

<Cell fill="#e0e0e0"/>

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

</div>

</div>


<div style={responsesContainerStyle}>

<h2 style={sectionTitleStyle}>Recent Submissions</h2>

<p style={sectionSubtitleStyle}>{analytics.responses?.length || 0} response(s)</p>


{analytics.responses && analytics.responses.length > 0 ? (

<div style={responsesGridStyle}>

{analytics.responses.slice(0, 5).map((response:any,index:number)=>(

<div key={index} style={submissionCardStyle}>

<h4 style={submissionNumberStyle}>Submission #{index+1}</h4>

<div style={submissionContentStyle}>

{Object.entries(response.answers).map(([key,value]:any)=>(

<div key={key} style={submissionItemStyle}>

<span style={submissionKeyStyle}>{key}:</span>

<span style={submissionValueStyle}>

{Array.isArray(value) ? value.join(", ") : value}

</span>

</div>

))}

</div>

</div>

))}

</div>

) : (

<div style={emptyStyle}>

<p style={emptyTextStyle}>No submissions yet</p>

</div>

)}

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

const statsGridStyle = {

display: "grid",

gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",

gap: "20px",

marginBottom: "40px"

};

const statsCard = {

background: "white",

padding: "25px",

borderRadius: "12px",

boxShadow: "0 2px 8px rgba(0,0,0,0.05)",

textAlign: "center" as const

};

const statsLabelStyle = {

fontSize: "13px",

fontWeight: "500",

color: "#666",

marginBottom: "12px"

};

const statsNumber = {

fontSize: "32px",

fontWeight: "bold",

color: "#2575fc"

};

const chartsContainerStyle = {

display: "grid",

gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",

gap: "20px",

marginBottom: "40px"

};

const chartWrapperStyle = {

background: "white",

borderRadius: "12px",

padding: "20px",

boxShadow: "0 2px 8px rgba(0,0,0,0.05)"

};

const chartTitleStyle = {

fontSize: "16px",

fontWeight: "600",

color: "#1a1a1a",

marginBottom: "15px",

margin: "0 0 15px 0"

};

const chartBoxStyle = {

background: "#f8f9fa",

borderRadius: "8px",

padding: "10px"

};

const responsesContainerStyle = {

background: "white",

borderRadius: "12px",

padding: "25px",

boxShadow: "0 2px 8px rgba(0,0,0,0.05)"

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

const responsesGridStyle = {

display: "grid",

gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",

gap: "15px"

};

const submissionCardStyle = {

background: "#f8f9fa",

borderRadius: "8px",

padding: "15px",

border: "1px solid #e0e0e0"

};

const submissionNumberStyle = {

fontSize: "13px",

fontWeight: "600",

color: "#2575fc",

margin: "0 0 10px 0"

};

const submissionContentStyle = {

display: "flex",

flexDirection: "column" as const,

gap: "8px"

};

const submissionItemStyle = {

fontSize: "12px",

display: "flex",

flexWrap: "wrap" as const,

gap: "5px"

};

const submissionKeyStyle = {

fontWeight: "600",

color: "#333"

};

const submissionValueStyle = {

color: "#666"

};

const emptyStyle = {

textAlign: "center" as const,

padding: "40px",

backgroundColor: "#f8f9fa",

borderRadius: "8px"

};

const emptyTextStyle = {

color: "#999",

fontSize: "14px"

};


export default Analytics;