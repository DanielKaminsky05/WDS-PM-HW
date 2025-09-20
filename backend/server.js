import express from "express"
import fs from "fs"
import path from "path"
import cors from "cors"



const app = express()
const port = 3000;


const dbPath = path.join(process.cwd(), "countrydb.json");


app.use(express.json()); 
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:3001"], // add your React dev origin here
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
  })
);



const writeDB = (db) => {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
};

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));

if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ countries: [] }, null, 2));
    console.log("db.json created");
}

app.get('/countries', (req, res) => {
    fs.readFile(dbPath, "utf-8", (err, data) => {
        if (err) {
          return res.status(500).json({ error: "Failed to read database" });
        }
        res.json(JSON.parse(data));
    });
})

app.post("/countries", (req, res) => {
    console.log("add")
    const code = (req.body.country || "").toUpperCase();
    if (!code) return res.status(400).json({ error: "Missing country code" });

    const db = readDB();
    if (!db.countries.includes(code)) {
        db.countries.push(code);
        writeDB(db);
    }
    res.json(db);
});


app.delete("/countries/:code", (req, res) => {
    console.log("delete")
    const code = (req.params.code || "").toUpperCase();
    const db = readDB();
    db.countries = db.countries.filter((c) => c !== code);
    writeDB(db);
    res.json(db);
});


app.listen(port, () => {
    console.log("Server running on Port 3000")
})

