const { spawn } = require('node:child_process');


class Interactsh {
    
    constructor() {
        this.child = null;
        this.url = null;
        this.mainData = [];
        this.urlRegex = /([a-z0-9]+)\.(oast\.(pro|live|site|online|fun|me))/gm;
        this.dataRegex = /\[([a-z0-9]+)\] Received HTTP interaction from ([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+) at ([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2})/gm;
    }

    start() {

        this.child = spawn(__dirname + '/../bin/interactsh-client');


        this.child.on('exit', () => {
            this.child = null;
        });

        this.child.stderr.on('data', (data) => {
            const foundUrl = data.toString().match(this.urlRegex);
            if (foundUrl) {
                this.url = foundUrl[0];
                console.log('URL: ' + this.url);
            }
        });

        this.child.stdout.on('data', (data) => {
            console.log('Data: ' + data.toString());
            const foundData = data.toString().match(this.dataRegex);
            if (foundData) {
                // extract the IP and date
                const ip = foundData[0].split(' ')[5];
                const dateTime = new Date(foundData[0].split(' ')[7] + ' ' + foundData[0].split(' ')[8]);
                this.mainData.push({
                    message: foundData[0],
                    ip,
                    date: dateTime
                })
                console.log('Data: ' + JSON.stringify(this.mainData));
            }
        });
    }

    stop() {
        if (this.child) {
            this.child.kill();
        }
    }
}

module.exports = Interactsh;