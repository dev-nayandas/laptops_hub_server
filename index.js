const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pfvoz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });






async function run(){
        try{
            const nameCollection = client.db('laptops-hub').collection('categoriesName')
            const categoryCollection = client.db('laptops-hub').collection('catagories')
            const advertisedCollection = client.db('laptops-hub').collection('advertisedItems')
            const appleCollection = client.db('laptops-hub').collection('apple')
            const samsungCollection = client.db('laptops-hub').collection('samsung')
            const asusCollection = client.db('laptops-hub').collection('asus')
            const bookingCollection = client.db('laptops-hub').collection('booking')

            app.get('/categoriesName', async (req, res)=>{
                const query = {}
                const cursor=  nameCollection.find(query);
                const names = await cursor.toArray();
                res.send(names)
            });

            app.get('/advertisedItems', async (req, res)=>{
                const query = {}
                const cursor=  advertisedCollection.find(query);
                const items = await cursor.toArray();
                res.send(items)
            });
            app.get('/apple', async (req, res)=>{
                const query = {}
                const cursor=  appleCollection.find(query);
                const apple = await cursor.toArray();
                res.send(apple)
            });
            app.get('/samsung', async (req, res)=>{
                const query = {}
                const cursor=  samsungCollection.find(query);
                const samsung = await cursor.toArray();
                res.send(samsung)
            });
            app.get('/asus', async (req, res)=>{
                const query = {}
                const cursor=  asusCollection.find(query);
                const asus = await cursor.toArray();
                res.send(asus)
            });
            // app.get('/catagories', async (req, res)=>{
            //     const query = {}
            //     const cursor=  categoryCollection.find(query);
            //     const laptop = await cursor.toArray();
            //     res.send(laptop)
            // });

            // app.get('/catagories/:id', async (req, res)=>{
            //     const  id =req.params.id;
            //     const query = {_id: ObjectId(id)};
            //     const cursor=  categoryCollection.filter(l=>l.category_id === query);
            //     const review = await cursor.toArray();
            //     res.send(review)
            // });
            // app.get('/catagories',  async (req, res) => {
                
    
            //     let query = {};
            //     if (req.query.category_id) {
            //         query = {
            //             category_id: req.query.category_id
            //         }
            //     }
            //     const cursor = categoryCollection.find(query);
            //     const laptops = await cursor.toArray();
            //     res.send(laptops);
            // });

            app.post('/booking', async (req, res) => {
                const booking = req.body;
                const result = await bookingCollection.insertOne(booking);
                res.send(result);
            });
    
        }
        finally{

        }
}
run().catch(err => console.log(err));







app.get('/', (req, res) => {
    res.send('server is running')
})




app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})