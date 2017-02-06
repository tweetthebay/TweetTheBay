class Api::StreamsController < ApplicationController
  def index
    time_mount_utc = params[:timeNowUTC].to_i
    if Tweet.where("time_utc > #{time_mount_utc}").empty?
      @streamTweets = Tweet.last(1)
    else
      @streamTweets = Tweet
        .where("time_utc > #{time_mount_utc}")
        .last(250)
        .reverse
    end

    render :index
  end
end
