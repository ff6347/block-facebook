import {promises} from 'fs';
import {resolve} from 'path';

const readFile = promises.readFile;
const writeFile = promises.writeFile;
// tslint:disable-next-line:no-console
// console.log('hello .ts');

(async () => {
  let match;
  const results = [];
  const regex = /\d.\d.\d.\d\s(.*?)\n/g;

  const blocklist = await readFile(
      resolve(__dirname, '../blocklists/corporations/facebook/all'), 'utf8').catch(error => {
        throw error;
      });

  // tslint:disable-next-line:no-conditional-assignment
  while (match = regex.exec(blocklist)) {
    results.push(match[1]);
  }

  const lsrules = await readFile(resolve(__dirname, '../block-facebook.lsrules'), 'utf8').catch(error => {
    throw error;
  });

  const parsedLSrules = JSON.parse(lsrules);
  const alldomains = parsedLSrules.rules[0]['remote-domains'];
  let newDomains = [...new Set([...alldomains, ...results])];
  newDomains = newDomains.sort((a, b) => {
    if (a < b) { return -1; } else if (a > b) { return 1; }
    return 0;
  });
  parsedLSrules.rules[0]['remote-domains'] = newDomains;

  await writeFile(resolve(__dirname, '../block-facebook.lsrules'),
  JSON.stringify(parsedLSrules, null, 2)).catch(error => {
    throw error;
  });
})();
