count = 0
json.array! @streamTweets do |tweet|
  json.id count
  json.partial! 'api/streams/streams', tweet: tweet
  count += 1
end
