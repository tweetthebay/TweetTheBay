@tweets.each do |tweet|
  json.set! tweet.id do
    json.partial! 'streams', tweet: tweet
  end
end

# json.partial! 'api/tweets/tweets', tweets: @tweets
