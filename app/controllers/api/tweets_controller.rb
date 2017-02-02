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
      @tweets = @client.search("#{params[:query]}",
                              geocode: "#{params[:location][:lat]},#{params[:location][:lng]},#{params[:location][:radius]}mi",
                              result_type: "recent").attrs[:statuses]

    ### attempted search using Request object (currently not any better than the above search)
    # @tweets = Twitter::REST::Request.new(@client, :get, 'https://api.twitter.com/1.1/search/tweets.json?src=typd&q=arrow%20place%3A5a110d312052166f', resources: "search").perform

      @geo_tweets = @tweets.select { |tweet| tweet[:coordinates] != nil || tweet[:place] != nil}
    else
      @trends = @client.trends(id = 2487956, options = {})
    end

    render :tweets
  end

 def show
   # This is not where this goes
 end
end
