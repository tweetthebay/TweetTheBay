# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170205191031) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "tweets", force: :cascade do |t|
    t.string   "text"
    t.string   "name"
    t.string   "screen_name"
    t.string   "location"
    t.string   "url"
    t.string   "description"
    t.string   "profile_picture"
    t.string   "coordinates"
    t.string   "place_type"
    t.string   "place_name"
    t.string   "place_full_name"
    t.string   "place_country_code"
    t.string   "place_country"
    t.string   "place_bounding_box_coordinates"
    t.string   "retweet_count"
    t.string   "favorite_count"
    t.string   "tweet_id"
    t.string   "tweet_created_at"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.bigint   "time_utc"
  end

end
