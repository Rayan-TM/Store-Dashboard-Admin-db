import {
  validatePassword,
  validateEmail,
  validateName,
  validateUsername,
  validatePhone,
} from "../validation/userValidation.js";

const usersTable = $.getElementById("users-table");
const filterID = document.querySelector("#id");
const filterUsername = document.querySelector("#username");
const filterPassword = document.querySelector("#password");
const filterPhone = document.querySelector("#phone");
const filterEmail = document.querySelector("#email");
const btnSearch = document.querySelector("#btn-search");

let allCities = null;
let allUsers = null;

window.editUser = editUser;
window.showUserDetails = showUserDetails;
window.removeUser = removeUser;
window.filterCities = filterCities;

fetch(`${baseUrl}/location/city`)
  .then((res) => res.json())
  .then((data) => (allCities = [...data]));

function getUsers() {
  fetch(`${baseUrl}/users`)
    .then((res) => res.json())
    .then((users) => {
      allUsers = users;
      generateUsers(allUsers);
    });
}

function generateUsers(users) {
  usersTable.innerHTML = "";

  if (users.length) {
    const usersFragment = $.createDocumentFragment();

    console.log("all users =>", users);
    usersTable.insertAdjacentHTML(
      "beforeend",
      `<tr class="text-sm">
            <th>شناسه</th>
            <th>نام و نام خانوادگی</th>
            <th>نام کاربری</th>
            <th>رمز عبور</th>
            <th>شماره تماس</th>
            <th>ایمیل</th>
            <th>عملیات</th>
          </tr>`
    );
    users.forEach((user) => {
      const tableRow = $.createElement("tr");

      tableRow.insertAdjacentHTML(
        "beforeend",
        `<td>${user.id}</td>
             <td>${user.firstname} ${user.lastname}</td>
             <td>${user.username}</td>
             <td>${user.password}</td>
             <td>${user.phone}</td>
             <td>${user.email}</td>
             <td class="actions">
              <div>
                <button onclick=showUserDetails(${JSON.stringify(
                  user
                )}) title="نمایش جزییات"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="removeUser(${
                  user.id
                })" title="حذف"><i class="fa-solid fa-trash-can"></i></button>
                <button onclick=editUser(${JSON.stringify(
                  user
                )}) title="ویرایش"><i class="fa-solid fa-pencil"></i></button>
              </div>
             </td>`
      );
      usersFragment.appendChild(tableRow);
    });
    usersTable.appendChild(usersFragment);
  } else {
    usersTable.style.border = "none";

    usersTable.innerHTML = "کاربری یافت نشد";
  }
}

function showUserDetails(user) {
  detailsAlert.fire({
    text: "test",
    html: `<table>
    <tr>
      <th>شهر</th>
      <th>استان</th>
      <th>جنسیت</th>
    </tr>
    <tr>
      <td>${user.city}</td>
      <td>${user.province}</td>
      <td>${user.gender === "male" ? "مرد" : "زن"}</td>
  </table>`,
  });
}

function removeUser(userID) {
  mainAlert
    .fire({
      text: "آیا از حذف کاربر مطمئن هستید؟",
    })
    .then(
      (result) =>
        result.isConfirmed &&
        fetch(`${baseUrl}/users/${userID}`, {
          method: "DELETE",
        }).then(() => getUsers())
    );
}

function filterCities() {
  city.innerHTML = `<option value="">شهر</option>`;
  city.disabled = false;

  const provinceID = JSON.parse(province.value).id;
  const filteredCities = allCities.filter(
    (city) => city.province_id === provinceID
  );

  filteredCities.map(
    (filteredCity) =>
      (city.innerHTML += `<option value=${filteredCity.name}>${filteredCity.name}</option>`)
  );
}

async function editUser(user) {
  let provinces = null;

  await fetch(`${baseUrl}/location/province`)
    .then((res) => res.json())
    .then((data) => (provinces = [...data]));

  mainAlert
    .fire({
      title: "ویرایش کاربر",
      icon: false,
      confirmButtonText: "ویرایش",
      html: `<form class="form-edit form-filter flex flex-wrap gap-3 mt-10">
    <div class="form-group mb-5">
      <input type="text" class="form-field" id="firstname" value="${
        user.firstname
      }"/>
      <span class="input-error" id="firstnameError"></span>
      <label for="firstname" class="form-label">نام</label>
    </div>
    <div class="form-group mb-5">
      <input type="text" class="form-field" id="lastname" value="${
        user.lastname
      }"/>
      <span class="input-error" id="lastnameError"></span>
      <label for="lastname" class="form-label">نام خانوادگی</label>
    </div>
    <div class="form-group mb-5">
      <input type="text" class="form-field" id="username" value="${
        user.username
      }"/>
      <span class="input-error" id="usernameError"></span>
      <label for="username" class="form-label">نام کاربری</label>
    </div>
    <div class="form-group mb-5">
      <input type="text" class="form-field" id="password" value="${
        user.password
      }"/>
      <span class="input-error" id="passwordError"></span>
      <label for="password" class="form-label">رمزعبور</label>
    </div>
    <div class="form-group mb-5">
      <input type="text" class="form-field" id="phone" value="${user.phone}"/>
      <span class="input-error" id="phoneError"></span>
      <label for="phone" class="form-label">شماره تماس</label>
    </div>
    <div class="form-group mb-5">
      <input type="text" class="form-field" id="email" value="${user.email}"/>
      <span class="input-error" id="emailError"></span>
      <label for="email" class="form-label">ایمیل</label>
    </div>
    <div class="form-group mb-5">
      <select id="city" class="form-field" required>
        <option value="">شهر</option>
        <option value=${user.city} selected>${user.city}</option>
      </select>
      <span class="input-error" id="cityError"></span>
      <label for="city" class="form-label invisible">شهر</label>
    </div>

    <div class="form-group mb-5">
      <select id="province" class="form-field" required onchange=filterCities()>
        <option value="">استان</option>
        ${provinces.map(
          (province) =>
            `<option ${
              province.name === user.province && "selected"
            } value=${JSON.stringify(province)}>${province.name}</option>`
        )}
      </select>
      <span class="input-error" id="provinceError"></span>
      <label for="province" class="form-label invisible">استان</label>
    </div>

    <div class="form-group mb-5">
      <select id="gender" class="form-field" required>
        <option value="">جنسیت</option>
        ${["male", "female"].map(
          (gender) =>
            `<option ${gender === user.gender && "selected"} value=${gender}>${
              gender === "male" ? "مرد" : "زن"
            }</option>`
        )}
      </select>
      <span class="input-error" id="genderError"></span>

      <label for="gender" class="form-label invisible">جنسیت</label>
    </div>
  </form>`,
      didOpen: () => {
        const popup = swal.getPopup();
        checkInputsValidation();
      },
      preConfirm: () => {
        const inputs = [
          lastnameError,
          firstnameError,
          usernameError,
          passwordError,
          emailError,
          phoneError,
          cityError,
          provinceError,
          genderError,
        ];
        firstnameError.innerText = validateName(
          firstname.value,
          "firstname",
          2
        );
        lastnameError.innerText = validateName(lastname.value, "lastname", 4);
        usernameError.innerText = validateUsername(username.value);
        passwordError.innerText = validatePassword(password.value, 8);
        emailError.innerText = validateEmail(email.value);
        phoneError.innerText = validatePhone(phone.value);
        cityError.innerText = !city.value ? "select city" : "";
        provinceError.innerText = !province.value ? "select province" : "";
        genderError.innerText = !gender.value ? "select gender" : "";
        const hasInputErrors = inputs.some((input) => input.innerText !== "");

        if (hasInputErrors) {
          Swal.showValidationMessage("لطفا فیلد پاسخ را پر کنید");
        }
      },
    })
    .then((result) => {
      if (result.isConfirmed) {
        const updatedUser = {
          city: city.value,
          gender: gender.value,
          province: JSON.parse(province.value).name,
          email: email.value,
          firstname: firstname.value,
          lastname: lastname.value,
          password: password.value,
          phone: phone.value,
          username: username.value,
        };
        fetch(`${baseUrl}/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      }
    });
}

window.addEventListener("load", getUsers);

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  generateUsers(
    filter({
      id: filterID.value.trim(),
      username: filterUsername.value.trim(),
      password: filterPassword.value.trim(),
      phone: filterPhone.value.trim(),
      email: filterEmail.value.trim(),
    })
  );
});

function filter({ id, username, password, phone, email }) {
  const filteredItems = [...allUsers]
    .filter((user) => (id ? user.id == id : user))
    .filter((user) => (username ? user.username == username : user))
    .filter((user) => (password ? user.password == password : user))
    .filter((user) => (phone ? user.phone == phone : user))
    .filter((user) => (email ? user.email == email : user));

  return filteredItems;
}
