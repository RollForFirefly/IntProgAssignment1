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

function createItemContainer(text, img, desc) {
    const li = document.createElement("li");
    li.textContent = text;
    li.className = "item-container";
    const div = document.createElement("div");
    const image = document.createElement("img");
    image.src = img;
    image.alt = "oops";
    div.textContent = desc;
    div.className = "item-desc";
    li.appendChild(image);
    li.appendChild(div);
    return li;
}

function displayItems() {
    // display all items, according to search
    const ul = document.getElementById("item-list");
    const yarg = ["cheese", "egg", "soap", "towels"]
    for (let i = 0; i < yarg.length; i++) {
        const li = createItemContainer(yarg[i], "../images/egg.jpg", "A desc.");
        ul.appendChild(li);
    }
}