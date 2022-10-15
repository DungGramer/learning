/* eslint-disable no-console */
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const readmePath = path.join(__dirname, 'README.md');
const readme = fs.readFileSync(readmePath, 'utf8');

const HOST = 'https://github.com/DungGramer/learning/tree';
let [title, topic, lineOfTopic] = ['', '', 0];
const [topicList] = [listTopic()];

function listTopic() {
  return readme.match(/^### (.*)/gm).map((topic) => topic.replace('### ', ''));
}

function titleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
}

function textToURL(str) {
  return str.toLowerCase().split(' ').join('-');
}

function chooseTopic(callback) {
  const options = topicList
    .map((topic, index) => `${index + 1}. ${topic}`)
    .join('\n');

  readline.question(`Choose a topic:\n${options}\n`, (inputTopic) => {
    if (inputTopic > 0 && inputTopic <= topicList.length) {
      topic = topicList[inputTopic - 1];
      lineOfTopic = readme.indexOf(`### ${topic}`);
      console.log(`You topic: ${topic}`);

      callback();
      return;
    }

    console.warn('Invalid topic');
    chooseTopic(callback);
    return;
  });
}

function readTitle(callback) {
  readline.question('Enter the title of the post?\n', (inputTitle) => {
    if (!inputTitle) {
      console.log('Please enter a title!');
      readTitle();
      return;
    }

    console.log(`# ${titleCase(inputTitle)}`);
    title = inputTitle;
    callback();
  });
}

function readContent(callback) {
  const branch = `${topic.toLowerCase()}/${textToURL(title)}`;
  const url = `${HOST}/${branch}`;
  const markdown = `\n#### [${title}](${url})\n`;
  console.log(markdown);
  console.log(`Branch: ${branch}`);

  readline.question('Do you want to continue? (y/n)\n', (input) => {
    if (input === 'n') {
      console.log('Bye!');
      readline.close();
    } else {
      callback(markdown, branch, url);
    }
  });
}

function writeContent(markdown, branch, url) {
  const newReadme = [
    readme.slice(0, lineOfTopic + topic.length + 4),
    readme.slice(lineOfTopic + topic.length + 4, readme.length),
  ].join(markdown);

  fs.writeFileSync(readmePath, newReadme);

  // Create a new branch
  exec(`git checkout -b ${branch}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

  process.exit();
}

// MAIN
readTitle(() => chooseTopic(() => readContent(writeContent)));
