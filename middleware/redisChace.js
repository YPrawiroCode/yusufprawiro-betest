const redis = require("redis");
const axios = require("axios");

let redisClient;

(async () => {
  redisClient = redis.createClient({
    host: `redis-11025.c1.ap-southeast-1-1.ec2.cloud.redislabs.com`,
    port: 11025,
  });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

async function cacheData(req, res, next) {
  const species = req.params.species;
  let results;
  try {
    const cacheResults = await redisClient.get(species);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
      res.send({
        fromCache: true,
        data: results,
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(404);
  }
}

module.exports = { cacheData };
