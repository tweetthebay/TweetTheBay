class Api::TweetsController < ApplicationController
 def index
   @client = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV['CONSUMER_API_KEY']
    config.consumer_secret     = ENV['CONSUMER_API_SECRET']
    config.access_token        = ENV['ACCESS_TOKEN']
    config.access_token_secret = ENV['ACCESS_TOKEN_SECRET']
   end

   if params[:query]
     @tweets = @client.search("#{params[:query]}", geocode: "#{params[:location][:lat]},#{params[:location][:lng]},#{params[:location][:radius]}mi").attrs[:statuses]

     @geo_tweets = @tweets.select { |tweet| tweet[:coordinates] != nil || tweet[:place] != nil}

     render :tweets
   else
     @trends = @client.trends(id = 2487956).take(10)
     first_trend = @trends.first.name.to_s
     @tweets = @client.search(first_trend, geocode: "37.754880,-122.410066,5mi", count: 100)
     render :index
   end

 end

 def show
   # This is not where this goes
 end
end
