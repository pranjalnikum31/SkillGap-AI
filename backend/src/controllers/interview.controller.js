const pdfParse=require("pdf-parse")
const generateInterviewReport=require("../services/ai.service")
const interviewReportModel=require("../models/interviewReport.model")

async function generateInterviewReportController(req,res){
    const resumeFile=req.file

    if (!req.file) {
        return res.status(400).json({
            message: "Resume file is required"
        })
    }

    const resumeContent=await (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText
    const{selfDescription,jobDescription}=req.body

    const interviewreportByAI=await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
    })

    const interviewreport =await interviewReportModel.create({
        user:req.user.id,
        report:resumeContent.text,
        selfDescription,
        jobDescription ,
        ...interviewreportByAI
    }) 

    res.status(200).json({
        message:"Interview report generated successfully",
        interviewreport
    })
}


module.exports= {generateInterviewReportController}