class Api::TweetsController < ApplicationController
 def index

   @client = Twitter::REST::Client.new do |config|
     config.consumer_key        = "h5XHu5kLtl8ebVTvmtmdzmFaq"
     config.consumer_secret     = "ZJ64fNvVYQQ736tlJg0kCcps5eqsYtaTA8tD2SJYyfthewToRE"
     config.access_token        = "825077910197268480-7BA4vapjGAiyM1FVt4iIpFDpX7wxkT7"
     config.access_token_secret = "BrSLGMDakIU4JDTThKQ2eKnVplh0m2iLc6wbGJIOLt577"
   end

   if params[:query]
     @tweets = @client.search("#{params[:query]}", geocode: "37.754880,-122.410066,25mi").attrs[:statuses]
     @place_tweets = @tweets.select { |tweet| tweet[:coordinates] != nil }
     @geo_tweets = @tweets.select { |tweet| tweet[:place] != nil }
     @place_name_tweets = @tweets.select do |tweet|
       tweet[:user][:location] != nil
       tweet[:coordinates] == nil
       tweet[:place] == nil
     end
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
