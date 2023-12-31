//event listener for the form submission
const bookingForm = document.getElementById("bookingForm");
bookingForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneNumberInput = document.getElementById("phone");

  const name = nameInput.value;
  const email = emailInput.value;
  const phoneNumber = phoneNumberInput.value;

  saveToLocalStorage(name, email, phoneNumber);
  checkUI();

  nameInput.value = "";
  emailInput.value = "";
  phoneNumberInput.value = "";
});

function saveToLocalStorage(name, email, phoneNumber) {
  const userdata = {
    name: name,
    email: email,
    phone: phoneNumber,
  };
  let userDataList = JSON.parse(localStorage.getItem("userDataList")) || [];
  userDataList.push(userdata);
  localStorage.setItem("userDataList", JSON.stringify(userDataList));
}
// function to display user details on page
function displayUsers() {
  const userDataList = JSON.parse(localStorage.getItem("userDataList"));
  const bookingData = document.getElementById("bookingData");
  bookingData.innerHTML = ""; // Clear the previous data

  if (userDataList && userDataList.length > 0) {
    userDataList.forEach((userData, index) => {
      const userEntry = document.createElement("div");
      userEntry.classList.add("user-entry");
      userEntry.innerHTML = `
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Phone Number:</strong> ${userData.phone}</p>
        <button class="edit-button" data-index="${index}">Edit</button>
        <button class="delete-button" data-index="${index}">Delete</button>
      `;
      bookingData.appendChild(userEntry);
    });
  }
}
function checkUI() {
  displayUsers();
  setupDeleteButton();
  setupEditButton();
}
//event listener for delete button, we shall create a function which
//would have the event listener to delete user details while clicking delete button
function setupDeleteButton() {
  const deleteBtn = document.querySelectorAll(".delete-button");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const dataIndex = e.target.getAttribute("data-index");
      deleteUserByIndex(dataIndex);
    });
  });
}
function deleteUserByIndex(index) {
  let userDataList = JSON.parse(localStorage.getItem("userDataList")) || [];
  if (index >= 0 && index < userDataList.length) {
    userDataList.splice(index, 1);
    localStorage.setItem("userDataList", JSON.stringify(userDataList));
    checkUI();
  }
}

//event listener for edit button, we shall create a function which
//would have the event listener to edit user details while clicking edit button
function setupEditButton() {
  const editBtn = document.querySelectorAll(".edit-button");
  editBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const dataIndex = e.target.getAttribute("data-index");
      populateUserDetailsForEdit(dataIndex);
      deleteUserByIndex(dataIndex);
    });
  });
}

function populateUserDetailsForEdit(index) {
  let userDataList = JSON.parse(localStorage.getItem("userDataList")) || [];
  if (index >= 0 && index < userDataList.length) {
    const user = userDataList[index];
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
  }
}

//when the dom loads page load the below function
checkUI();
