import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";


function EditForm() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [fields, setFields] = useState<any[]>([]);

    const [isUpdated, setIsUpdated] = useState(false);


    useEffect(() => {

        fetchForm();

    }, []);


    const fetchForm = async () => {

        try {

            const res = await API.get(

                `/forms/${id}`

            );

            setTitle(

                res.data.title

            );

            setDescription(

                res.data.description

            );

            setFields(

                res.data.fields

            );

        }

        catch (error) {

            console.log(error);

        }

    };


    const addField = () => {

        setFields([

            ...fields,

            {

                label: "",

                type: "text",

                required: false,

                options: []

            }

        ]);

    };


    const deleteField = (index: number) => {

        setFields(

            fields.filter(

                (_, i) => i !== index

            )

        );

    };


    const updateField = (

        index: number,

        key: string,

        value: any

    ) => {

        const updated = [

            ...fields

        ];

        updated[index][key] = value;

        setFields(updated);

    };


    const updateForm = async () => {

        try {

            const token =

                localStorage.getItem("token");

            await API.put(

                `/forms/${id}`,

                {

                    title,

                    description,

                    fields

                },

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

            alert(

                "Form Updated"

            );

            setIsUpdated(true);

        }

        catch (error) {

            console.log(error);

            alert(

                "Update Failed"

            );

        }

    };


    if (isUpdated) {

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

                        Form Updated!

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

                        Your form <strong>"{title}"</strong> has been updated successfully!

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

                        Back to Dashboard

                    </button>

                </div>

            </div>

        );

    }


    return (

        <div

            style={{

                minHeight: "100vh",

                background: "#f8f9fa",

                padding: "40px 30px"

            }}

        >

            <h1

                style={{

                    fontSize: "32px",

                    fontWeight: "bold",

                    color: "#1a1a1a",

                    marginBottom: "8px"

                }}

            >

                Edit Form

            </h1>


            <p

                style={{

                    fontSize: "14px",

                    color: "#666",

                    marginBottom: "30px"

                }}

            >

                Update your form details

            </p>


            <div

                style={{

                    maxWidth: "700px",

                    background: "white",

                    borderRadius: "12px",

                    padding: "30px",

                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"

                }}

            >

                <input

                    value={title}

                    onChange={(e) =>

                        setTitle(

                            e.target.value

                        )

                    }

                    placeholder="Title"

                    style={inputStyle}

                />


            <br />

            <br />


            <textarea

                value={description}

                onChange={(e) =>

                    setDescription(

                        e.target.value

                    )

                }

                placeholder="Description"

                style={{

                    ...inputStyle,

                    height: "100px"

                }}

            />


            <br />

            <br />


            <h2>

                Fields

            </h2>


            {

                fields.map(

                    (field, index) => (

                        <div

                            key={index}

                            style={{

                                background: "#f5f5f5",

                                padding: "20px",

                                marginTop: "20px",

                                borderRadius: "10px",

                                width: "450px"

                            }}

                        >

                            <input

                                value={field.label}

                                placeholder="Field Label"

                                onChange={(e) =>

                                    updateField(

                                        index,

                                        "label",

                                        e.target.value

                                    )

                                }

                                style={inputStyle}

                            />


                            <br />

                            <br />


                            <select

                                value={field.type}

                                onChange={(e) =>

                                    updateField(

                                        index,

                                        "type",

                                        e.target.value

                                    )

                                }

                                style={inputStyle}

                            >

                                <option value="text">

                                    text

                                </option>

                                <option value="email">

                                    email

                                </option>

                                <option value="number">

                                    number

                                </option>

                                <option value="textarea">

                                    textarea

                                </option>

                                <option value="date">

                                    date

                                </option>

                                <option value="radio">

                                    radio

                                </option>

                                <option value="checkbox">

                                    checkbox

                                </option>

                                <option value="select">

                                    select

                                </option>

                            </select>


                            {

                                field.type === "radio"

                                ||

                                field.type === "checkbox"

                                ||

                                field.type === "select"

                                ?

                                (

                                    <>

                                        <br />

                                        <br />

                                        <input

                                            type="text"

                                            placeholder="Enter options separated by commas"

                                            value={

                                                field.options?.join(",")

                                                ||

                                                ""

                                            }

                                            onChange={(e) =>

                                                updateField(

                                                    index,

                                                    "options",

                                                    e.target.value

                                                    .split(",")

                                                    .map(

                                                        (opt: string) =>

                                                            opt.trim()

                                                    )

                                                )

                                            }

                                            style={inputStyle}

                                        />

                                    </>

                                )

                                :

                                null

                            }


                            <br />

                            <br />


                            <label>

                                <input

                                    type="checkbox"

                                    checked={field.required}

                                    onChange={(e) =>

                                        updateField(

                                            index,

                                            "required",

                                            e.target.checked

                                        )

                                    }

                                />

                                {" "}Required

                            </label>


                            <br />

                            <br />


                            <button

                                onClick={() =>

                                    deleteField(index)

                                }

                                style={{

                                    background: "#ff4d4d",

                                    color: "white",

                                    border: "none",

                                    padding: "10px",

                                    borderRadius: "8px",

                                    cursor: "pointer"

                                }}

                            >

                                Delete Field

                            </button>

                        </div>

                    )

                )

            }


            <br />


            <button

                onClick={addField}

                style={{

                    padding: "12px",

                    background: "#2575fc",

                    color: "white",

                    border: "none",

                    borderRadius: "8px",

                    cursor: "pointer",

                    marginRight: "20px"

                }}

            >

                + Add Field

            </button>


            <button

                onClick={updateForm}

                style={{

                    padding: "12px 20px",

                    background: "#28a745",

                    color: "white",

                    border: "none",

                    borderRadius: "8px",

                    cursor: "pointer"

                }}

            >

                Save Changes

            </button>

            </div>

        </div>

    );

}


const inputStyle = {

    width: "100%",

    padding: "12px 14px",

    fontSize: "14px",

    borderRadius: "8px",

    border: "1px solid #ddd",

    boxSizing: "border-box" as const,

    fontFamily: "inherit"

};


export default EditForm;