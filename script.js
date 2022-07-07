// For Weather Today side (left-side)
const toDay = document.querySelector('.day')
const toDate = document.querySelector('.date')
const loc = document.querySelector('.loc')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDesc = document.querySelector('.weather-desc')

// To change the date format from database (weather API)
const dayFormatter = new Intl.DateTimeFormat('en-GB', { weekday: "long"})
const dateFormatter = new Intl.DateTimeFormat('en-GB', {day: "numeric", month: "long", year: "numeric"})

// date format for the next 2 days
const nextDayFormatter = new Intl.DateTimeFormat('en-GB', { weekday: "short"})

// notes :
// 'id' => lokalnya - bahasa indonesia. kalau inggris pakai "en-US" (US eng) / "en-GB" (British eng)
// weekday = "long" => nama hari lengkap ("senin", dll)
// year = "numeric" => tahun ditulis lengkap ("2022", dll)



// For Weather Info side (right-side)
const info = document.querySelectorAll('.info')
const value = document.querySelectorAll('.value')
const nextDay = document.querySelectorAll('.next-day')
const dayIcon = document.querySelectorAll('.day-icon')
const dailyTemp = document.querySelectorAll('.daily-temp')

// variable for default location
let searchedLoc = 'Bekasi'

// make a button & form functionality
const clickButton = document.querySelector('.search-btn')
const locationInput = document.querySelector('.input-loc')
clickButton.addEventListener('click', function() {
    if(!locationInput.value) {
        locationInput.style.border = '2px solid red'
        locationInput.placeholder = 'Isi Nama Kota ❗'
        locationInput.addEventListener('click', function() {
            locationInput.style.border = ''
            locationInput.placeholder = 'Search City...'
        })
    }

    searchedLoc = locationInput.value 
    fetchWeatherData()
    locationInput.value = ''
})

// function to fetch weather data
function fetchWeatherData() {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=b72e7a4c690f476bbad133438222506&q=${searchedLoc}&days=3&aqi=no&alerts=no`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)

            // current date info
            const currentDate = new Date(`${data.current.last_updated}`)
            toDay.innerHTML = `${dayFormatter.format(currentDate)}`
            toDate.innerHTML = `${dateFormatter.format(currentDate)}`

            // current/searched location info
            loc.innerHTML = `${data.location.name}, ${data.location.country}`

            // icon that represent today's weather
            weatherIcon.setAttribute('src', `${data.current.condition.icon}`)

            // current temperature in celcius
            temperature.innerHTML = `${data.current.temp_c}ºC`

            // current weather description
            weatherDesc.innerHTML = `${data.current.condition.text}`

            // manipulate weather-info side
            value[0].innerHTML = `${data.current.cloud}%`
            value[1].innerHTML = `${data.current.humidity}%`
            value[2].innerHTML = `${data.current.wind_kph} km/h`

            // var for next 2 days date with a new format
            const nextDay1 = new Date(`${data.forecast.forecastday[1].date}`)
            const nextDay2 = new Date(`${data.forecast.forecastday[2].date}`)
            
            // add 2 new attribute 'src' into an <img> element in week-list
            dayIcon[0].setAttribute('src', `${data.forecast.forecastday[1].day.condition.icon}`)
            dayIcon[1].setAttribute('src', `${data.forecast.forecastday[2].day.condition.icon}`)
            
            // DOM manipulation, day name, for each <li> element in week-list
            nextDay[0].innerHTML = `${nextDayFormatter.format(nextDay1)}`
            nextDay[1].innerHTML = `${nextDayFormatter.format(nextDay2)}`

            // next 2 days temperature
            dailyTemp[0].innerHTML = `${data.forecast.forecastday[1].day.avgtemp_c}ºC`
            dailyTemp[1].innerHTML = `${data.forecast.forecastday[2].day.avgtemp_c}ºC`

            // console.log(nextDayFormatter.format(nextDay1))
            // console.log(nextDayFormatter.format(nextDay2))
            // console.log(nextDayFormatter.format(nextDay3))
        })
}
fetchWeatherData()
