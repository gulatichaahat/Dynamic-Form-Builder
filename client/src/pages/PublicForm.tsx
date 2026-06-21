import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";


function PublicForm() {

    const { id } = useParams();

    const [form, setForm] = useState<any>(null);

    const [responses, setResponses] = useState<any>({});

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [error, setError] = useState<string | null>(null);


    useEffect(() => {

        fetchForm();

    }, []);


    const fetchForm = async () => {

        try {

            const res = await API.get(

                `/forms/${id}`

            );

            setForm(

                res.data

            );

        }

        catch (error) {

            console.log(error);

            setError("Form not found");

        }

    };


    const handleChange = (

        label: string,

        value: any

    ) => {

        setResponses({

            ...responses,

            [label]: value

        });

    };


    const handleCheckboxChange = (

        label: string,

        option: string,

        checked: boolean

    ) => {

        const current = responses[label] || [];

        let updated;

        if (checked) {

            updated = [

                ...current,

                option

            ];

        }

        else {

            updated = current.filter(

                (item: string) =>

                    item !== option

            );

        }

        setResponses({

            ...responses,

            [label]: updated

        });

    };


    const submitResponse = async () => {

        try {

            await API.post(

                `/responses/${id}`,

                responses

            );

            setIsSubmitted(true);

        }

        catch (error) {

            console.log(error);

            alert(

                "Submission Failed"

            );

        }

    };


    if (error)

        return <div style={{padding: "20px", textAlign: "center"}}><h1>❌ {error}</h1><p>The form link is invalid or the form has been deleted.</p></div>;

    
    if (!form)

        return <h1>Loading...</h1>;

    
    if (isSubmitted) {

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

                        Thank You!

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

                        Your response to <strong>"{form.title}"</strong> has been submitted successfully.

                    </p>


                    <p

                        style={{

                            fontSize: "14px",

                            color: "#999",

                            marginBottom: 0

                        }}

                    >

                        We appreciate your feedback!

                    </p>

                </div>

            </div>

        );

    }


    return (

        <div

            style={{

                padding: "40px",

                minHeight: "100vh",

                background: "#f5f5f5"

            }}

        >

            <h1>

                {form.title}

            </h1>


            <p>

                {form.description}

            </p>


            {

                form.fields.map(

                    (

                        field: any,

                        index: number

                    ) => (

                        <div

                            key={index}

                            style={{

                                marginTop: "25px"

                            }}

                        >

                            <label

                                style={{

                                    fontWeight: "bold"

                                }}

                            >

                                {field.label}

                                {

                                    field.required

                                    ?

                                    " *"

                                    :

                                    ""

                                }

                            </label>


                            <br />


                            {

                                field.type === "textarea"

                                ?

                                (

                                    <textarea

                                        onChange={(e) =>

                                            handleChange(

                                                field.label,

                                                e.target.value

                                            )

                                        }

                                        style={inputStyle}

                                    />

                                )

                                :

                                field.type === "radio"

                                ?

                                (

                                    field.options.map(

                                        (

                                            option: string,

                                            i: number

                                        ) => (

                                            <div

                                                key={i}

                                            >

                                                <input

                                                    type="radio"

                                                    name={field.label}

                                                    value={option}

                                                    onChange={(e) =>

                                                        handleChange(

                                                            field.label,

                                                            e.target.value

                                                        )

                                                    }

                                                />

                                                {" "}

                                                {option}

                                            </div>

                                        )

                                    )

                                )

                                :

                                field.type === "checkbox"

                                ?

                                (

                                    field.options.map(

                                        (

                                            option: string,

                                            i: number

                                        ) => (

                                            <div

                                                key={i}

                                            >

                                                <input

                                                    type="checkbox"

                                                    value={option}

                                                    onChange={(e) =>

                                                        handleCheckboxChange(

                                                            field.label,

                                                            option,

                                                            e.target.checked

                                                        )

                                                    }

                                                />

                                                {" "}

                                                {option}

                                            </div>

                                        )

                                    )

                                )

                                :

                                field.type === "select"

                                ?

                                (

                                    <select

                                        style={inputStyle}

                                        onChange={(e) =>

                                            handleChange(

                                                field.label,

                                                e.target.value

                                            )

                                        }

                                    >

                                        <option>

                                            Select Option

                                        </option>

                                        {

                                            field.options.map(

                                                (

                                                    option: string,

                                                    i: number

                                                ) => (

                                                    <option

                                                        key={i}

                                                        value={option}

                                                    >

                                                        {option}

                                                    </option>

                                                )

                                            )

                                        }

                                    </select>

                                )

                                :

                                (

                                    <input

                                        type={

                                            field.type

                                        }

                                        onChange={(e) =>

                                            handleChange(

                                                field.label,

                                                e.target.value

                                            )

                                        }

                                        style={inputStyle}

                                    />

                                )

                            }

                        </div>

                    )

                )

            }


            <button

                onClick={submitResponse}

                style={{

                    marginTop: "40px",

                    padding: "12px 20px",

                    background: "#2575fc",

                    color: "white",

                    border: "none",

                    borderRadius: "8px",

                    cursor: "pointer"

                }}

            >

                Submit

            </button>

        </div>

    );

}


const inputStyle = {

    width: "100%",

    padding: "10px 12px",

    fontSize: "14px",

    borderRadius: "6px",

    border: "1px solid #ddd",

    boxSizing: "border-box" as const,

    fontFamily: "inherit"

};


export default PublicForm;