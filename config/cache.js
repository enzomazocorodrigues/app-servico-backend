const Redis = require("ioredis")

class Cache {
	constructor() {
		this.redis = new Redis({
			host: process.env.REDIS_HOST || 'localhost',
			port: process.env.REDIS_PORT || 6379,
			keyPrefix: "cache:"
		})
	}

	async get(key) {
		const value = await this.redis.get(key)
		return value ? JSON.parse(value) : null
	}

	set(key, value) {
		return this.redis.set(key, JSON.stringify(value), 'EX', 10)
	}

	del(key) {
		return this.redis.del(key)
	}

	async delPrefix(prefix) {
		const keys = (await this.redis.keys(`cache:${prefix}`)).map(key => key.replace('cache:', ''))
	}
}

module.exports = Cache