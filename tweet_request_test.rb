require 'twitter'

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = "Ea7a0HZxrWMXJoLK6eBTqhUZZ"
  config.consumer_secret     = "x0IT6hwK55jc7fm2P532PTFC7PzO80svYq6Suj3Nm0m6crNO9b"
  config.access_token        = "825077910197268480-7BA4vapjGAiyM1FVt4iIpFDpX7wxkT7"
  config.access_token_secret = "BrSLGMDakIU4JDTThKQ2eKnVplh0m2iLc6wbGJIOLt577"
end

client.user("mjaltamirano13")

# client.search("tacos", geocode: "37.754880,-122.410066,12mi").take(40).each do |tweet|
#   puts tweet.text
#   puts tweet.created_at
#   puts tweet.user.screen_name
#   puts tweet.user.profile_image_url_https
# end

client.trends(id = 2487956).take(10).each do |trend|
  puts trend.name
  puts trend.tweet_volume
end


# newclient = Twitter::Streaming::Client.new do |config|
#   config.consumer_key        = "Ea7a0HZxrWMXJoLK6eBTqhUZZ"
#   config.consumer_secret     = "x0IT6hwK55jc7fm2P532PTFC7PzO80svYq6Suj3Nm0m6crNO9b"
#   config.access_token        = "825077910197268480-7BA4vapjGAiyM1FVt4iIpFDpX7wxkT7"
#   config.access_token_secret = "BrSLGMDakIU4JDTThKQ2eKnVplh0m2iLc6wbGJIOLt577"
# end


# client.update("I'm tweeting with @gem!")

#
# client.filter(locations: "-122.75,36.8,-121.75,37.8") { |tweet| puts tweet.text }
#
# Twitter Attrs (key into object with all the attributes)
#
# path: /1.1/search/tweets.json
# tacosearch = client.search("tacos", :geocode => "37.754880,-122.410066,3mi")
#
# trumpsearch has an .attrs key that holds all the data.
#
# trumpsearch.attrs has two values: :statuses, :search_metadata, probably don't need the search metadata.
#
# trumpsearch.attrs[:statuses] is an array of tweet data.
# trumpsearch.attrs[:statuses][45] gets at # 46 in the array.
# We may want to only capture tweet data where place !== nil.
# e.g.
# tweet data desired:
#
# Tweet text: trumpsearch.attrs[:statuses][45][:text]
#
# USER INFO:
# name: trumpsearch.attrs[:statuses][45][:user][:name]
# screen_name: trumpsearch.attrs[:statuses][45][:user][:screen_name]
# location: trumpsearch.attrs[:statuses][45][:location]
# description: trumpsearch.attrs[:statuses][45][:description]
# url (website): trumpsearch.attrs[:statuses][45][:user][:url]
# created_at (date): trumpsearch.attrs[:statuses][45][:user][:created_at]
# profile picture: trumpsearch.attrs[:statuses][45][:user][:profile_image_url_https]
# Small version example: https://pbs.twimg.com/profile_images/483347294255722497/4-XkSCvn_normal.jpeg
# Actual size example (omit _normal): https://pbs.twimg.com/profile_images/483347294255722497/4-XkSCvn.jpeg
# 400x400 version (may be smaller, may be larger): https://pbs.twimg.com/profile_images/483347294255722497/4-XkSCvn_400x400.jpeg
# retweet_count: trumpsearch.attrs[:statuses][45][:retweet_count]
# favorite_count: trumpsearch.attrs[:statuses][45][:user][:favorite_count]]
#
# PLACE INFO:
#
# place --> bounding box --> coordinates [[[-122.514926, 37.708075], [-122.357031, 37.708075], [-122.357031, 37.833238], [-122.514926, 37.833238]]]
# tacosearch.attrs[:statuses][0][:place]
#
#
#
# This function gets a sample of ALL TWEETS AND THEIR TEXT
#
# client.sample do |object|
#   puts object.text if object.is_a?(Twitter::Tweet)
# end
#
# Stream mentions of coffee or tea
#
# topics = ["tacos"]
# newclient.filter(track: topics.join(",")) do |object|
#   puts object.text if object.is_a?(Twitter::Tweet)
# end

# newclient.filter(locations: "-122.75,36.8,-121.75,37.8") do |tweet|
#   puts tweet
# end
