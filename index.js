const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

// database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vu4r6yj.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const classesCollection = client.db("powerGym").collection("classes");
        const pricingCollection = client.db("powerGym").collection("pricing");

        app.get('/classes', async (req, res) => {
            const query = {};
            const classes = await classesCollection.find(query).toArray();
            res.send(classes);
        });

        app.get('/classes/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const classes = await classesCollection.findOne(query);
            res.send(classes);
        });

        app.get('/pricing', async (req, res) => {
            const query = {};
            const pricing = await pricingCollection.find(query).toArray();
            res.send(pricing);
        });

        app.get('/purchase/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const purchase = await pricingCollection.findOne(query);
            res.send(purchase);
        });

    } finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello power x-gym server running!!');
})

app.listen(port, () => {
    console.log(`Power x-gym app listening on port ${port}`);
})