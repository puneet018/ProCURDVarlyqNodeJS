const redis = require('redis');


const redis_client = redis.creatClient(process.env.REDIS_PORT,process.env.REDIS_HOST);
redis_client.on('connect',()=>{
    console.log('redis client connected');
});

module.exports = redis_client;