const express = require("express");
const app = express()

const MongoClient = require("mongodb").MongoClient;
let db;
MongoClient.connect("mongodb+srv://dkristof:1234@cluster0.wkaio.mongodb.net/webstore?retryWrites=true&w=majority", (err, client) => {
    db = client.db("lesson")
})

app.use(express.json())

//Get the MongoDB collection name
app.param("collectionName", (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    return next()
})

app.get("/", (req, res, next) => {
    res.send("Select a collection, e.g., /collection/:collectionName")
})

app.get("/collection/:collectionName", (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e)
        res.send(results)
    })
})

app.get("/collection/", (req, res, next) => {
    res.send("Select a collection, e.g., /collection/lessons")
})

//Get an object based ID
const ObjectID = require('mongodb').ObjectID;
app.get('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.findOne(
        { _id: new ObjectID(req.params.id) },
        (e, result) => {
            if (e) return next(e)
            res.send(result)
        }
    )
})

//Add a new object
app.post('collection/:collectionName', (req, res, next) => {
    req.collection.insert(req.body, (e, results) => {
        if (e) return next(e)
        res.send(results.ops)
    })
})

const port = process.env.PORT || 3000
app.listen(port)