require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SFTweets
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    if ENV["REDIS_URL"]
    config = SFTweets::Application.config
    uri = URI.parse(ENV["REDIS_URL"])

    config.cache_store = [
      :redis_store, {
        host: uri.host,
        post: uri.port,
        db: 0, #unique
        password: uri.password,
        namespace: "cache"
      }
    ]
  end
  end
end
