const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");
const googleapi=require("@google/genai")
const { LocalStorage } = require("node-localstorage");
const bcrypt = require('bcryptjs');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const ai=new googleapi.GoogleGenAI({
  apiKey:"gemini AI API KEY ",
})
const localStorage = new LocalStorage("./scratch");;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/generator/:Branch",async (req,res)=>{
  const branch=req.params.Branch;
  try{
  const r=await ai.models.generateContent(
    {
      model:"gemini-2.5-flash-lite",
      contents:[
        {
          parts:[
            {
              text:`You are an expert career mentor. Generate a very-very-beginner-friendly and easy roadmap for the given engineering stream.
The roadmap must include 4 to 5 main topics, and each main topic must contain 5 beginner-friendly subtopics that a student should learn in sequence.

Design each subtopic to be specific, clearly defined, and suitable for creating quizzes (e.g., concept-based, term-based, or skill-based topics).

Additionally, provide a reliable website link for each main topic where a student can learn more about it.

Output strictly in valid JSON format only, without any explanation or text.

JSON structure:
{
"stream": "<name of the engineering stream>",
"roadmap": [
{
"main_topic": "<main topic name>",
"link": "<website link for the main topic>",
"subtopics": ["<specific, quiz-ready subtopic1>", "<specific, quiz-ready subtopic2>", "<specific, quiz-ready subtopic3>", "<specific, quiz-ready subtopic4>", "<specific, quiz-ready subtopic5>"]
},
...
]
}

Now generate the roadmap for: ${branch}`
            }
          ]
        }
      ],
    }
  )
  console.log(r.candidates[0].content.parts[0].text)
let data=await r.candidates[0].content.parts[0].text
data=data.replace("```json","")
data=data.replace("```","")
data=data.trim()

let finaldata=JSON.parse(data)
    
  console.log(data)
  res.json({"response":finaldata})
}
catch(error)
{   console.error('Error calling Gemini API', error);
  res.json({"error is ":error});
}

})


app.post('/predict', (req, res) => {
  const select =req.body.select; 
  const rank=req.body.rank;
  exec(`python src/Predictor.py "${select}" ${rank} `, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: "Python script error" });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    res.json({ result: stdout.trim() });
  });
});



const pool = new Pool({
  host: "db.gvredvpsueoopazmxtkk.supabase.co",
  port: 5432,
  user: "postgres",
  database: "postgres",
  password: "Supabase password here", 
  ssl: { rejectUnauthorized: false }
});

app.post("/storeuser",async(req,res)=>{
try{
let N=req.body.Name;
let e=req.body.email;
let p=req.body.pass;
let hp=await bcrypt.hash(p,5);
let result=await pool.query( `INSERT INTO testing (uname, umail, pass)
   VALUES ($1, $2, $3)
   RETURNING *;`,[N,e,hp])

res.json(result.rows[0]);

}catch(err)
{
  res.json({"error":err})
}
})

app.post("/getuser",async(req,res)=>{
  const {mail,pass}=req.body;
  let result=await pool.query("SELECT * FROM testing WHERE umail=$1 ;",[mail])
  if(result.rows.length===0)
   return res.json({ error: true, description: "User not found" })
  let match=await bcrypt.compare(pass,result.rows[0]["pass"])
    if(match===true)
      res.json({"error":false,"uname":result.rows[0].uname,"result":match})
    else
      res.json({"error":true,"description":"Password is incorrect"});
})



app.listen(5000);
