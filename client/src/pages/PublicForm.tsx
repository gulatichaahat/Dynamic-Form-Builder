import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";


function PublicForm() {

    const { id } = useParams();

    const [form, setForm] = useState<any>(null);

    const [responses, setResponses] = useState<any>({});


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

            alert(

                "Response Submitted"

            );

        }

        catch (error) {

            console.log(error);

            alert(

                "Submission Failed"

            );

        }

    };


    if (!form)

        return <h1>Loading...</h1>;


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

    width: "400px",

    padding: "12px",

    marginTop: "10px",

    borderRadius: "8px",

    border: "1px solid gray"

};


export default PublicForm;