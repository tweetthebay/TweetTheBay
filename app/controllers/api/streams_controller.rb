class Api::StreamsController < ApplicationController
  def index
    time_mount_utc = params[:timeNowUTC].to_i

    @stream_tweets = []

    if Tweet.where("time_utc > #{time_mount_utc}").empty?
      @stream_tweets = Tweet.last(1)
    else
      @stream_tweets = Tweet
        .where("time_utc > #{time_mount_utc}")
        .last(100)
        .reverse
    end

    # Rails.cache.data.keys.sort.last(100).reverse.each do |key|
    #   @stream_tweets << Rails.cache.read(key) if Rails.cache.read(key).time_utc > time_mount_utc
    # end

    render :index
  end
end
