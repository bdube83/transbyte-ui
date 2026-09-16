#!/usr/bin/env node
// Generate the Edgebox admin credential env values (email/password + TOTP).
// Run locally: `node scripts/admin-cred.mjs`. Never commit the output; paste the
// three EDGEBOX_ADMIN_* values into the Netlify site environment, and add the
// otpauth line to an authenticator app.
import { scryptSync, randomBytes } from 'node:crypto';
import { createInterface } from 'node:readline';

const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const toBase32 = buf => {
  let bits = '';
  for (const b of buf) bits += b.toString(2).padStart(8, '0');
  let out = '';
  for (let i = 0; i + 5 <= bits.length; i += 5) out += B32[parseInt(bits.slice(i, i + 5), 2)];
  const rem = bits.length % 5;
  if (rem) out += B32[parseInt(bits.slice(-rem).padEnd(5, '0'), 2)];
  return out;
};

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = q => new Promise(r => rl.question(q, r));
const email = (await ask('Admin email [info@Khuselaworkflow.com]: ')).trim() || 'info@Khuselaworkflow.com';
const password = (await ask('Admin password (min 12 chars): ')).trim();
rl.close();
if (password.length < 12) { console.error('Password must be at least 12 characters.'); process.exit(1); }

const salt = randomBytes(16);
const passwordHash = `${salt.toString('hex')}:${scryptSync(password, salt, 64).toString('hex')}`;
const totpSecret = toBase32(randomBytes(20));
const label = encodeURIComponent(`Edgebox (${email})`);
const otpauth = `otpauth://totp/${label}?secret=${totpSecret}&issuer=Edgebox&algorithm=SHA1&digits=6&period=30`;

console.log('\n--- Netlify site environment variables (private; do not commit) ---');
console.log(`EDGEBOX_ADMIN_EMAIL=${email}`);
console.log(`EDGEBOX_ADMIN_PASSWORD_HASH=${passwordHash}`);
console.log(`EDGEBOX_ADMIN_TOTP_SECRET=${totpSecret}`);
console.log('\n--- Add to your authenticator (scan the URI as a QR, or paste the secret) ---');
console.log(otpauth);
console.log('\nAfter setting the env vars and redeploying, sign in at /admin with the email, password and the 6-digit code.');
