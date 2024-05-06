const mysql = require('mysql')

const con = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6704158",
    password: "U61GmPFZHi",
    database: "sql6704158"
})

con.connect(function (err, conn) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("connected", conn)
    }
    //Table cars

    const sql = `
    CREATE TABLE IF NOT EXISTS cars (
        car_id INT AUTO_INCREMENT PRIMARY KEY,
        model VARCHAR(255) NOT NULL,
        stock_count INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

    con.query(sql, function (err, result) {
        if (err) throw err;
        else {
            console.log("cars created", result)
        }
    })

    //Table purchase_orders

    const sql1 = `
    CREATE TABLE IF NOT EXISTS purchase_orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        car_id INT NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        quantity INT NOT NULL,
        FOREIGN KEY (car_id) REFERENCES cars(car_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

    con.query(sql1, function (err, result) {
        if (err) throw err;
        else {
            console.log("purchase_orders created", result)
        }
    })


    //Table sales_orders

    const sql2 = `
    CREATE TABLE IF NOT EXISTS sales_orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        car_id INT NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        quantity INT NOT NULL,
        FOREIGN KEY (car_id) REFERENCES cars(car_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

    con.query(sql2, function (err, result) {
        if (err) throw err;
        else {
            console.log("sales_orders created", result)
        }
    })

})


module.exports = con
