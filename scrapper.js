const request = require('request');
const cheerio = require('cheerio');
const redisClient = require('./redis-client')
const globalSkills = [];

let pageNumber = 0;

const testSkills = (baseURL, range, cb) => {
    if (!baseURL || !range || range <= 0) {
        console.error('You have not passed base URL or range, terminating')
        if (cb)
            cb(null);
        redisClient.saveToRedis(jobId, { ...jobObj, status: 'PROCESSING' })
        return;
    }
    const URL = `${baseURL}${pageNumber}`
    getSkills(`${URL}`, (skillsArray) => {

        globalSkills.push(...skillsArray);
        if (pageNumber++ < range) {
            testSkills(baseURL, range, cb)
        } else {
            console.log('final skill sets are', countBySkills(globalSkills))
            if (cb)
                cb(countBySkills(globalSkills))
        }
    })
}

const getSkills = (url, cb) => {
    console.log(`Getting skills data from page number ${pageNumber}`)
    request(url, (e, r, html) => {

        if (!e && r.statusCode === 200) {
            const siteContents = cheerio.load(html)
            const freelancerList = siteContents('#freelancer_list')
            const skills = Object.values(freelancerList.find('.top-skills').children());

            const skillsArr = skills.map(x =>
                (x.attribs ? x.attribs.href.replace('/freelancers/skills/', '').replace('/', '') : null)
            )
            cb(skillsArr);
        }
    })
}

const countBySkills = (arr) => {
    return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
}

module.exports = { testSkills }