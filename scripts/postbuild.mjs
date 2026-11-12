/**
 * Runs after `next build`. Next writes two extra copies of the root 404
 * (dist/404/ and dist/_not-found/) next to dist/404.html. They are not pages
 * of this site, so they are removed: the URL set stays exactly as before.
 */
import { rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
for (const dir of ['404', '_not-found']) {
  await rm(join(out, dir), { recursive: true, force: true });
}
console.log('postbuild: removed dist/404/ and dist/_not-found/');
