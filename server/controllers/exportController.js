const Response = require("../models/Response");

const ExcelJS = require("exceljs");

const { Parser } = require("json2csv");


// CSV Export

const exportCSV = async (req,res)=>{

    try{

        const responses = await Response.find({

            formId:req.params.id

        });

        const data = responses.map(r=>r.answers);

        const parser = new Parser();

        const csv = parser.parse(data);

        res.header(

            "Content-Type",

            "text/csv"

        );

        res.attachment(

            "responses.csv"

        );

        return res.send(csv);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};


// Excel Export

const exportExcel = async(req,res)=>{

    try{

        const responses = await Response.find({

            formId:req.params.id

        });

        const workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet(

            "Responses"

        );

        if(responses.length>0){

            worksheet.columns = Object.keys(

                responses[0].answers

            )

            .map(key=>({

                header:key,

                key:key

            }));

        }

        responses.forEach(response=>{

            worksheet.addRow(

                response.answers

            );

        });

        res.setHeader(

            "Content-Type",

            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        );

        res.setHeader(

            "Content-Disposition",

            "attachment; filename=responses.xlsx"

        );

        await workbook.xlsx.write(res);

        res.end();

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};


module.exports={

exportCSV,

exportExcel

};