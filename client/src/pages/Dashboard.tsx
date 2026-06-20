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

                                            `http://localhost:5173/form/${form._id}`

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


const containerStyle = {

    minHeight: "100vh",

    background: "#f8f9fa",

    padding: "40px 30px"

};

const headerStyle = {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: "40px"

};

const titleStyle = {

    fontSize: "32px",

    fontWeight: "bold",

    color: "#1a1a1a",

    margin: "0 0 8px 0"

};

const subtitleStyle = {

    fontSize: "14px",

    color: "#666",

    margin: 0

};

const logoutButtonStyle = {

    padding: "10px 20px",

    background: "#ff5252",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer",

    fontWeight: "500",

    transition: "all 0.3s ease"

};

const statsContainerStyle = {

    display: "flex",

    gap: "20px",

    marginBottom: "40px"

};

const statCardStyle = {

    flex: 1,

    background: "white",

    padding: "25px",

    borderRadius: "12px",

    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",

    textAlign: "center" as const

};

const statNumberStyle = {

    fontSize: "28px",

    fontWeight: "bold",

    color: "#2575fc",

    margin: "0 0 8px 0"

};

const statLabelStyle = {

    fontSize: "13px",

    color: "#666"

};

const createButtonStyle = {

    padding: "12px 24px",

    background: "#2575fc",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer",

    fontWeight: "600",

    fontSize: "14px",

    marginBottom: "40px",

    transition: "all 0.3s ease"

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

    color: "#666",

    marginBottom: "30px"

};

const formsGridStyle = {

    display: "grid",

    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",

    gap: "20px"

};

const formCardStyle = {

    background: "white",

    borderRadius: "12px",

    padding: "20px",

    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",

    transition: "all 0.3s ease",

    cursor: "pointer"

};

const formHeaderStyle = {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "start",

    marginBottom: "12px"

};

const formTitleStyle = {

    margin: 0,

    fontSize: "16px",

    fontWeight: "600",

    color: "#1a1a1a",

    flex: 1

};

const responseBadgeStyle = {

    background: "#e3f2fd",

    color: "#2575fc",

    padding: "4px 12px",

    borderRadius: "20px",

    fontSize: "12px",

    fontWeight: "500",

    whiteSpace: "nowrap" as const,

    marginLeft: "10px"

};

const formDescriptionStyle = {

    fontSize: "13px",

    color: "#666",

    margin: "0 0 12px 0",

    lineHeight: "1.5"

};

const formMetaStyle = {

    fontSize: "12px",

    color: "#999",

    margin: "0 0 15px 0"

};

const actionButtonsStyle = {

    display: "flex",

    gap: "8px",

    flexWrap: "wrap" as const

};

const actionButtonStyle = {

    flex: "1 1 auto",

    minWidth: "80px",

    padding: "8px 12px",

    background: "white",

    color: "#2575fc",

    border: "1px solid #2575fc",

    borderRadius: "6px",

    cursor: "pointer",

    fontWeight: "500",

    fontSize: "12px",

    transition: "all 0.3s ease"

};


export default Dashboard;