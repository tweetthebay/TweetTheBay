class Api::StreamsController < ApplicationController
  def index
    @streamingclient = Twitter::Streaming::Client.new do |config|
     config.consumer_key        = ENV['CONSUMER_API_KEY']
     config.consumer_secret     = ENV['CONSUMER_API_SECRET']
     config.access_token        = ENV['ACCESS_TOKEN']
     config.access_token_secret = ENV['ACCESS_TOKEN_SECRET']
    end

    timeMountUTC = params[:timeNowUTC].to_i
    @streamTweets = Tweet.where("time_utc > #{timeMountUTC}").limit(250).reverse
    render :index
  end
end
