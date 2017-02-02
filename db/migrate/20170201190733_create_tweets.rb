class CreateTweets < ActiveRecord::Migration[5.0]
  def change
    create_table :tweets do |t|
      t.string :text
      t.string :name
      t.string :screen_name
      t.string :location
      t.string :url
      t.string :description
      t.string :profile_picture
      t.string :coordinates
      t.string :place_type
      t.string :place_name
      t.string :place_full_name
      t.string :place_country_code
      t.string :place_country
      t.string :place_bounding_box_coordinates
      t.string :retweet_count
      t.string :favorite_count
      t.string :tweet_id
      t.string :tweet_created_at
      t.timestamps
    end
  end
end

# class CreateReviews < ActiveRecord::Migration
#   def change
#     create_table :reviews do |t|
#       t.text :body
#       t.integer :rating, null: false
#       t.integer :user_id, null: false
#       t.integer :movie_id, null: false
#
#       t.timestamps null: false
#     end
#
#     add_index :reviews, :user_id
#     add_index :reviews, :movie_id
#     add_index :reviews, [:user_id, :movie_id], unique: true
#   end
# end
