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

[gif here]

* **Frontend:** React.js/Redux/JQuery/Google Maps API/Material UI
* **Backend:** Ruby on Rails/Twitter API
* **Database:** PostgreSQL

## Features & Implementation

### Streaming

Tweet The Bay utilizes the [Twitter Streaming API][twitterlink] in order to provide a live feed of Tweets from the San Francisco Bay Area. Twitter's public streaming API comprises 1% of all of tweets (known as the "firehose").

[twitterlink]: https://dev.twitter.com/streaming/overview

A script establishes and maintains a long-term connection with the Twitter Streaming API, collecting all geolocated tweets that are within a given bounding box, set roughly to the coordinates of the San Francisco Bay Area. The coordinates used for this initial filter are between 36.9477-38.5288° N and 121.4099-123.6325° W.

Twitter's tweets are geolocated either by a tweet's actual location coordinates, or, if present, the "place" coordinates where the account was created, like "San Francisco" or "Chicago."" (For more detail, see: [Twitter Streaming API Request Parameters][locationparameters].) In order to most accurately depict geolocation for our livestream, we parse the tweets for those that have true coordinates associated with the tweet instead of just place. We also ran a second filter through our results to guarantee that the coordinates were located in the Bay Area, as sometimes tweets based in Southern California, Yosemite, and Tahoe made it through Twitter's location filter.

[locationparameters]:https://dev.twitter.com/streaming/overview/request-parameters#locations

At this point it was necessary to establish secondary filters to eliminate spam data. A large amount of the data we were receiving was job postings, but we also discovered a grouping of spam accounts located in the Farallon Islands, so those specific coordinates needed to be blacklisted, too. The code for all the filters is as follows:

```Ruby

stream.filter(locations: "-123.632497,36.9476967925,-121.4099121094,38.5288302896") do |tweet|
  if tweet.attrs[:coordinates]
    unless job_posting_blacklist.any? { |phrase| tweet.text.include?(phrase) } ||
      screen_name_blacklist.any? { |term| tweet.user.screen_name.include?(term) } ||
      farallon_islands_spam?(tweet.attrs[:coordinates]) ||
      not_bay_area_coordinates?(tweet.attrs[:coordinates])

```

Once through these filters, the tweets are then saved to a database. The livestream component of the website periodically queries the database for tweets that were created shortly before the user first visits the livestream page. By default, if there are no tweets yet, the page will offer up the last tweet in the database, providing the user with immediate feedback after switching from the search component to the streaming component, and alerting them that more tweets are incoming.

```Ruby

class Api::StreamsController < ApplicationController
  def index
    timeMountUTC = params[:timeNowUTC].to_i
    if Tweet.where("time_utc > #{timeMountUTC}").empty?
      @streamTweets = Tweet.last(1)
    else
      @streamTweets = Tweet.where("time_utc > #{timeMountUTC}").limit(250).reverse
    end

    render :index
  end
end

```

### Search

When first entering search mode, the sidebar lists a few of the top currently trending topics in the Bay Area as a suggestion.

When searching, the app takes the bounding-box coordinates of the current map area and sends a request to the Twitter API to send back results within those coordinates. Rails processes the results and sends them to Redux containers on the front-end to be displayed in the map and sidebar.

Due to the limitations of the Twitter API, the search function can only return 100 results from the last 7 days of Twitter history. Since only about ~3% of tweets have exact geolocation data, sometimes only a handful of results can be mapped out.

After searching, the sidebar populates with search results that can be clicked on to focus the map on that particular tweet.

## Future directions for the project

### Expand streaming to more cities/areas

Due to limitations in the Twitter API, we currently only support streaming in the greater Bay Area. We would like to add more cities in the future, and have a dropdown menu from which a different city/area can be selected.

### Search by user/media

We would like to implement search for more than just keywords. If a Twitter account could be searched for, users could see their own tweets mapped out. If we implemented a search for media, we would display that particular media in the sidebar, and support playing videos in the modal. Additionally, the livestream component of the website could save pointers to these media to the database, allowing us to, for example, set up a "Photo Map" portion of the website that display only pictures taken in certain locations.

### Twitter authentication and tweeting from our own app

It would be awesome if a user could log in to Twitter within our app, send a tweet out, and see it mapped live. One limitation to the Twitter Streaming API is that it only grabs ~1% of all tweets being sent out, so an exact implementation would probably require enterprise-level access to the Twitter API.
