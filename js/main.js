
const dayName = document.getElementById("dayName");
const dayNumber = document.getElementById("dayNumber");
const todayMonthOfCity = document.getElementById("todayMonthOfCity");

const todayLocation = document.getElementById("todayLocation");
const todayTemp = document.getElementById("todayTemp");
const todayConditionImg = document.getElementById("todayConditionImg");
const todayText = document.getElementById("todayText");

const todayHumidity = document.getElementById("todayHumidity");
const todayWind = document.getElementById("todayWind");
const todayWindDirection = document.getElementById("todayWindDirection");

const nextDayName = document.getElementById("nextDayName");

const nextConditionImg = document.getElementById("nextConditionImg");
const nextMaxTemp = document.getElementById("nextMaxTemp");
const nextMinTemp = document.getElementById("nextMinTemp");
const nextConditionText = document.getElementById("nextConditionText");

const afterNextDayName = document.getElementById("afterNextDayName");

const afterNextConditionImg = document.getElementById("afterNextConditionImg");
const afterNextMaxTemp = document.getElementById("afterNextMaxTemp");
const afterNextMinTemp = document.getElementById("afterNextMinTemp");
const afterNextConditionText = document.getElementById(
  "afterNextConditionText"
);


const searchLocationInput = document.getElementById("searchLocationInput");

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords);

  let myLatitude = position.coords.latitude;
  let myLongitude = position.coords.longitude;
  getWeatherData(`${myLatitude},${myLongitude}`);
});

searchLocationInput.addEventListener('input' , (e)=>{
    let currentValue = e.target.value; 
    console.log(currentValue)
    getWeatherData(currentValue)
})




async function getWeatherData(query) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=ec41603be898411e80e133810231908`
  );

  let data = await res.json();
  console.log(data);
  displayWeatherData(data);
  displayTommorrowData(data);
  displayAfterTommorrowData(data)
}

function displayWeatherData(data) {
  let todayDate = data.current.last_updated; 
  console.log(todayDate);

  let myDateName = new Date(todayDate);
  console.log(myDateName, "Date");

  let todayName = myDateName.toLocaleString("en-us", { weekday: "long" }); 

  dayName.innerHTML = todayName;

  let todayMonth = myDateName.toLocaleString("en-us", { month: "long" }); 
  let todayDay = myDateName.getDate(); 

  dayNumber.innerHTML = todayDay;
  todayMonthOfCity.innerHTML = todayMonth;

  todayLocation.innerHTML = data.location.country;
  todayTemp.innerHTML = data.current.temp_c;

  todayText.innerHTML = data.current.condition.text;

  let currentImg = data.current.condition.icon;
  let currentSrc = `https:${currentImg}`;

  todayConditionImg.setAttribute("src", currentSrc);

  todayHumidity.innerHTML = data.current.humidity;
  todayWind.innerHTML = data.current.wind_kph;
  todayWindDirection.innerHTML = data.current.wind_dir;
}

function displayTommorrowData(data) {
  let tommorrowDate = data.forecast.forecastday[1];
  console.log(tommorrowDate);

  let myTommorrowDate = new Date(tommorrowDate.date);

  let myTommorrowDateName = myTommorrowDate.toLocaleString("en-us", {
    weekday: "long",
  });

  nextDayName.innerHTML = myTommorrowDateName;

  let tommorrowImg = tommorrowDate.day.condition.icon;
  let tommorrowSrc = `https:${tommorrowImg}`

  nextConditionImg.setAttribute('src' , tommorrowSrc);

  nextMaxTemp.innerHTML = tommorrowDate.day.maxtemp_c;
  nextMinTemp.innerHTML = tommorrowDate.day.mintemp_c

  nextConditionText.innerHTML = tommorrowDate.day.condition.text;
}


function displayAfterTommorrowData(data) {
    

    let afterTommorrowDate = data.forecast.forecastday[2];
    console.log(afterTommorrowDate);
  
    let myAfterTommorrowDate = new Date(afterTommorrowDate.date);
  
    let myAfterTommorrowDateName = myAfterTommorrowDate.toLocaleString("en-us", {
      weekday: "long",
    });
  
    afterNextDayName.innerHTML = myAfterTommorrowDateName;

    
  let myAfterTommorrowImg = afterTommorrowDate.day.condition.icon;
  let myAfterTommorrowSrc = `https:${myAfterTommorrowImg}`

  afterNextConditionImg.setAttribute('src' , myAfterTommorrowSrc);

  afterNextMaxTemp.innerHTML = afterTommorrowDate.day.maxtemp_c;
  afterNextMinTemp.innerHTML = afterTommorrowDate.day.mintemp_c

  afterNextConditionText.innerHTML = afterTommorrowDate.day.condition.text;
}