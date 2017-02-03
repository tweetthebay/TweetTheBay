class Api::StreamsController < ApplicationController
  def index
    @streamingclient = Twitter::Streaming::Client.new do |config|
     config.consumer_key        = ENV['CONSUMER_API_KEY']
     config.consumer_secret     = ENV['CONSUMER_API_SECRET']
     config.access_token        = ENV['ACCESS_TOKEN']
     config.access_token_secret = ENV['ACCESS_TOKEN_SECRET']
    end

    @tweets = Tweet.last(100)
    render :index
  end
end
