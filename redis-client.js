const redis = require("redis"),
    client = redis.createClient({ db: '1' });

client.on("error", function (err) {
    console.log("Error ", err);
});


const saveToRedis = (key, value) => {
    const v = typeof value === 'string' ? value : JSON.stringify(value);
    // console.log(`Saving ${key} with value ${v}`)
    client.set(key, v, redis.print);
}

const readFromRedis = (key, cb) => {
    client.get(key, (e, r) => { cb(r || e) })
}

module.exports = { saveToRedis, readFromRedis }