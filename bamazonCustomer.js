var mysql = require("mysql");
var inquirer = require("inquirer");
var product;
var remainingQuantity;
var cost;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "b1141994",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    displayBamazon();
    customerBuy();
});

function displayBamazon() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | Product: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: $" + res[i].price + " | Quantity: " + res[i].stock_quantity);
        }
        console.log("\n");
    });
}

function customerBuy() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([{
                name: "item",
                type: "input",
                message: "What is the item id of the product you would like to purchase?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?"
            }
        ]).then(function (answer) {
            if (Number.isInteger(parseInt(answer.item)) && Number.isInteger(parseInt(answer.quantity)) && parseInt(answer.item) <= res.length) {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id == answer.item) {
                        product = res[i];
                    }
                }
                cost = parseFloat(product.price) * parseFloat(answer.quantity)
                remainingQuantity = product.stock_quantity - parseInt(answer.quantity);
                if (remainingQuantity < 0) {
                    console.log("Sorry, there is an insufficient quantity to place the order")
                    end();
                } else {
                    updateQuantity();
                    console.log("Total cost is: $" + cost);
                    end();
                }
            } else {
                console.log("Invalid Input!")
                end();
            }
        });
    });
}

function updateQuantity() {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?", [{
                stock_quantity: remainingQuantity
            },
            {
                item_id: product.item_id
            }
        ],
    );
}

function end() {
    connection.end();
}