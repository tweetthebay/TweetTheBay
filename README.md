# Tweet The Bay

A Twitter mapping project by [Michael Altamirano][michael], [Nico Geraldo][nico], [Adrian Lobdill][adrian],  and [Elif Sezgin][elif].

[Live App][live]

[live]: http://baytweets.herokuapp.com/


[michael]: https://github.com/mjaltamirano
[adrian]: https://github.com/slolobdill44
[nico]: https://github.com/ngeeraldo
[elif]: https://github.com/elifsezgin


Wouldn’t you like to know where people are tweeting about tacos?

Twitter has some search features, but not a great way to geolocate tweets. Thanks to Tweet The Bay, you can now see a stream of tweets mapped out live as they are tweeted, or search by keyword in order to geolocate tweets from the last 7 days.

[screenshot/gif here]

* **Frontend:** React.js/Redux/JQuery/Google Maps API/Material UI
* **Backend:** Ruby on Rails/Twitter API
* **Database:** PostgreSQL

## Features & Implementation

### Streaming

Tweet The Bay

### Search

When first entering search mode, the sidebar lists a few of the top currently trending topics in the Bay Area as a suggestion.

When searching, the app takes the bounding-box coordinates of the current map area and sends a request to the Twitter API to send back results within those coordinates. Rails processes the results and sends them to Redux containers on the front-end to be displayed in the map and sidebar.

Due to the limitations of the Twitter API, the search function can only return 100 results from the last 7 days of Twitter history. Since only about ~3% of tweets have exact geolocation data, sometimes only a handful of results can be mapped out.

After searching, the sidebar populates with search results that can be clicked on to focus the map on that particular tweet.

## Future directions for the project

### Expand streaming to more cities/areas

Due to limitations in the Twitter API, we currently only support streaming in the greater Bay Area. We would like to add more cities in the future, and have a dropdown menu from which a different city/area can be selected.

### Search by user/media

We would like to implement search for more than just keywords. If a Twitter account could be searched for, users could see their own tweets mapped out. If we implemented a search for media, we would display that particular media in the sidebar, and support playing videos in the modal.

### Twitter authentication and tweeting from our own app

It would be awesome if a user could log in to Twitter within our app, send a tweet out, and see it mapped live. One limitation to the Twitter Streaming API is that it only grabs ~1% of all tweets being sent out, so an exact implementation would probably require enterprise-level access to the Twitter API.
