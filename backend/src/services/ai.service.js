const {GoogleGenAI}=require("@google/genai")

const ai=new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
})

async function invokeGeminiAPI(){
    const response=await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:"Hello gemini ! explain what is interview"
    })

    console.log(response.text);
    
}

module.exports=invokeGeminiAPI