# Error Report: ENOENT (No Such File or Directory)

**Context**:
- User ran `npm run dev` after a successful `npm run build`.
- Accessing `/community/squad` resulted in `500 Internal Server Error`.
- Error: `[Error: ENOENT: no such file or directory, open '.../.next/server/app/community/squad/page.js']`.

**Analysis**:
This error typically occurs when the Next.js development server (`next dev`) tries to serve a page but finds conflicting or missing compiled artifacts in the `.next` folder, often after switching between `build` (production) and `dev` (development) modes, or after significant file refactoring (like the Prisma migration we just did) without clearing the cache.

The source file `web/app/community/squad/page.tsx` **exists** and is correctly implemented. The issue is with the temporary build files in `.next`.

**Recommended Solution**:
Clear the Next.js cache and restart the development server.

```bash
# Stop the running server (Ctrl+C)
rm -rf .next
npm run dev
```

This forces Next.js to re-compile the page from scratch, resolving the artifact mismatch.
