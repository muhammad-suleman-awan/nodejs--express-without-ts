const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cors = require("cors");

const mysql = require("mysql2"); // Import promise-based version
app.use(cors());

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "test",
});

let sqlConnection;

con.connect((error, connection) => {
  if (error) {
    sqlConnection = error;
    console.log("db connection error", error);
    return;
  } else {
    sqlConnection = connection;
    console.log("db connection success");
    return;
  }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/show", async (req, res) => {
  let limit = 6;
  if (req.body.limit) {
    limit = req.body.limit;
  }
  con.query(
    `SELECT * FROM productdetail LIMIT ${limit}`,
    function (err, results, fields) {
      if (err) {
        return res.status(500).send("Internal server error");
      }
      return res.status(200).json({
        success: true,
        message: "data fetched",
        data: results,
      });
    }
  );
});

app.post("/addProduct", async (req, res) => {
  try {
    return res.send(req.body);
    const { idorderdetail, usernameorder, product_price, product_id } = req.body;
    if (!product_name || !productdescription || !product_price || !product_id) {
      return res.status(400).json({ error: "Details are required" });
    }

    con.query(
      `INSERT INTO productdetail (product_name, productdescription, product_price, product_id) VALUES ("${name}", "${description}", "${instock_quantity}", "${price}")`,
      function (err, results, fields) {
        if (err) {
          return res.status(403).json({
            success: false,
            message: "data not stored",
            error: err,
          });
        }
        return res.status(201).json({
          success: true,
          message: "Product added successfully",
          data: results,
        });
      }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
});

// app.get("/showcustomer", async (req, res) => {
//   con.query("SELECT * FROM customer", function (err, results, fields) {
//     if (err) {
//       return res.status(500).send("Internal server error");
//     }
//     return res.status(200).json(results);
//   });
// });

// app.post("/addcustomer", async (req, res) => {
//   try {
//     const { name, password, email } = req.body;
//     if (!name || !password || !email) {
//       return res.status(400).json({ error: "Details are required" });
//     }

//     con.query(
//       `INSERT INTO customer (name, password, email ) VALUES ("${name}", "${password}", "${email}" )`,
//       function (err, results, fields) {
//         if (err) {
//           return res.status(403).json({
//             success: false,
//             message: "data not stored",
//             error: err,
//           });
//         }
//         return res.status(201).json({
//           success: true,
//           message: "Product added successfully",
//           data: results,
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Error adding product:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error,
//     });
//   }
// });

// app.get("/showproductorder", async (req, res) => {
//   con.query("SELECT * FROM productorder", function (err, results, fields) {
//     if (err) {
//       return res.status(500).send("INternal server error");
//     }
//     return res.status(200).json(results);
//   });
// });

// app.post("/addproductorder", async (req, res) => {
//   try {
//     const { product_id, customer_id, product_quantity } = req.body;
//     if (!product_id || !customer_id || !product_quantity) {
//       return res.status(400).json({ error: "Details are required" });
//     }

//     con.query(
//       `INSERT INTO productorder (product_id, customer_id, product_quantity ) VALUES ("${product_id}", "${customer_id}", "${product_quantity}" )`,
//       function (err, results, fields) {
//         if (err) {
//           return res.status(403).json({
//             success: false,
//             message: "data not stored",
//             error: err,
//           });
//         }
//         return res.status(201).json({
//           success: true,
//           message: "Product added successfully",
//           data: results,
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Error adding product:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error,
//     });
//   }
// });

app.listen(2222, () => {
  console.log("Server is running on localhost:2222");
});
