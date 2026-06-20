import {

BrowserRouter,

Routes,

Route

}

from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import CreateForm from "./pages/CreateForm";

import PublicForm from "./pages/PublicForm";

import Responses from "./pages/Responses";

import Analytics from "./pages/Analytics";

import EditForm from "./pages/EditForm";


function App() {

return (

<BrowserRouter>

<Routes>

<Route

path="/"

element={<Login/>}

/>

<Route

path="/register"

element={<Register/>}

/>

<Route

path="/dashboard"

element={<Dashboard/>}

/>

<Route

path="/create-form"

element={<CreateForm/>}

/>

<Route

path="/form/:id"

element={<PublicForm/>}

/>

<Route

path="/responses/:id"

element={<Responses/>}

/>

<Route

path="/analytics/:id"

element={<Analytics/>}

/>

<Route

path="/edit-form/:id"

element={<EditForm/>}

/>

</Routes>

</BrowserRouter>

);

}

export default App;