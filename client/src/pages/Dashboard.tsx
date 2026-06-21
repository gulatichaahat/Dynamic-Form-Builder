import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [forms, setForms] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchForms();

    }, []);


    const fetchForms = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get(

                "/forms",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setForms(res.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };


    const deleteForm = async (id: string) => {

        try {

            const token = localStorage.getItem("token");

            await API.delete(

                `/forms/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            alert("Form Deleted");

            fetchForms();

        }

        catch (error) {

            console.log(error);

            alert("Delete Failed");

        }

    };


    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };


    return (

        <div

            style={{

                minHeight: "100vh",

                background: "#f8f9fa",

                padding: "40px 30px"

            }}

        >

            <div

                style={{

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center"

                }}

            >

                <h1

                    style={{

                        fontSize: "40px",

                        color: "#2575fc",

                        fontWeight: "bold"

                    }}

                >

                    🚀 Dynamic Form Builder

                </h1>


                <button

                    onClick={logout}

                    style={{

                        padding: "12px 20px",

                        background: "#ff4d4d",

                        color: "white",

                        border: "none",

                        borderRadius: "10px",

                        cursor: "pointer"

                    }}

                >

                    Logout

                </button>

            </div>


            <div

                style={{

                    background: "white",

                    padding: "25px",

                    marginTop: "25px",

                    borderRadius: "20px",

                    boxShadow:

                        "0 4px 15px rgba(0,0,0,0.1)"

                }}

            >

                <h2>

                    👋 Welcome Back!

                </h2>

                <p>

                    Create, edit and analyze forms easily.

                </p>

            </div>


            <div

                style={{

                    display: "flex",

                    gap: "20px",

                    marginTop: "30px"

                }}

            >

                <div style={cardStyle}>

                    <h3>Total Forms</h3>

                    <h1>{forms.length}</h1>

                </div>


                <div style={cardStyle}>

                    <h3>Total Responses</h3>

                    <h1>

                        {

                            forms.reduce(

                                (sum: number, form: any) =>

                                    sum +

                                    (

                                        form.totalSubmissions

                                        ||

                                        0

                                    ),

                                0

                            )

                        }

                    </h1>

                </div>

            </div>


            <button

                onClick={() =>

                    navigate("/create-form")

                }

                style={{

                    marginTop: "30px",

                    padding: "15px",

                    width: "250px",

                    background: "#2575fc",

                    color: "white",

                    border: "none",

                    borderRadius: "12px",

                    cursor: "pointer",

                    fontSize: "18px",

                    fontWeight: "bold"

                }}

            >

                ➕ Create New Form

            </button>


            <h2

                style={{

                    marginTop: "50px"

                }}

            >

                My Forms

            </h2>


            {

                loading

                ?

                (

                    <p>

                        Loading...

                    </p>

                )

                :

                forms.length === 0

                ?

                (

                    <p>

                        No Forms Created Yet

                    </p>

                )

                :

                forms.map(

                    (form: any) => (

                        <div

                            key={form._id}

                            style={{

                                background:

                                    "white",

                                padding:

                                    "25px",

                                marginTop:

                                    "20px",

                                width:

                                    "700px",

                                borderRadius:

                                    "15px",

                                boxShadow:

                                    "0 0 15px rgba(0,0,0,0.1)",

                                transition:

                                    "0.3s"

                            }}

                        >

                            <h2>

                                {form.title}

                            </h2>


                            <p>

                                ID:

                                {" "}

                                {form._id}

                            </p>


                            <p>

                                {

                                    form.description

                                }

                            </p>


                            <div

                                style={{

                                    display:

                                        "flex",

                                    gap:

                                        "10px",

                                    marginTop:

                                        "20px",

                                    flexWrap:

                                        "wrap"

                                }}

                            >

                                <button

                                    onClick={() => {

                                        navigator

                                        .clipboard

                                        .writeText(

                                            `${window.location.origin}/form/${form._id}`

                                        );

                                        alert(

                                            "Link Copied"

                                        );

                                    }}

                                    style={buttonStyle}

                                >

                                    Copy Link

                                </button>


                                <button

                                    onClick={() =>

                                        navigate(

                                            `/responses/${form._id}`

                                        )

                                    }

                                    style={buttonStyle}

                                >

                                    Responses

                                </button>


                                <button

                                    onClick={() =>

                                        navigate(

                                            `/analytics/${form._id}`

                                        )

                                    }

                                    style={buttonStyle}

                                >

                                    Analytics

                                </button>


                                <button

                                    onClick={() =>

                                        navigate(

                                            `/edit-form/${form._id}`

                                        )

                                    }

                                    style={buttonStyle}

                                >

                                    Edit

                                </button>


                                <button

                                    onClick={() =>

                                        deleteForm(

                                            form._id

                                        )

                                    }

                                    style={{

                                        ...buttonStyle,

                                        background:

                                            "#ff4d4d"

                                    }}

                                >

                                    Delete

                                </button>

                            </div>

                        </div>

                    )

                )

            }

        </div>

    );

}


const cardStyle = {

    background:

        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",

    padding: "30px 25px",

    borderRadius: "16px",

    boxShadow:

        "0 8px 20px rgba(0,0,0,0.1)",

    color: "white",

    textAlign: "center" as const,

    flex: 1,

    minWidth: "200px"

};


const buttonStyle = {

    background: "#2575fc",

    color: "white",

    border: "none",

    padding: "10px 16px",

    borderRadius: "8px",

    cursor: "pointer",

    fontWeight: "500",

    fontSize: "13px",

    transition: "all 0.3s ease"

};

export default Dashboard;