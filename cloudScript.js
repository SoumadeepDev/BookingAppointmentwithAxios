// event listener for the form submission
const bookingForm = document.getElementById("bookingForm");
bookingForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneNumberInput = document.getElementById("phone");

  const name = nameInput.value;
  const email = emailInput.value;
  const phoneNumber = phoneNumberInput.value;
  saveToCloud(name, email, phoneNumber);
  checkUI();

  nameInput.value = "";
  emailInput.value = "";
  phoneNumberInput.value = "";
});

function saveToCloud(name, email, phoneNumber) {
  const userdata = {
    name: name,
    email: email,
    phone: phoneNumber,
  };

  // saving to cloud using CRUD CRUD
  axios
    .post(
      "https://crudcrud.com/api/d6e59c2a536546938d869f10b043634b/appointmentData",
      userdata
    )
    .then((res) => {
      displayUsers(res.data);
      console.log(res);
    })
    .catch((err) => console.log(err));
}

// function to display user details on page
function displayUsers(userDataList) {
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
    setupDeleteButton();
    setupEditButton();
  }
}

async function checkUI() {
  try {
    const res = await axios.get(
      "https://crudcrud.com/api/d6e59c2a536546938d869f10b043634b/appointmentData"
    );
    displayUsers(res.data);
  } catch (err) {
    console.log(err);
  }
}

// event listener for delete button
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
  // Fetch data from CRUD CRUD to get the current user list
  axios
    .get(
      "https://crudcrud.com/api/d6e59c2a536546938d869f10b043634b/appointmentData"
    )
    .then((res) => {
      let userDataList = res.data;
      if (index >= 0 && index < userDataList.length) {
        const userId = userDataList[index]._id;
        axios
          .delete(
            `https://crudcrud.com/api/d6e59c2a536546938d869f10b043634b/appointmentData/${userId}`
          )
          .then(() => {
            checkUI(); // Refresh the UI after deletion
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
}

// event listener for edit button
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
  // Fetch data from CRUD CRUD to get the current user list
  axios
    .get(
      "https://crudcrud.com/api/d6e59c2a536546938d869f10b043634b/appointmentData"
    )
    .then((res) => {
      let userDataList = res.data;
      if (index >= 0 && index < userDataList.length) {
        const user = userDataList[index];
        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("phone").value = user.phone;
      }
    })
    .catch((err) => console.log(err));
}

// when the DOM loads, load the below function
window.addEventListener("DOMContentLoaded", () => {
  checkUI();
});
