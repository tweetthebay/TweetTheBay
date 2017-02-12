class Api::StreamsController < ApplicationController
  def index
    time_mount_utc = params[:timeNowUTC].to_i

    @streamTweets = []

    Rails.cache.data.keys.sort.last(100).reverse.each do |key|
      @streamTweets << Rails.cache.read(key) if Rails.cache.read(key).time_utc > time_mount_utc
    end

    render :index
  end
end
