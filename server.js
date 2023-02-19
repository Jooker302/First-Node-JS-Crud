// console.log("hello world")

// Packages Import Start

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const { default: mongoose } = require('mongoose')

const mongoose = require('mongoose')

//setting view engine to ejs
app.set("view engine", "ejs");

// Packages Import End


//DB Connection URL
const url = 'mongodb://127.0.0.1:27017/first'


// Database connection
mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})
// Check Connection


db.on('error', err => {
  console.error('connection error:', err)
})



// const Test = require('/models/testSchema')
// Simaple Schema
const testSchema = require('./models/testSchema')


//test function 
// For Insertion of database
// app.get('/test', function(req,res){
//     const a = new testSchema({
//         name: 'Joker',
//         email: 'joker@mail.com'
//     })


//     a.save(function (error, document) {
//         if (error) console.error(error)
//         console.log(document)
//       })
// })


// for accessing form data from html
app.use(bodyParser.urlencoded({extended: true}))


//port 3000
app.listen('3000', function(){
    // console.log('test')
})

app.get('/',function(req,res){
    res.redirect('/view')
})


// Form page / Main Page
app.get('/create', function(req,res){
    // console.log("test get request")
    res.sendFile(__dirname + '/views/index.html')
})


// DB Create function
app.post('/submit', function(req,res){
    // res.send(req.body)
    saveCharacter(req.body)
    .then(doc => { res.redirect('/view') })
    .catch(error => { console.error(error) })
    
    // const savedata = new testSchema(req.body)
    //  savedata.save(function(error,document){
    //     if(error){
    //         console.log(error)
    //     }
    //     console.log(document)
    //     res.send('success')
    //  })
})

function saveCharacter (character) {
    const c = new testSchema(character)
    return c.save()
  }
  
//   saveCharacter({
//     name: 'Ryu',
//     ultimate: 'Shinku Hadoken'
//   })
//     .then(doc => { console.log(doc) })
//     .catch(error => { console.error(error) })


// DB View Statemnet
app.get('/view', function(req,res){
    // testSchema.find((err, docs) => {
    //     if (!err) {
    //         res.render("view", {
    //             data: docs
    //         });
    //     } else {
    //         console.log('Failed to retrieve the Course List: ' + err);
    //     }
    // });

    // const ryu = testSchema.find()
    testSchema.find({}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("success");
            res.render("view", {
                data: docs,
              });
        }
    });
    // console.log(ryu)
})


app.post('/delete', function(req, res){
    // res.send(req.body.id);

    testSchema.deleteOne({ _id: req.body.id}).then(function(){
        console.log("Data deleted"); // Success
        res.redirect('/view')
     }).catch(function(error){
        console.log(error); // Failure
     });
})

app.get('/edit/:id',function(req,res){
    // res.send(req.params.id);
    testSchema.findOne({_id : req.params.id}, function(err, docs){
        if(err){
            console.log(err)
        }else{
            // res.send(docs);
            // console.log(docs)
            res.render("update", {
                data: docs,
            })
        }
    })
})

app.post('/update',function(req,res){
    testSchema.updateOne({ _id: req.body.id }, { name: req.body.name, email: req.body.email }, (err, result) => {
        if (err) {
          console.log(err);
        } else {
        //   console.log(result);
            res.redirect("/view")
        }
      });
})

