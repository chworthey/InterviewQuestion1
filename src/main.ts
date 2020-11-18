// Copyright (c) 2020 Patrick S. Worthey
/**
 * This file contains the main program entry point.
 */

import { formatNumber } from './func';
import fetch, { Response } from 'node-fetch';

const url = 'https://translifeline.org/hiring_stats_sample';

/**
 * Attempts to log the formatted number from the response upon completion.
 * 
 * @param response The successful HTTP response with a JSON payload
 */
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

    // This is the meat of it right here. Check out the implementation.
    const result = formatNumber(jsonObj.answered);
    console.log(`Result is: "${result}".`);
  }
  catch (err) {
    console.error('JSON parsing error occured.', err);
  }
}

/**
 * The main entry point for the program. Begins the fetch request.
 */
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