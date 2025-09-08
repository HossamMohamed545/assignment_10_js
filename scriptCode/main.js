var inputName = document.getElementById("inputName");
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var Sign = document.getElementById("Sign");
var Submit = document.getElementById("Submit");
var errorBox = document.getElementById("errorBox");
let users = JSON.parse(localStorage.getItem("users")) || [];

function validationEmail() {
  let email = inputEmail.value.trim();
  let pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!pattern.test(email)) {
    return false;
  }
  return true;
}

function validatePassword() {
  let password = inputPassword.value.trim();

  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!/[@$!%*?&]/.test(password)) {
    return "Password must contain at least one special character (@, $, !, %, *, ?, &).";
  }

  return true;
}

inputEmail.oninput = function () {
  if (validationEmail() == true) {
    inputEmail.classList.remove("is-invalid");
  } else {
    inputEmail.classList.add("is-invalid");
  }
};

inputPassword.oninput = function () {
  if (validatePassword() == true) {
    inputPassword.classList.remove("is-invalid");
  } else {
    inputPassword.classList.add("is-invalid");
  }
};

Sign.onclick = function () {
  if (Sign.textContent.includes("SignUP")) {
    Sign.innerHTML = "log In";
    Submit.innerHTML = "Sign UP";
    inputName.style.display = "block";
  } else if (Sign.textContent.includes("log In")) {
    Sign.innerHTML = "SignUP";
    Submit.innerHTML = "Log in";
    inputName.style.display = "none";
  }
};

Submit.onclick = function () {
  if (Sign.textContent.includes("log In")) {
    for (let i = 0; i < users.length; i++) {
      if (inputEmail.value == users[i].email) {
        errorBox.classList.remove("d-none");
        errorBox.innerText = "This account is already registered ⚠️";
        return false;
      }
    }
    if (validationEmail() == true && validatePassword() == true) {
      users.push({
        name: inputName.value,
        email: inputEmail.value,
        password: inputPassword.value,
      });
      localStorage.setItem("users", JSON.stringify(users));
      errorBox.classList.add("d-none");
      UserPage1 = inputName.value;
      emailPage1 = inputEmail.value;
      window.location.href = `../one.html?name=${encodeURIComponent(
        inputName.value
      )}&email=${encodeURIComponent(inputEmail.value)}`;
    } else {
      if (validationEmail() != true) {
        errorBox.classList.remove("d-none");
        errorBox.innerText = "Please enter a valid email address";
      } else if (validatePassword() != true) {
        errorBox.classList.remove("d-none");
        errorBox.innerText = `${validatePassword()}`;
      }
    }
  } else if (Sign.textContent.includes("SignUP")) {
    for (let i = 0; i < users.length; i++) {
      if (inputEmail.value == users[i].email && inputPassword.value == users[i].password) {
        window.location.href = `../one.html?name=${encodeURIComponent(
        users[i].name
      )}&email=${encodeURIComponent(users[i].email)}`;
        return true;
      }else{
        errorBox.classList.remove("d-none");
        errorBox.innerText = "Invalid email or password ❌";
      }
    }
  }
};
