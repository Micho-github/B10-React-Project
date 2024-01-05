import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "magdb"

})

// if there is a auth problem
// 7ot ma7al USER b2aleb l db 'root@localhost'

app.use(cors())
app.use(express.json())


app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.post("/Login", (req, res) => {
  const q = "SELECT * FROM user WHERE `Username` = ? AND `Password` = ?";
  const values = [
    req.body.username,
    req.body.password,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err);
    }

    if (data.length === 0) {
      return res.json({ error: "Invalid credentials" });
    }

    return res.json({ message: "Login successful", user: data[0] });
  });
});


app.get("/itemSearch", (req, res) => {
    const { search_input } = req.query;

    if (!search_input || !search_input.trim()) {
        return res.status(400).json({ error: 'Search term is required.' });
    }

    const q = "SELECT * FROM item WHERE Item_Name LIKE ?";
    const searchTerm = `%${search_input}%`;

    db.query(q, [searchTerm], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Encode MediumBlob data to base64 before sending
        const itemsWithBase64Image = data.map((item) => ({
            ...item,
            Item_Image: item.Item_Image.toString("base64"),
        }));

        return res.json(itemsWithBase64Image);
    });
});

  app.get("/itemHome", (req, res) => {
    const q = "SELECT * FROM item";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
  
      // Encode MediumBlob data to base64 before sending
      const itemsWithBase64Image = data.map((item) => ({
        ...item,
        Item_Image: item.Item_Image.toString("base64"),
      }));
  
      return res.json(itemsWithBase64Image);
    });
  });

  // Route to fetch cities
app.get('/cities2', (req, res) => {
    const query = 'SELECT * FROM City';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      res.json(results);
    });
  });
  
  // Route to fetch categories with their sub-categories
  app.get('/categories2', (req, res) => {
    const query = `
      SELECT C.Category_Code, C.Category_Description,
             SC.Sub_Category_Code, SC.Sub_Category_Description
      FROM Category C
      LEFT JOIN Sub_Category SC ON C.Category_Code = SC.Category_Code
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Organize the data into a structure suitable for the frontend
      const organizedData = results.reduce((acc, row) => {
        if (!acc[row.Category_Code]) {
          acc[row.Category_Code] = {
            Category_Code: row.Category_Code,
            Category_Description: row.Category_Description,
            subCategories: [],
          };
        }
  
        if (row.Sub_Category_Code) {
          acc[row.Category_Code].subCategories.push({
            Sub_Category_Code: row.Sub_Category_Code,
            Sub_Category_Description: row.Sub_Category_Description,
          });
        }
  
        return acc;
      }, {});
  
      const categories = Object.values(organizedData);
      res.json(categories);
    });
  });
  
  // Route to fetch sub-categories based on the selected category
  app.get('/subCategories2', (req, res) => {
    const { category } = req.query;
    const query = `
      SELECT SC.Sub_Category_Code, SC.Sub_Category_Description
      FROM Sub_Category SC
      WHERE SC.Category_Code = (SELECT C.Category_Code FROM Category C WHERE C.Category_Description = '${category}')
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      res.json(results);
    });
  });
  
  // Route to fetch items based on selected filters
  app.get('/itemFilter', (req, res) => {
    const { city, category, subCategory } = req.query;
  
    // Construct the base query
    let query = `
      SELECT *
      FROM Item
    `;
  
    // If any filter is provided, add corresponding WHERE clauses
    if (city || category || subCategory) {
      query += 'WHERE ';
  
      if (city) {
        query += `City_Code = (SELECT City_Code FROM City WHERE City_Description = '${city}') `;
      }
  
      if (category) {
        if (city) query += 'AND ';
        query += `Category_Code = (SELECT Category_Code FROM Category WHERE Category_Description = '${category}') `;
      }
  
      if (subCategory) {
        if (city || category) query += 'AND ';
        query += `Sub_Category_Code = (SELECT Sub_Category_Code FROM Sub_Category WHERE Sub_Category_Description = '${subCategory}') `;
      }
    }
  
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Encode MediumBlob data to base64 before sending
      const itemsWithBase64Image = results.map((item) => ({
        ...item,
        Item_Image: item.Item_Image.toString('base64'),
      }));
  
      res.json(itemsWithBase64Image);
    });
  });

  app.get("/:user_id/myitems", (req, res) => {
    const user_id = req.params.user_id;
    const q = "SELECT * FROM item WHERE User_id = ?";
    db.query(q, [user_id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.get("/categories",(req,res)=>{
    const q = "SELECT * FROM category"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.get("/subcategories/:categoryCode", (req, res) => {
    const categoryCode = req.params.categoryCode;

    const q = `
    SELECT *
    FROM sub_category AS A
    JOIN category AS B ON A.Category_Code = B.Category_Code
    WHERE B.Category_Code = ?;
    
    `;

    db.query(q, [categoryCode], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});




app.get("/cities",(req,res)=>{
    const q = "SELECT * FROM city"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.post("/additem", (req, res) => {
    const q = "INSERT INTO item (`Item_Image`, `Item_Name`, `Item_Description`, `Price`, `User_id`, `Category_Code`, `Sub_Category_Code`, `City_Code`) VALUES (?)";
    const values = [
        req.body.image,
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.userid,
        req.body.category,
        req.body.subcategory,
        req.body.city,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Item has been added successfully.");
    });
});

app.delete("/MyItems/delete/:id", (req,res)=>{
    const ItemId = req.params.id;
    const q = "DELETE FROM item Where Item_id = ?"

    db.query(q, [ItemId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Item has been successfully deleted.");
    });

})

app.put("/MyItems/update/:id", (req,res)=>{
    const ItemId = req.params.id;
    const q = "UPDATE item SET `Item_Image`= ?, `Item_Name`= ?, `Item_Description`= ?, `Price`= ?, `User_id`= ?, `Category_Code`= ?, `Sub_Category_Code`= ?, `City_Code`= ? WHERE Item_id = ?";

    const values = [
        req.body.image,
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.userid,
        req.body.category,
        req.body.subcategory,
        req.body.city,
    ];

    db.query(q, [...values,ItemId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Item has been updated successfully.");
    });

})

app.get("/item/:itemId", (req, res) => {
    const itemId = req.params.itemId;

    // Fetch item details
    const itemQuery = 'SELECT * FROM item WHERE Item_id = ?';
    db.query(itemQuery, itemId, (itemErr, itemData) => {
        if (itemErr) return res.status(500).json(itemErr);
        if (itemData.length === 0) {
            return res.status(404).json({ error: "Item not found" });
        }

        const userId = itemData[0].User_id;

        // Fetch user details based on the User_id obtained from the item data
        const userQuery = 'SELECT Username, Email, Phone_No FROM user WHERE User_id = ?';
        db.query(userQuery, userId, (userErr, userData) => {
            if (userErr) return res.status(500).json(userErr);

            // Combine item data with user data
            const combinedData = {
                ...itemData[0],
                Username: userData.length > 0 ? userData[0].Username : null,
                Email: userData.length > 0 ? userData[0].Email : null,
                Phone_No: userData.length > 0 ? userData[0].Phone_No : null
            };

            return res.json(combinedData);
        });
    });
});

app.put("/item/:itemId/reserve", (req, res) => {
    const itemId = req.params.itemId;
    const userId = req.body.userId; // Assuming userId is sent in the request body

    // Check if the item is already reserved
    const checkQuery = "SELECT isReserved FROM item WHERE Item_id = ?";
    db.query(checkQuery, itemId, (err, rows) => {
        if (err) return res.json(err);

        if (rows.length === 0) {
            return res.json({ message: 'Item not found' });
        }

        const isReserved = rows[0].isReserved;

        if (isReserved === 1) {
            return res.json({ message: 'Item is already reserved' });
        } else {
            // Update the item as reserved
            const updateQuery = "UPDATE item SET isReserved = 1 WHERE Item_id = ?";
            db.query(updateQuery, itemId, (err, result) => {
                if (err) return res.json(err);

                if (result.affectedRows === 0) {
                    return res.json({ message: 'Item not found or already reserved' });
                }

                // Add the item and user IDs to the request_item table
                const insertRequestQuery = "INSERT INTO request_item (Item_id, User_id, Date_Of_Request) VALUES (?, ?, NOW())";
                db.query(insertRequestQuery, [itemId, userId], (err, insertResult) => {
                    if (err) return res.json(err);

                    return res.json({ message: 'Item reserved successfully', insertResult });
                });
            });
        }
    });
});



app.listen(8000, ()=>{
    console.log("Connected to backend!")
})
