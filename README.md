# WeatherDashboard
06 Server-Side APIs: Weather Dashboard

## Description 

This single page website uses the openweathermap.org API's to provide weather based on user input. The user is able to enter search criteria in the format "city,st" (city comma 2 letter state) and will get the current weather along with the 5 day forecast. Cities are stored in local storage for the user's past searches from most recent to oldest. The page defaults to Hololulu as a fun starting value so the page is not blank. The user can enter a new city or click on a city in their history and see teh current information.

There are probably many different ways to get the "city" related information to the api and there were different api options to get the data. The api with all the information to meet requirements was the One Call API which requires latitude and longitude as opposed to city and state. The only true way to get the city that the user intends (to me) is to allow them to enter both city and state in order to make the results unique or close to unique as opposed to just city; therefore, I chose the new Geocoding API and passed in CITY,ST from the user to get back lat and long and then pass that to the One Call API.

The logic is not perfect as it does not validate state for example which is a future enhancement but it eliminates the alternative which is to pass city only and get back an arbitrary "Springfield" for which there are 50.

The page is responsive and shows all sections vertically once the screen width is less than 700px. 

## Table of Contents (Optional)

This README is very not long but here is a table of contents nonetheless.

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


## Installation

The site is a single page html document with css, javascript and images so installation is straightforward: (1) push code to Github (2) Navigate to live link and make sure the site displays correctly. It does require an API key to opeweather which is currently stored inappropriately in javascript.

The site can be reached at [Weather Dashboard](https://mark-artim.github.io/WeatherDashboard/) 

## Usage 

The current website as of 3/15/2021 looks like this:

This is the site on a pc/laptop screen:
![Live Site Screenshot](/assets/images/ScreenshotPC.jpeg)

Here is the mobile look and feel:
![Live Site Screenshot](/assets/images/mobile_screenshot1.jpeg)

More mobile...
![Live Site Screenshot](/assets/images/mobile_screenshot2.jpeg)


## Credits

I worked with Chris Martinez & Kat Poulos (TA) who helped with the logic for clearing out elements prior to rebuilding them which was a critical need.

## License

I am not sure what exactly we shoudl do for licensing and I (hope) itis not critical to this assignemnt but it might look soemthign like this:

All rights, including copyright, of all text, images, code, information, and other material contained in the mark-artim/github.io/WeatherDashboard.com website are owned by WeatherDashboard.com and are protected by International Copyright Legislation.

---

## Contributing

None at this time.

## Tests

No automated test exist at this time.
