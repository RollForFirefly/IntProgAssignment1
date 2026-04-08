let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ass1db"
});

function initCatalogue() {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        let queryLine = "CREATE TABLE catalogue ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, price DECIMAL(8, 2) NOT NULL, description VARCHAR(255) NOT NULL, image VARCHAR(255))";
        con.query(queryLine, function (err, result) {
            if (err) throw err;
            console.log("Table created or found :3");
            let queryLine = "INSERT INTO catalogue (name, price, description, image) VALUES ?";
            let values = [
                ['Soap', 12.99, "Household soap, great at cleaning grime and dirt.", "soap.jpg"],
                ['Cheese', 8.50, "Processed cheese, ready for crackers or sandwiches.", "cheese.jpg"],
                ['Egg', 8.99, "A chicken's egg. They go green when rotten.", "egg.jpg"],
                ['UTS 4W3S0M3R4M-32 32GB (2x16GB) 6000MHz DDR5', 1499.99, "Computer RAM, incredibly overpriced due to OpenAI and other LLM companies.", "ram.jpg"],
                ['Fancy Cheese', 24.99, "Expensive but delicious cheese, perfect for charcuterie or by itself.", "cheese2.jpg"],
                ['Cooper JCW 3DR', 66882.00, "An Electric model of Mini Cooper. New.", "car.jpg"],
                ['Chair', 5.99, "A chair. Wooden. Looks uncomfortable.", "chair.jpg"],
                ['Towel', 13.49, "A cotton towel. Wait are towels made of cotton?", "towel.jpg"],
                ['Refried Beans', 7.99, "A can of refried beans. Great for protein and fibre.", "beans.jpg"],
                ['Scary Tape', 6.66, "It's haunted...", "tape.jpg"],
                ['Twenty-sided Die', 20.00, "Also known as a D20. Seems to almost never roll a 20.", "die.jpg"],
                ['Guillotine', 0.00, "The revolution is upon us. Buy me. I hunger for the rich.", "revolution.jpg"],
                ['Ryan Gosling', 99.99, "Are you buying a man or a standee? Yes.", "ryan.jpg"],
            ];
            con.query(queryLine, [values], function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " values inserted into catalogue");
            })
        });
    });
}

