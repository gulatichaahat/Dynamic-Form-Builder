import React, { useState } from "react";

import {

    DragDropContext,

    Droppable,

    Draggable

}

from "@hello-pangea/dnd";


export default function FormBuilder() {

    const [fields,setFields]=useState([

        {

            id:"1",

            label:"Name"

        },

        {

            id:"2",

            label:"Email"

        },

        {

            id:"3",

            label:"Feedback"

        }

    ]);


    const handleDrag=(result)=>{

        if(!result.destination) return;

        const items=[...fields];

        const [reordered]=items.splice(

            result.source.index,

            1

        );

        items.splice(

            result.destination.index,

            0,

            reordered

        );

        setFields(items);

    };


    return(

        <DragDropContext

            onDragEnd={handleDrag}

        >

            <Droppable

                droppableId="fields"

            >

                {(provided)=>(

                    <div

                    ref={provided.innerRef}

                    {...provided.droppableProps}

                    >

                    {

                        fields.map(

                            (field,index)=>(

                            <Draggable

                                key={field.id}

                                draggableId={field.id}

                                index={index}

                            >

                            {(provided)=>(

                                <div

                                ref={provided.innerRef}

                                {...provided.draggableProps}

                                {...provided.dragHandleProps}

                                style={{

                                    padding:"20px",

                                    margin:"10px",

                                    border:"1px solid #ccc",

                                    borderRadius:"10px",

                                    background:"#f5f5f5",

                                    ...provided.draggableProps.style

                                }}

                                >

                                {field.label}

                                </div>

                            )}

                            </Draggable>

                            )

                        )

                    }

                    {provided.placeholder}

                    </div>

                )}

            </Droppable>

        </DragDropContext>

    );

}