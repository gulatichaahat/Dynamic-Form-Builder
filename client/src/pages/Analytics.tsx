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

<div

style={{

padding:"40px",

background:"#f5f5f5",

minHeight:"100vh"

}}

>

<h1>

📊 Analytics

</h1>


<div

style={{

display:"flex",

gap:"30px",

marginTop:"30px"

}}

>

<div style={cardStyle}>

<h3>

Total Responses

</h3>

<h1>

{

analytics.totalSubmissions

}

</h1>

</div>


<div style={cardStyle}>

<h3>

Total Views

</h3>

<h1>

{

analytics.totalViews || 0

}

</h1>

</div>

</div>


<h2

style={{

marginTop:"50px"

}}

>

Responses Bar Chart

</h2>


<div

style={{

background:"white",

padding:"20px",

borderRadius:"15px",

height:"300px",

marginTop:"20px"

}}

>

<ResponsiveContainer

width="100%"

height="100%"

>

<BarChart

data={barData}

>

<XAxis

dataKey="name"

/>

<YAxis/>

<Tooltip/>

<Bar

dataKey="count"

/>

</BarChart>

</ResponsiveContainer>

</div>


<h2

style={{

marginTop:"50px"

}}

>

Responses Pie Chart

</h2>


<div

style={{

background:"white",

padding:"20px",

borderRadius:"15px",

height:"350px",

marginTop:"20px"

}}

>

<ResponsiveContainer

width="100%"

height="100%"

>

<PieChart>

<Pie

data={pieData}

dataKey="value"

outerRadius={100}

label

>

<Cell/>

<Cell/>

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>


<h2

style={{

marginTop:"50px"

}}

>

Latest Responses

</h2>


{

analytics.responses?.map(

(response:any,index:number)=>(

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

{

Array.isArray(value)

?

value.join(", ")

:

value

}

</p>

)

)

}

</div>

)

)

}

</div>

);

}


const cardStyle={

background:"white",

padding:"30px",

width:"250px",

borderRadius:"15px",

boxShadow:

"0 0 15px rgba(0,0,0,0.1)"

};


export default Analytics;