desc "This task is called by the Heroku scheduler add-on"

task :clear_database => :environment do
  Tweet.delete_all
end

# task :connect_stream => :environment do
#   NewsFeed.update
# end
