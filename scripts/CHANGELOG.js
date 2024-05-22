// FILEPATH
/**
 * This function adds a standard changelog to an npm package.
 * @param {string} packageName - The name of the npm package.
 * @returns {Promise} - A promise that resolves when the changelog has been added.
 */
function addChangelog(packageName) {
  const fs = require('fs');
  const path = require('path');
  const currentDate = new Date().toISOString().slice(0, 10);
  const changelogPath = path.join(__dirname, 'CHANGELOG.md');
  const changelogContent = `## ${packageName} Changelog\n\n`;
  const unpublishedVersion = `## Unreleased\n\n`;

  return new Promise((resolve, reject) => {
    fs.readFile(changelogPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const newContent = `${changelogContent}${unpublishedVersion}${data}`;
        fs.writeFile(changelogPath, newContent, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

addChangelog('bitou-tracer');
