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

function addItem() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim(); // Get the task text and trim whitespace

    // Don't add an empty task
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create list item element
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create button container (as parent of Done and Delete buttons)
    const actionDiv = document.createElement("div");
    actionDiv.className = "actions";

    // Create a Done button
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.onclick = function () {
        li.classList.toggle("done");
    };

    // Create a Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = function () {
        li.remove(); // Removes the task
    };

    // Append buttons to the container
    actionDiv.appendChild(doneBtn);
    actionDiv.appendChild(delBtn);

    // Attach buttons to the list item
    li.appendChild(actionDiv);

    // Add list item to the top of the task list
    document.getElementById("taskList").prepend(li); // Prepend to put at the top

    // Clear the input box
    input.value = "";
}

function updateSearch() {
    const ul = document.getElementById("item-list");
    const li = document.createElement("li");
    li.textContent = "blah";
    ul.appendChild(li);
}

function toTitleCase(str) {
    return str.toString().charAt(0).toUpperCase() + str.toString().substring(1);
}

function createItemContainer(text, price, img, desc) {
    const li = document.createElement("li");
    li.className = "item-container";

    const h2 = document.createElement("h2");
    h2.textContent = toTitleCase(text);
    h2.className = "item-name";
    li.appendChild(h2);

    const h3 = document.createElement("h3");
    h3.textContent = "$" + price;
    li.appendChild(h3);

    const image = document.createElement("img");
    image.src = img;
    image.alt = "oops";
    li.appendChild(image);

    const div = document.createElement("div");
    div.textContent = desc;
    div.className = "item-desc";
    li.appendChild(div);

    return li;
}

function displayItems() {
    // TODO: clear any current list items
    // display all items, according to search
    const ul = document.getElementById("item-list");
    const yarg = ["cheese", "egg", "soap", "towels"]
    for (let i = 0; i < yarg.length; i++) {
        const li = createItemContainer(yarg[i], 22.22, "../images/egg.jpg", "A desc.");
        ul.appendChild(li);
    }
}

function createAddToCart() {
    // return a container with a count button and an add to cart button
}

function initDB() {
    let mysql = require('mysql');

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "ass1db"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        let queryLine = "CREATE TABLE catalogue ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, price DECIMAL(6, 2) NOT NULL, description VARCHAR(255) NOT NULL, image VARCHAR(255))";
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
                ['Cooper JCW 3DR', 66882.00, "An Electric model of Mini Cooper. New.", "car.jpg"]
            ];
            con.query(queryLine, [values], function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " values inserted into catalogue");
            })
        });
    });


}