# Weather Dashboard - Lorena Morales

On week 6 of my Coding Bootcamp, we created a [`Weather Dashboard`](https://lorena-rm.github.io/Weather-Dashboard-Morales/) website in which we can search current weather information of a city as well as the next 5 days.

I used 2 API calls for this homework along side with moment.js and bootstrap. Other factors played into this website as well such as google fonts.

![WeatherDashboard GIF][gif]

[gif]: ./assets/images/Screen%20Recording.gif "Screen Recording of website"


# About this Website


## Weather Information

This Website allows you to gather weather information of a city once it is searched for. Created from scratch, as a user I am presented with a blank screen with a search form on the left hand side to search for a city. when I type a city and `click` search OR hit the `ENTER` key the website renders the...
* `current` weather information and is a larger display up top and,
* the next 5 day weather cards are displayed underneath the main section

> 📝 FUTURE NOTE: When we fetch information from the first API, it returns an array of cities with that city name provided in search form but, `only` renders information of the first city from array returned... in the future I would like to add maybe an auto complete of what city/state specifically of what the user wants and rendering a more precise search!

## Past Searches

When a city is searched, not only is information being rendered on the screen, but past cities searched will now be saved to local storage and added into a list of buttons to which the user can go back on and click to be able to render weather information again without having to type it back out!

## 404 ❌

I added a 404.html to be used as a catch all in my promise function incase i get anything other then a 200 code, the screen will be rendered to a message saying 

>     `"oops something went wrong, try typing a city like Denver etc.."`

This same page will also pop up if nothing is typed into the search form and left in blank.  

## Deployed Website 🌦

A link was Provided at the top of this page..

But this one also works! 😅 ----> [`Weather Dashboard`](https://lorena-rm.github.io/Weather-Dashboard-Morales/)