// 로그인
const loginForm = document.querySelector("#loginForm");
const loginInput = document.querySelector("#loginForm input");
const userNameContainer = document.querySelector("#userName");

function handleLoginBtn(event) {
  event.preventDefault();
  const userName = loginInput.value;
  localStorage.setItem("userName", userName);
  userNameContainer.innerText = `Welcome ${userName}!`;
  loginInput.value = "";
  loginInput.classList.add("hidden");
}

const savedUserName = localStorage.getItem("userName");

if (savedUserName !== null) {
  console.log(savedUserName);
  loginForm.classList.add("hidden");
  userNameContainer.innerText = `Welcome ${savedUserName}!`;
} else {
  loginForm.classList.remove("hidden");
  loginForm.addEventListener("submit", handleLoginBtn);
}

//========================================================
// 시간
const clock = document.querySelector("#clock h1");

setInterval(getTime, 1000);

function getTime() {
  const date = new Date();
  let second = String(date.getSeconds()).padStart(2, "0");
  let minute = String(date.getMinutes()).padStart(2, "0");
  let hours = String(date.getHours()).padStart(2, "0");

  clock.innerText = `${hours} : ${minute} : ${second}`;
}

// weather
API_KEY = "dadec986001a3b4b097ba96dd6891210";

function onGeo(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherDocument = document.querySelector("#weatherImage");
      const name = document.querySelector("#weather span:first-child");

      name.innerText = data.name;
      const weatherImage = document.createElement("img");
      weatherImage.src = `/src/asset/weather/${data.weather[0].main}.svg`;
      weatherDocument.appendChild(weatherImage);
    });
  console.log(url);
}
function onGeoError() {
  alert("cant find you!");
}

navigator.geolocation.getCurrentPosition(onGeo, onGeoError);

// background

const rand = Math.floor(Math.random() * 5);
const image = `/src/asset/background/${rand}.jpeg`;
document.body.style.backgroundImage = `url(${image})`;
