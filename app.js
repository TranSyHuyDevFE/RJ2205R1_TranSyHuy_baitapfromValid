//Buoc 1: DOM đến các thẻ (value)
var username = document.querySelector("#username");
var email = document.querySelector("#email");
var phone = document.querySelector("#phone");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#confirm-password");
var form = document.querySelector("form");

//Lên kế hoạch tạo function sử dụng chung cho tất cả các Input
//--Hiển thị Error vào thẻ small
//Bước 2: Viết hàm để hiện thị thẻ(small) chứa tên lỗi
//
function showError(input, message) {
  //input.parentElement dùng để gọi thẻ cha bao bọc thằng input (<div class="form-control"></div>)
  //=> mục đích dùng để querySelector các thẻ tương tự như: small,p,li,...
  let parent = input.parentElement;
  let small = parent.querySelector("small");

  parent.classList.add("error");
  small.innerText = message;
}

function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");

  parent.classList.remove("error");
  small.innerText = "";
}
//Bước 3: Viết hàm check lỗi để trống!
function checkEmptyError(listInput) {
  //sử dụng hàm forEach để kiểm tra tưng phần tử trong mảng
  listInput.forEach((input) => {
    // sử dụng trim() để chuẩn hóa đầu vào của giá trị(loại bỏ khoảng trắng người dùng vô tình nhập vào)
    input.value = input.value.trim();
    //validation sử dụng ! cho việc return true(phủ định else)
    if (!input.value) {
      showError(input, "No Empty Here!");
    } else {
      showSuccess(input);
    }
  });
}
//Bước 4: Viết hàm Validation cho các value
//Check-Regex Email
function checkEmaiError(input) {
  const regexEmail = /^[A-Za-z0-9]+[A-Za-z0-9]*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)$/;
  input.value = input.value.trim();
  let isEmailError = !regexEmail.test(input.value);
  if (regexEmail.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email Invalid");
  }
  return isEmailError;
}
function checkNumberError(input) {
  const regexPhone = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  input.value = input.value.trim();
  if (regexPhone.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Phone Number Invalid");
  }
}
//check-Regex Username
function checkUserError(input) {
  const regexUser = /^[_a-z0-9]{6,}$/;
  input.value = input.value.trim();
  if (regexUser.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "User Invalid");
  }
}
//Check-Regex Username & PassWord
function checkLengthError(input, min, max) {
  input.value = input.value.trim();

  if (input.value.length < min) {
    showError(input, `Must have at least ${min} characters!`);
    return true;
  }

  if (input.value.length > max) {
    showError(input, `No more than ${max} characters!`);
    return true;
  }
  return false;
}
//Bước 5: So sánh Password
function checkMathPassWordError(passwordInput, cfPassword) {
  if (passwordInput.value !== cfPassword.value) {
    showError(cfPassword, "Password does not match");
    return true;
  }
  return false;
}
//goi den nut Button CallBack()
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isEmptyError = checkEmptyError([
    username,
    email,
    password,
    confirmPassword,
  ]);

  let isEmailError = checkEmaiError(email);
  let isPhoneError = checkNumberError(phone);
  let isUsernameLengthError = checkUserError(username);
  let isPasswordLengthError = checkLengthError(password, 3, 10);
  let isMatchError = checkMathPassWordError(password, confirmPassword);

  if (
    isEmptyError ||
    isPhoneError ||
    isEmailError ||
    isUsernameLengthError ||
    isPasswordLengthError ||
    isMatchError
  ) {
    //do nothing
  } else {
    //logic, call API...
  }
});
