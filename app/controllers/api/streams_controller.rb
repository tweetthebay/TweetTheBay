class Api::StreamsController < ApplicationController
  def index
    timeMountUTC = params[:timeNowUTC].to_i
    if Tweet.where("time_utc > #{timeMountUTC}").empty?
      @streamTweets = Tweet.last(1)
    else
      @streamTweets = Tweet.where("time_utc > #{timeMountUTC}").limit(250).reverse
    end

    render :index
  end
end
