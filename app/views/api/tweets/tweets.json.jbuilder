json.trends @trends do |trend|
  json.name trend.name
  json.volume trend.tweet_volume
end

# json.partial! 'api/tweets/tweets', tweets: @tweets

count = 0

json.tweets @geo_tweets do |tweet|
 json.id count
 json.text tweet[:text]
 json.coordinates tweet[:coordinates]
 json.created_at tweet[:created_at]
 json.user_name tweet[:user][:screen_name]
 json.user_image tweet[:user][:profile_image_url_https]
 json.place tweet[:place]

 count += 1
end
