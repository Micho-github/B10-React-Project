import express from "express"
import mysql from "mysql"

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "magdb"

})

// if there is a auth problem
// 7ot ma7al USER b2aleb l db 'root@localhost'

app.use(express.json())


app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/user",(req,res)=>{
    const q = "SELECT * FROM user"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.post("/iteminsert", (req, res) => {
    console.log(req.body); // Log the request body
    const q = "INSERT INTO item (`Item_Name`, `Item_Description`, `Price`) VALUES (?, ?, ?)";
    const values = [
        req.body.itemname,
        req.body.itemdescription,
        req.body.price,
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("Item has been added successfully"); // (data)
    });
});


app.listen(8000, ()=>{
    console.log("Connected to backend!")
})