json.trends @trends do |trend|
  json.name trend.name
  json.volume trend.tweet_volume
end

json.partial! 'api/tweets/tweets', tweets: @tweets
