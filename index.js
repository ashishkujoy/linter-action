const core = require('@actions/core');
const { exec } = require("child_process");

const execCmd = async () => {
    return new Promise((res, rej) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                rej({ err, stderr });
            } else {
                res(stdout);
            }
        });
    });
}

const main = async () => {
    try {
        const lintResultPromise = execCmd('npx eslint -f json index.js');

        lintResultPromise
            .then(console)
            .catch(e => console.log(e));

    } catch (e) {
        console.log(e);
        core.setFailed(`${e.err.message}\n${e.stderr}`);
    }    
}


main();

