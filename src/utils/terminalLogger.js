// app/actions/logger.js
'use server';

export async function logToTerminal(label, data) {
  // This always prints directly to your terminal
  console.log(`[CLIENT LOG] ${label}:`, data);
}
