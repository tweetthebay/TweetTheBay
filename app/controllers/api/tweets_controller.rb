class Api::TweetsController < ApplicationController
 def index
   @client = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV['CONSUMER_API_KEY']
    config.consumer_secret     = ENV['CONSUMER_API_SECRET']
    config.access_token        = ENV['ACCESS_TOKEN']
    config.access_token_secret = ENV['ACCESS_TOKEN_SECRET']
   end

   @limits = Twitter::REST::Request.new(@client, :get, 'https://api.twitter.com/1.1/application/rate_limit_status.json', resources: "search").perform
   @remaining_requests = @limits[:resources][:search][:"/search/tweets"][:remaining]
  

    if params[:query] && @remaining_requests > 0
     @tweets = @client.search("#{params[:query]}", geocode: "#{params[:location][:lat]},#{params[:location][:lng]},#{params[:location][:radius]}mi").attrs[:statuses]

     @geo_tweets = @tweets.select { |tweet| tweet[:coordinates] != nil || tweet[:place] != nil}

     render :tweets
    end

 end

 def show
   # This is not where this goes
 end
end
