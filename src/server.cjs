const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");
const googleapi=require("@google/genai")
const { LocalStorage } = require("node-localstorage");
const bcrypt = require('bcryptjs');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const ai=new googleapi.GoogleGenAI({
  apiKey:"AIzaSyC6kJn_-f9Llo7d-31osJw3RslUleTt66E",
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

app.get('/test/:brach',(req,res)=>{
  const b=req.params.brach
  console.log(b)
  res.json({"response":{"stream":"AIML",
    "roadmap":[{"main_topic":"Foundations of Artificial Intelligence",
      "link":"https://www.coursera.org/learn/introduction-to-artificial-intelligence",
      "subtopics":["Defining Artificial Intelligence: Core concepts and historical context",
        "Types of AI: Narrow vs. General AI, Reactive vs. Limited Memory",
        "Key AI Challenges: Problem-solving, knowledge representation, learning",
        "Ethical Considerations in AI: Bias, fairness, transparency",
        "Applications of AI: Real-world examples across industries"]},
        {"main_topic":"Introduction to Machine Learning",
          "link":"https://www.coursera.org/learn/machine-learning",
          "subtopics":["What is Machine Learning? Supervised, Unsupervised, and Reinforcement Learning",
            "Types of Machine Learning Problems: Regression, Classification, Clustering","Data Preprocessing: Handling missing values, feature scaling, encoding",
            "Model Training and Evaluation: Train-test split, accuracy, precision, recall",
            "Common ML Algorithms: Linear Regression, Logistic Regression, K-Nearest Neighbors"]},
            {"main_topic":"Deep Learning Fundamentals",
              "link":"https://www.deeplearning.ai/",
              "subtopics":["Introduction to Neural Networks: Neurons, layers, activation functions","Feedforward Neural Networks: Architecture and forward propagation",
                "Backpropagation Algorithm: Understanding gradient descent and weight updates",
                "Convolutional Neural Networks (CNNs): For image processing",
                "Recurrent Neural Networks (RNNs): For sequential data"]},
                {"main_topic":"Python for AIML","link":"https://www.python.org/",
                  "subtopics":["Python Basics: Variables, data types, control flow",
                    "Data Structures in Python: Lists, dictionaries, tuples",
                    "NumPy for Numerical Computing: Arrays, vectorization",
                    "Pandas for Data Manipulation: DataFrames, series, data cleaning",
                    "Matplotlib/Seaborn for Data Visualization: Plotting basic charts"]},
                    {"main_topic":"Natural Language Processing (NLP) Basics",
                      "link":"https://www.nltk.org/book/",
                      "subtopics":["Introduction to NLP: Understanding human language for computers",
                        "Text Preprocessing: Tokenization, stemming, lemmatization",
                        "Text Representation: Bag-of-Words, TF-IDF",
                        "Basic NLP Tasks: Sentiment analysis, text classification",
                        "Introduction to NLP Libraries: NLTK, spaCy"]}]}}
)})

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
  password: "Supabase@321", // put your Supabase password
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

app.get("/test/:nme",async(req,res)=>
{
  let n=req.params.nme;
  console.log(n)
  let result=await pool.query("SELECT pass FROM testing WHERE uname=$1 ",[n])
   let match=await bcrypt.compare("qazwsxedc",result.rows[0]["pass"])
  res.json({"result is":match});
})

app.listen(5000);