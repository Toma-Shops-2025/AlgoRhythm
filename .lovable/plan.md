Right now `/p/$id` (post pages) and `/u/$handle` (creator profiles) ship hardcoded placeholder meta — the title is literally `AlgoRhythm — track abc12345`, the description is generic, and `og:image` is missing. Google and social platforms see the same boilerplate for every creator. This plan makes each page self-describe with the creator's actual title, caption, cover, tags, and handle.

### 1. Post pages (`src/routes/p.$id.tsx`) — dynamic, rich meta

- Move the post fetch into a route `loader` using `context.queryClient.ensureQueryData` so `head()` gets real `loaderData` (and the component keeps using `useSuspenseQuery` — no double fetch).
- Replace the placeholder meta with values derived from the post:
  - `title`: `"{post.title} — @{handle} on AlgoRhythm"` (trimmed to ~60 chars)
  - `description`: caption (post.description), trimmed to ~155 chars, fallback to `"AI-made {audio|video} by @{handle} on AlgoRhythm. {tags as #hashtags}"`
  - `og:title`, `og:description`, `twitter:title`, `twitter:description` mirror the above
  - `og:image` + `twitter:image` = `cover_url` (absolute URL) — only when present (no placeholder)
  - `twitter:card` = `summary_large_image` when cover exists, else `summary`
  - `og:type` = `"music.song"` for audio, `"video.other"` for video
  - `og:audio` / `og:video` pointing at `media_url`, with `og:audio:type` / `og:video:type`
  - `article:author`, `music:musician`, `og:url`, keyword meta from tags + aiTools
- JSON-LD upgraded from a stub to a real `MusicRecording` (audio) or `VideoObject` (video) populated with `name`, `description`, `thumbnailUrl`, `contentUrl`, `uploadDate`, `duration`, `genre` (tags), `creator` (Person with name/url), `interactionStatistic` (likes/comments/views). Add a `BreadcrumbList` (Home → @handle → title).
- Keep canonical on the leaf only.

### 2. Profile pages (`src/routes/u.$handle.tsx`) — dynamic, rich meta

- Same loader pattern: fetch the profile in the route loader so `head()` has real data.
- Meta derived from profile:
  - `title`: `"{display_name} (@{handle}) — AI music on AlgoRhythm"`
  - `description`: bio (trimmed) or fallback `"AI-made music & videos by {display_name} (@{handle}). {post_count} posts."`
  - `og:image` + `twitter:image` = `avatar_url` when present
  - `twitter:card`, `og:type=profile`, `profile:username`
- JSON-LD upgraded to `ProfilePage` + `Person` with `image`, `description`, and `sameAs` array built from `profile.links` (when populated).

### 3. Canonical domain alignment

- All canonical/`og:url` strings (post, profile, upload, sitemap) currently use `myalgorhythm.lovable.app`. The project's primary domain is `myalgorhythm.online`. Switch `BASE_URL` to `https://myalgorhythm.online` in:
  - `src/routes/sitemap[.]xml.ts`
  - `src/routes/p.$id.tsx`
  - `src/routes/u.$handle.tsx`
  - any other route head that hardcodes `lovable.app` (`feed.tsx`, `upload.tsx`, `discover.tsx`, etc.)
- Centralize the base URL in `src/lib/seo.ts` so future routes import one constant.

### 4. Helpful publish-time defaults (small backend tweak, optional but in-scope for "always SEO-optimize")

- In `createPost` (`src/lib/posts.functions.ts`), if `description` is empty after the creator publishes, store a derived fallback (`"AI-made {type} '{title}' by @{handle}. #tag #tag …"`) so the rendered meta is never blank even when a creator skips the caption. This is a server-side safety net on top of the existing "Generate title/caption/hashtags" button.

### 5. Share button copy

- `share()` in `p.$id.tsx` currently shares only `title`. Include the caption as `text` so native share sheets pre-fill richer content.

### Out of scope (call out only)

- No URL-slug change (post URLs stay `/p/{uuid}`). Adding a `/p/{id}/{slug}` redirect would help, but it's a routing change I'd want explicit approval for.
- No new image generation for `og:image` — we use the existing cover. The earlier "generate cover with AI" flow already covers creators who don't upload one.

### Technical notes

- Loader pattern follows the canonical TanStack Query integration: `loader: ({ context, params }) => context.queryClient.ensureQueryData(postQueryOptions(params.id))`; `head({ loaderData })` reads the same object. The component calls `useSuspenseQuery(postQueryOptions(id))` — cache-hit, no extra request.
- `og:image` and `twitter:image` must be absolute URLs; Supabase Storage public URLs already are, so pass them straight through.
- Trim helpers cap title at 60 and description at 155 chars to stay within Google/Twitter limits.
- Strict TanStack rule: `og:image` on leaf routes only — never `__root.tsx`.
