uri = ENV["REDIS_URL"] || "redis://localhost:6379/"
$redis = Redis.new(url: uri)
$redis.client.logger = Logger.new(STDOUT)
