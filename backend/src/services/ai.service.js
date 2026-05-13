const {GoogleGenAI}=require("@google/genai")
const {z, json}=require("zod")
const{zodToJsonSchema}=require("zod-to-json-schema")

const ai=new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
})

const interviewReportSchema=z.object({

    matchScore:z.number().describe("The match score between the candidate and the job description, this score is calculated based on the analysis of the resume,self-description and job description, it indicates how well the candidate's skills,experience and qualifications align with the requirements of the job"),

    technicalQuestions:z.array(z.object({
        question:z.string().describe("The technical questions that can be asked in the interview"),
        intention:z.string().describe("The intention of the interviewer behind asking the question"),
        answer:z.string().describe("How to answer the question,what points to cover in the answer,what approach to take while answering the question")
    })).describe("Technical questions that can be asked in the interview,these questions are asked to assess the candidate's technical skills,knowledge and problem-solving abilities"),
    
    behavioralQuestions:z.array(z.object({
        question:z.string().describe("The behavioral questions that can be asked in the interview"),
        intention:z.string().describe("The intention of the interviewer behind asking the question"),
        answer:z.string().describe("How to answer the question,what points to cover in the answer,what approach to take while answering the question")
    })).describe("Behavioral questions that can be asked in the interview,these questions are asked to assess the candidate's soft skills,attitude,work ethic,teamwork and cultural fit"),

    skillGaps:z.array(z.object({
        skill:z.string().describe("The skill that the candidate is lacking based on the resume,self-description and job description"),
        severity:z.enum(["low","medium","high"]).describe("The severity of the skill gap,how important it is for the candidate to improve on this skill"),
    })).describe("The skill gaps that the candidate has based on the resume,self-description and job description,these skill gaps are the areas where the candidate needs to improve in order to be a strong fit for the job"),

    preparationPlan:z.array(z.object({
        day:z.string().describe("The day in the preparation plan starting from day 1 "),
        focus:z.string().describe("The focus of the preparation for that day,what topics to cover,what resources to use,what practice exercises to do"),
        tasks:z.array(z.string()).describe("The specific tasks to be completed on that day,these tasks should be actionable and measurable,they should help the candidate make progress towards improving their skills and preparing for the interview")
    })).describe("a day wise preparation plan for the candidate to follow in order to prepare for the interview,these plans are designed to help the candidate improve their skills,fill their skill gaps and increase their chances of success in the interview")

})

async function generateInterviewReport(resume,selfDescription,jobDescription){

    const prompt=`Generate an interview report for a candidate based on the following information: Resume:${resume},Self-Description:${selfDescription},Job-Description:${jobDescription}`

    const response=await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema:zodToJsonSchema(interviewReportSchema)
        }
    })

    return JSON.parse(response.text);
    
}

module.exports= generateInterviewReport