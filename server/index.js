const express = require('express');
const connectDB = require('./db.js');
const itemModel = require('./models/items.js');
const cors = require('cors');
const mongoose =require('mongoose');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
    {
        origin: ["https://memory-tinkles-realtime-fullstack-ijrnyln6b.vercel.app/"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

connectDB();

app.post("/", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await itemModel.findOne({ username });

        if (user) {
            if (user.password === password) {
                res.json("exist");
            } else {
                res.json("notexist");
            }
        } else {
            res.json("notexist");
        }
    } catch (e) {
        res.json("fail");
    }
});

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    const data = {
        username,
        password,
        memories: []
    };

    try {
        const check = await itemModel.findOne({ username });

        if (check) {
            res.json("exist");
        } else {
            await itemModel.create(data);
            res.json("inserted");
        }
    } catch (e) {
        res.json("fail");
    }
});

app.get('/fetch', async (req, res) => {
    const { username } = req.query;
    
    try {
        const user = await itemModel.findOne({ username });
        if (user) {
            const memories = user.memories;
            return res.json({ memories });
        }
        // If user is not found, return an empty array
        return res.json({ memories: [] });
    } catch (error) {
        console.error('Error fetching memories:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/add', async (req, res) => {
    const { id, title, description } = req.body;

    try {
        const user = await itemModel.findOne({username: id});

        if (!user) {
            return res.json("notinserted");
        }

        user.memories.push({ title, description });
        await user.save();

        res.json("inserted");
    } catch (error) {
        res.json("notinserted");
    }
});


app.post('/delete', async (req, res) => {
    const { username, memid } = req.body;

    try {
        const response = await itemModel.updateOne(
            { username },
            { $pull: { memories: { _id: new mongoose.Types.ObjectId(memid) } } }
        );

        if (response.modifiedCount > 0) {
            return res.json("deleted");
        } else {
            return res.json("notdeleted");
        }
    } catch (e) {
        console.error('Error occurred during memory deletion:', e);
        return res.status(500).json({ status: 'fail', message: 'An error occurred' });
    }
});


app.listen(process.env.PORT || 3000, () => {
    console.log("App is running on port 3000");
});
