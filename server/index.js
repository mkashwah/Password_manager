const express = require('express');
const app = express();
const port = 3001;
const mysql = require('mysql2');
const cors = require('cors');
const {encrypt, decrypt} = require('./EncryptionHandler');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    user: process.env.user ,
    host: process.env.host ,
    password: process.env.password ,
    database: process.env.database
});

app.post('/addpassword', (req, res) =>{
    const{password, site} = req.body
    const hashedPassword = encrypt(password);

    db.query("INSERT INTO passwords (password, title, iv) VALUES (?,?,?)",
    [hashedPassword.password, site, hashedPassword.iv], (err, result) => {
        if (err){
            console.log(err)
        }else{
            res.send("success");
        }
    })
});

app.get('/showpasswords', (req,res)=>{
    db.query('SELECT * FROM passwords;', (err, result)=>{
        if(err){
            console.log('error retrieving');
        }else{
            res.send(result);
        }
    }
    );
}
);

app.post('/decryptpassword', (req, res) => {
    // res.send('<p>inside app.post</p>')
    // res.send('<p>another app.post</p>')
    res.send(decrypt(req.body))
});


app.listen(port, ()=>{
    console.log('server is running');
}
);