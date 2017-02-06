class AddUtcTimeToTweets < ActiveRecord::Migration[5.0]
  def change
    add_column :tweets, :time_utc, :integer, :limit => 8
  end
end
