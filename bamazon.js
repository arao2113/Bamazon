var mysql = require('mysql');
var inquirer = require('inquirer');

//  create connection to database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'supra21',
    database: 'bamazon_db'
});

// Connect to database
connection.connect(function(err) {
    if(err) throw err;
    start();
})

//
function start() {
    connection.query('SELECT * FROM products', function(err, res) {
        if(err) throw err;

        console.log("********************************Welcome To Bamazon********************************");
        console.log("***************************Here is our current Inventory***************************");
        console.log('------------------------------------------------------------------------------------');

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Stock: " + res[i].stock_quantity);
            console.log("------------------------------------------------------------------------------------");
        }

        inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'What is the ID of the product you wish to buy?',
                validate: function(value){
                    if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'qty',
                message: "How many would you like to purchase?",
                validate: function(value) {
                    if(isNaN(value)) {
                        return false;
                    } else {
                        return true;
                    }
                } 
            }
        ]).then(function(ans) {
            var buying = (ans.id)-1;
            var quantity = parseInt(ans.qty);
            var grandTotal = parseFloat(((res[buying].price) * quantity).toFixed(2));


            if(res[buying].stock_quantity >= quantity) {
                connection.query('UPDATE products SET ? WHERE ?', [
                    {stock_quantity: (res[buying].stock_quantity - quantity)},
                    {item_id: ans.id}
                ], function(err, result) {
                    if(err) throw err;
                    console.log("Awesome! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped in 3-5 business days.");
                    
                });
            }
        })
    })
}
