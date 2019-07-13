# Node-Web-Scrapper

This program finds unique skillsets from the given website using cheerio in node js

## Installation

This program needs [node](https://nodejs.org/en/download/) MongoDB and Redis setup on your machine
```bash
https://github.com/prasad1101/node-web-scrapper.git
npm i
```

## Usage

```
node index.js 4442 https://www.yourwebsite.in/skills/all/ 2

```
or you can also try
```
npm run start
```

this will be interpreted as a job like this
```
{"jobId":"job_4442","url":"https://www.yourwebsite.in/skills/all/","range":"2","status":"NEW"}
```
Assuming that your website accepts

```
https://www.yourwebsite.in/skills/all/currentPageNumber
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
