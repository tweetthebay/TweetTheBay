class Api::TweetsController < ApplicationController

  client = Twitter::REST::Client.new do |config|
    config.consumer_key        = "Ea7a0HZxrWMXJoLK6eBTqhUZZ"
    config.consumer_secret     = "x0IT6hwK55jc7fm2P532PTFC7PzO80svYq6Suj3Nm0m6crNO9b"
    config.access_token        = "825077910197268480-7BA4vapjGAiyM1FVt4iIpFDpX7wxkT7"
    config.access_token_secret = "BrSLGMDakIU4JDTThKQ2eKnVplh0m2iLc6wbGJIOLt577"
  end

  def index
    if params[:query]
      @tweets = client.search(params[:query], geocode: "37.754880,-122.410066,5mi")
    end
  end
end
