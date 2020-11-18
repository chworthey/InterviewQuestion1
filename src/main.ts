// Copyright (c) 2020 Patrick S. Worthey

import { formatNumber } from './func';
import fetch, { Response } from 'node-fetch';

const url = 'https://translifeline.org/hiring_stats_sample';

async function onFetchSuccess(response: Response) {
  try {
    const jsonObj = await response.json();

    if (!('answered' in jsonObj)) {
      console.error('JSON had no property "answered".');
      return;
    }
    if (typeof jsonObj.answered !== 'number' && typeof jsonObj.answered !== 'bigint') {
      console.error(`JSON value of wrong type. Type: "${typeof jsonObj.answered}"`);
      return;
    }

    const result = formatNumber(jsonObj.answered);
    console.log(`Result is: "${result}".`);
  }
  catch (err) {
    console.error('JSON parsing error occured.', err);
  }
}

async function main() {
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      console.error(`HTTP error occurred. Status Code: ${response.status}`);
      return;
    }
    await onFetchSuccess(response);
  }
  catch (err) {
    console.error(err);
  }
}

main();