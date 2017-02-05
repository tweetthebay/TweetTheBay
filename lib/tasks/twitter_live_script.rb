require 'twitter'

newclient = Twitter::Streaming::Client.new do |config|
  config.consumer_key        = ENV['CONSUMER_API_KEY']
  config.consumer_secret     = ENV['CONSUMER_API_SECRET']
  config.access_token        = ENV['ACCESS_TOKEN']
  config.access_token_secret = ENV['ACCESS_TOKEN_SECRET']
end

def farallon_islands_spam?(tweet_coordinates_hash)
  coordinates_array = tweet_coordinates_hash[:coordinates]
  long = coordinates_array[0]
  lat = coordinates_array[1]
  long.between?(-123.1, -122.9) && lat.between?(37.6, 37.8)
end

def bay_area_coordinates?(tweet_coordinates_hash)
  coordinates_array = tweet_coordinates_hash[:coordinates]
  long = coordinates_array[0]
  lat = coordinates_array[1]
  !long.between?(-123.632497, -121.4099121094) || !lat.between?(36.9476967925, 38.5288302896)
end

screen_name_whitelist = ["Job", "job", "Jobs", "job", "Careers", "careers", "test5geo1798", "tmj_"]
job_posting_whitelist = ["See our latest", "We're #hiring!",
  "Read about our latest #job opening", "Want to work in",
  "Can you recommend anyone for this", "Want to work at",
  "If you're looking for work in"]

newclient.filter(locations: "-123.632497,36.9476967925,-121.4099121094,38.5288302896") do |tweet|
  if tweet.attrs[:coordinates]
    unless job_posting_whitelist.any? { |phrase| tweet.text.include?(phrase) } ||
      screen_name_whitelist.any? { |term| tweet.user.screen_name.include?(term) } ||
      farallon_islands_spam?(tweet.attrs[:coordinates]) ||
      bay_area_coordinates?(tweet.attrs[:coordinates])

      Tweet.create!(
      text: tweet.text,
      name: tweet.user.name,
      screen_name: tweet.user.screen_name,
      location: tweet.user.location,
      url: tweet.user.to_h[:url],
      description: tweet.user.description,
      profile_picture: tweet.user.to_h[:profile_image_url_https],
      coordinates: tweet.to_h[:coordinates],
      place_type: tweet.to_h[:place][:place_type],
      place_name: tweet.to_h[:place][:name],
      place_full_name: tweet.to_h[:place][:full_name],
      place_country_code: tweet.to_h[:place][:country_code],
      place_country: tweet.to_h[:place][:country],
      place_bounding_box_coordinates: tweet.to_h[:place][:bounding_box][:coordinates].to_s,
      retweet_count: tweet.retweet_count,
      favorite_count: tweet.favorite_count,
      tweet_id: tweet.to_h[:id_str],
      tweet_created_at: tweet.to_h[:created_at],
      time_utc: (Time.now.to_i * 1000)
      )
      puts tweet

    end
  end
end
