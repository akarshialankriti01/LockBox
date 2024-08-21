const express = require("express")
const app = express()
const mysql = require("mysql2")
const cors = require("cors")
const PORT = 3001

const {encrypt,decrypt}=require('./Encryption.js')



app.use(cors())
app.use(express.json())

//creates a connection between server and the mysql database
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Jayajolly31*',
    database: 'passwordmanager'
})


//gets requests and response front the frontend by routing the website to /addpassword
app.post('/addpassword',
    (req,res)=>{
        const {password,title}=req.body         //destructures data from the body of the request i.e. the data we have sent 
        const {encrypted: hashedPassword, key: iv} = encrypt(password)
        // console.log(iv)
        db.query(`INSERT INTO passwords (passwordscol,title,iv) VALUES ('${hashedPassword}','${title}','${iv}')`,
        (err,result)=>{
            if(err)
                console.log(err)
            else
            {
                res.send("Successfully added!")
                // console.log(result)
            }
        })
    })

    app.get("/showpassword",(req,res)=>{
        db.query("SELECT * FROM passwords;", (err,result)=>
        {
            if(err)
            consol.log(err)
            else{
                res.send(result)
            }
        })
    })

    app.post('/revealpassword',(req,res)=>{
        const {title} = req.body
        console.log(title)
        db.query(`SELECT * FROM passwords WHERE title='${title}'`,(err,result)=>{
            if(err)
            console.log(err)
            else{
                // console.log(result)
                if(result.length === 0){
                res.send("Error: 404; Data entry not found!!")
                return 
                }
                const password = decrypt({ message: result[0].passwordscol , newiv: result[0].iv})
                res.send(password)
            }
        })
    })

app.listen(PORT,()=>{console.log("Server is running...")}) //establishes a connection b/w the frontend and the backend(internal server)
