import { JsonWebTokenError, sign } from 'jsonwebtoken';

import { AUDIENCE, verifyToken } from './token';

const PRIVATE_KEY = `-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIJKQwjq2wh4f5UpMkZH2l29RH/CBKP6GbM6mP8pgVVQYoAcGBSuBBAAK
oUQDQgAEeBLzKcYqB6ZZ0u0dsb7mkr8NK6M/fpT/Dsgjdy1RKPyYzPljJb/cgAu3
s5C/jeVqrGEQMEsfanO2mJep7FipbA==
-----END EC PRIVATE KEY-----`;

const PUBLIC_KEY = `-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIJKQwjq2wh4f5UpMkZH2l29RH/CBKP6GbM6mP8pgVVQYoAcGBSuBBAAK
oUQDQgAEeBLzKcYqB6ZZ0u0dsb7mkr8NK6M/fpT/Dsgjdy1RKPyYzPljJb/cgAu3
s5C/jeVqrGEQMEsfanO2mJep7FipbA==
-----END EC PRIVATE KEY-----`;

const DIFFERENT_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE2jgNd7fgvlkhGs1wwITVtTpxpmDCP4a4
IRxghTdGK1fj2NR0k5bPO8jEsMFSmPWA70hkcC3cjOiYBU4O6I7YJg==
-----END PUBLIC KEY-----`;

const payload = { success: true };

it('verifies ec256 signature', async () => {
  const token = sign(payload, PRIVATE_KEY, { algorithm: 'ES256', audience: AUDIENCE });
  return expect(verifyToken(token, PUBLIC_KEY)).toHaveProperty('success', true);
});

it('should not verify with wrong public key', async () => {
  const token = sign(payload, PRIVATE_KEY, { algorithm: 'ES256', audience: AUDIENCE });
  return expect(() => verifyToken(token, DIFFERENT_PUBLIC_KEY)).toThrow(JsonWebTokenError);
});

export {};
