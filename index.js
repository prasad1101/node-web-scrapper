const scrapper = require('./scrapper')
const redisClient = require('./redis-client')
const mongoClient = require('./mongo-client');

let startedTime = null;

const paramSeq = process.argv.splice(2);
if (paramSeq.length !== 3) {
    console.error('Please enter in this seq : jobId baseURL pageRange')
    process.exit(0)
}
jobId = `job_${paramSeq[0]}`
url = `${paramSeq[1]}`
range = paramSeq[2]


const createJob = () => {
    startedTime = new Date().getTime()
    redisClient.readFromRedis(jobId, (v) => {
        v = JSON.parse(v)
        if (v && v.status !== 'NEW') {
            console.error(`This job ${v.jobId} is already processed`, v)
            process.exit(0);
        } else {
            v = {
                jobId,
                url,
                range,
                status: 'NEW'
            }
            redisClient.saveToRedis(jobId, v)
            processJob(v)
        }

    })
}

const processJob = (jobObj) => {
    scrapper.testSkills(jobObj.url, jobObj.range, (skills) => {
        const endTime = new Date().getTime()

        mongoClient.saveToMongo({
            ...jobObj,
            skillSet: skills,
            startedTime,
            endTime,
            processingTime: endTime - startedTime
        }, (cb) => {
            redisClient.saveToRedis(jobId, { ...jobObj, status: 'DONE' })
            console.log('saved analysis to mongoDB')
            process.exit(0)
        })

    })
}

createJob()