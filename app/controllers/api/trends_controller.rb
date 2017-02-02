class Api::TrendsController < ApplicationController

  def index
    #client access information
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['CONSUMER_API_KEY']
      config.consumer_secret     = ENV['CONSUMER_API_SECRET']
      config.access_token        = ENV['ACCESS_TOKEN']
      config.access_token_secret = ENV['ACCESS_TOKEN_SECRET']
    end

    #ensure that rate limits are not hit
    @limits = Twitter::REST::Request.new(@client, :get, 'https://api.twitter.com/1.1/application/rate_limit_status.json', resources: "search").perform
    @remaining_requests = @limits[:resources][:search][:"/search/tweets"][:remaining]

    @trends = @client.trends(id = 2487956, options = {})

    render :trends
  end

end
