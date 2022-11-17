const core = require('@actions/core');
const { spawn } = require('node:child_process')

const listDirectoryContents = async () => {
    let stdout = '';
    let stderr = '';

    return new Promise((res, rej) => {
        const ls = spawn('ls', ['-lah']);
        ls.stdout.on('data', (log) => stdout += log);
        ls.stderr.on('data', (log) => stderr += log);
        ls.on('close', () => {
            res(`${stdout} \n\n\n ${stderr}`)
        })
    });
}

const main = async () => {
    const log = await listDirectoryContents();
    console.log(log);
}

main()