var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var client = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/testdb';

// var text = require('./src/db.js');
// var { cal1, cal2 } = require('./src/func.js')

var str = "";
// console.log(text.str)
// console.log(cal1.a, cal2.c)

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})

//query user
app.get('/user', (req, res) => {
    client.connect(url, async function(err, db) {
        // err
        console.log("Connected successfully to server");
        const dbName = db.db('testdb').collection('users');
        let find = dbName.find({}).each((err, result) => {
            if (result != null) {
                str = str + " Name  " + result.userName +"\n";
            }
            console.log(result);
        })
    })
    res.send(str)
    str=""
    db.close();
});

app.get('/user/:name', (req, res) => {
    client.connect(url, async function(err, db) {
        // err
        console.log("Connected successfully to server");
        const dbName = db.db('testdb').collection('users');
        console.log(req.params.name)
        let find = dbName.find({userName: req.params.name}).toArray((err, result) => {
            // if (result != null) {
            //     str = str + " Name  " + result.userName +"\n";
            // }
            console.log(result);
        })
    })
    res.status(200).send(result)
    db.close();
});

//insert new user
app.post('/user', (req, res) => {
    client.connect(url, async function(err, db) {
        // err
        console.log("Connected successfully to server");
        const dbName = db.db('testdb').collection('users');
        let find = dbName.insertOne(
            // req.body
            {   id: req.body.id,
                userName: req.body.userName,
                // password: req.query.pass
            }
            ,function(err, result){
            console.log(result);
            console.log(req.body);
        })
    })
    res.send('insert new user success!')
    db.close();
})

app.delete('/user', (req, res) => {
    client.connect(url, async function(err, db) {
        // err
        console.log("Connected successfully to server");
        const dbName = db.db('testdb').collection('users');
        let find = dbName.findOneAndDelete({ 
                // userName: req.query.name,
                userName: req.body.userName,
            }
            ,function(err, result){
            console.log(result);
        })
    })
    res.send('insert new user success!')
    db.close();
})

// app.get('/user', (req, res) => {
//     console.log(req.query)
//     res.send("Hello")
// })


app.listen(3000, ()=> console.log("listten 3000"));



//     // if(err){
//     //     console.log(err);
//     //     process.exit(1);
//     // }

//     // console.log(db)
    // console.log(typeof db)


    // let insert = await dbName.insertOne({a: 1})
    // console.log(insert)