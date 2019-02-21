var fs = require('fs');

function compare(file1, file2) {

    let content1 = fs.readFileSync(file1, 'utf8');
    let content2 = fs.readFileSync(file2, 'utf8');

    let lines1 = content1.trim().split(/\r?\n/);
    let lines2 = content2.trim().split(/\r?\n/);

    if (lines1.length !== lines2.length) {
        throw new Error('Invalid file length: ', file1, file2, lines1.length, lines2.length);
    }

    for (let i=0; i<lines1.length; i++) {
        if (lines1[i].trim() !== lines2[i].trim()) {
            if (lines1[i].trim().indexOf('SECRET') < 0 && lines1[i].trim().indexOf('KEY') < 0) {
                throw new Error(('Invalid file content: ' + ' - ' + file1 + ' - ' + lines1[i]));
            }
        }
    }

    return 'success';
}

module.exports = compare;
