const con = require('../config/dbConnection')

//@desc get all cars
const getCars = async (req, res) => {
    const sql = `
    SELECT 
    c.car_id,
    c.model,
    c.stock_count AS stock_count,
    po.total_purchase_quantity AS purchase_quantity,
    po.unit_price AS unit_purchase_price,
    (po.unit_price * po.total_purchase_quantity) AS total_purchase_value,
    so.total_sales_quantity AS sales_quantity,
    so.unit_price AS unit_sales_price,
    (so.unit_price * so.total_sales_quantity) AS total_sales_value
FROM 
    cars c
LEFT JOIN 
    (SELECT 
        car_id, 
        SUM(quantity) AS total_purchase_quantity,
        MAX(unit_price) AS unit_price
    FROM 
        purchase_orders 
    GROUP BY 
        car_id) po ON c.car_id = po.car_id
LEFT JOIN 
    (SELECT 
        car_id, 
        SUM(quantity) AS total_sales_quantity,
        MAX(unit_price) AS unit_price
    FROM 
        sales_orders 
    GROUP BY 
        car_id) so ON c.car_id = so.car_id
GROUP BY 
    c.car_id, 
    c.model;`;

        // Fetch the calculations
        con.query(sql,  (err, result) => {
            if (err) {
                con.rollback();
                res.status(400).json(err);
                throw err;
            }else{
                console.log(result)
                res.status(200).json(result)
            }
            });
};


//@desc get all cars
//routes api/cars
const createCar = async (req, res) => {

}


//@desc update a car
//routes api/cars/purchase/:car_id
const updateCarPurchase = async (req, res) => {
    const car_id = parseInt(req.params.car_id, 10); 
    console.log(car_id);
    try {
        // Begin transaction to ensure data consistency
        con.beginTransaction();

        // Get the current unit price from the purchase_orders table
        const currentPriceQuery = await new Promise((resolve, reject) => {
            con.query('SELECT unit_price FROM purchase_orders WHERE car_id = ?', [car_id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
        
        const currentPrice = currentPriceQuery[0].unit_price;

         // Insert a new row into purchase_orders table
         await new Promise((resolve, reject) => {
            con.query('INSERT INTO purchase_orders (car_id, unit_price, quantity) VALUES (?, ?, 1)', [car_id, currentPrice], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        // Update stock_count in the cars table
        await new Promise((resolve, reject) => {
            con.query('UPDATE cars SET stock_count = stock_count + 1 WHERE car_id = ?', [car_id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        // Commit the transaction
        con.commit();

    } catch (error) {
        // Rollback transaction if there's an error
        con.rollback();
        console.error('Error updating purchase:', error);
        res.status(500).json({ success: false, message: 'Error updating purchase' });
    }
};



//@desc update sales for a car
//routes api/cars/sell/car_id
const updateCarSales = async (req, res) => {
    const car_id = parseInt(req.params.car_id, 10);
    console.log(car_id);

    try {
        // Begin transaction to ensure data consistency
        con.beginTransaction();

        // Get the current unit price from the sales_orders table
        const currentPriceQuery = await new Promise((resolve, reject) => {
            con.query('SELECT unit_price FROM sales_orders WHERE car_id = ?', [car_id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        const currentPrice = currentPriceQuery[0].unit_price;

        // Insert a new row into sales_orders table
        await new Promise((resolve, reject) => {
            con.query('INSERT INTO sales_orders (car_id, unit_price, quantity) VALUES (?, ?, 1)', [car_id, currentPrice], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        // Update stock_count in the cars table to decrease by 1
        await new Promise((resolve, reject) => {
            con.query('UPDATE cars SET stock_count = stock_count - 1 WHERE car_id = ?', [car_id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        // Commit the transaction
        con.commit();

    } catch (error) {
        // Rollback transaction if there's an error
        con.rollback();
        console.error('Error updating sales:', error);
        res.status(500).json({ success: false, message: 'Error updating sales' });
    }
};


module.exports = { getCars, createCar, updateCarPurchase, updateCarSales }