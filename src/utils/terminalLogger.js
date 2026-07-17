'use server';

export async function logToTerminal(arg1, arg2) {
  // If only one argument is passed, treat it as the data payload
  if (arg2 === undefined) {
    console.log('[CLIENT LOG]:');
    console.dir(arg1, { depth: null, colors: true });
  } else {
    // If two arguments are passed, treat arg1 as the label and arg2 as data
    console.log(`[CLIENT LOG] ${arg1}:`);
    console.dir(arg2, { depth: null, colors: true });
  }
}