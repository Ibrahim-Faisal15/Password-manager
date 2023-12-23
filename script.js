let username = document.querySelector("#username");
let password = document.querySelector("#password");
let website = document.querySelector("#website");
let submit = document.querySelector("#submit");

let password_history = document.querySelector("tbody");
let table_row = document.createElement("tr");
let username_data = document.createElement("td");
let password_data = document.createElement("td");
let website_data = document.createElement("td");

password_data.addEventListener("click", (event) => {
  navigator.clipboard.writeText(event.target.textContent);
  alert("Copied the text: " + event.target.textContent);
  console.log(2224);
});

username_data.addEventListener("click", (event) => {
  navigator.clipboard.writeText(event.target.textContent);
  alert("Copied the text: " + event.target.textContent);
  console.log(2224);
});

website_data.addEventListener("click", (event) => {
  navigator.clipboard.writeText(event.target.textContent);
  alert("Copied the text: " + event.target.textContent);
  console.log(2224);
});

submit.addEventListener("click", (event) => {
  event.preventDefault();

  //if no input field is filled with data
  if (!username.value || !password.value || !website.value) {
    alert("Please Input Data");
    return;
  }

  // Local storage logic
  let pass_data = localStorage.getItem("pass_data");

  if (pass_data == null) {
    let json = [];
    json.push({
      username: username.value,
      password: password.value,
      website: website.value,
    });
    localStorage.setItem("pass_data", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("pass_data"));
    json.push({
      username: username.value,
      password: password.value,
      website: website.value,
    });

    localStorage.setItem("pass_data", JSON.stringify(json));
  }

  // let password_history = document.querySelector("tbody");
  // let table_row = document.createElement("tr");
  // let username_data = document.createElement("td");
  // let password_data = document.createElement("td");
  // let website_data = document.createElement("td");
  let delete_row = document.createElement("img");
  delete_row.src = "trash.svg";
  delete_row.style.aspectRatio = 1 / 1;
  delete_row.style.height = "20px";
  delete_row.style.position = "relative";
  delete_row.style.left = "18px";
  delete_row.style.top = "5px";
  delete_row.style.cursor = "pointer";

  delete_row.addEventListener("click", (event) => {
    // Access the parent row and remove it from the table
    let rowToDelete = event.target.closest("tr");
    rowToDelete.remove();

    // Access the stored data in local storage
    let pass_data = JSON.parse(localStorage.getItem("pass_data"));

    // Identify the index of the item to be deleted
    let indexToDelete = Array.from(rowToDelete.parentElement.children).indexOf(
      rowToDelete
    );

    // Remove the corresponding item from the local storage array
    pass_data.splice(indexToDelete, 1);

    // Update the local storage with the modified array
    localStorage.setItem("pass_data", JSON.stringify(pass_data));
    console.log("Hello Guys");
  });

  username_data.style.cursor = "pointer";
  password_data.style.cursor = "pointer";
  website_data.style.cursor = "pointer";

  username_data.textContent = username.value; // Use textContent to set the value
  password_data.textContent = password.value; // Use textContent to set the value
  website_data.textContent = website.value; // Use textContent to set the value

  password_history.appendChild(table_row);
  table_row.appendChild(username_data);
  table_row.appendChild(password_data);
  table_row.appendChild(website_data);
  table_row.appendChild(delete_row);

  //Logic to clear the input fields when submit btn is clicked.
  username.value = "";
  password.value = "";
  website.value = "";
});

window.addEventListener("load", (event) => {
  let pass_data = localStorage.getItem("pass_data");

  if (pass_data != null) {
    let json = JSON.parse(pass_data);
    let password_history = document.querySelector("tbody");

    for (let item of json) {
      let table_row = document.createElement("tr");
      let username_data = document.createElement("td");
      let password_data = document.createElement("td");
      let website_data = document.createElement("td");
      let delete_row = document.createElement("img");

      delete_row.src = "trash.svg";
      delete_row.style.aspectRatio = 1 / 1;
      delete_row.style.height = "20px";
      delete_row.style.position = "relative";
      delete_row.style.left = "18px";
      delete_row.style.top = "10px";
      delete_row.style.cursor = "pointer";

      username_data.style.cursor = "pointer";
      password_data.style.cursor = "pointer";
      website_data.style.cursor = "pointer";

      username_data.textContent = item.username;
      password_data.textContent = item.password;
      website_data.textContent = item.website;

  delete_row.addEventListener("click", function () {

    this.parentNode.parentNode.removeChild(this.parentNode);

    // Remove the corresponding data from local storage
    json = json.filter((data) => data.username !== item.username);
    localStorage.setItem("pass_data", JSON.stringify(json));
  });

      password_history.appendChild(table_row);
      table_row.appendChild(username_data);
      table_row.appendChild(password_data);
      table_row.appendChild(website_data);
      table_row.appendChild(delete_row);
    }
  }
});
