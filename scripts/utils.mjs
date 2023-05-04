import { exec } from 'child_process';
import crypto from 'crypto';

export function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing command: ${error.message}`));
        return;
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }

      resolve(stdout);
    });
  });
}

export function generateRandomHash(length) {
  const hashLength = length || 32; // Default hash length is set to 32 characters
  const randomBytes = crypto.randomBytes(Math.ceil(hashLength / 2));
  const randomHash = randomBytes.toString('hex').slice(0, hashLength);

  return randomHash;
}