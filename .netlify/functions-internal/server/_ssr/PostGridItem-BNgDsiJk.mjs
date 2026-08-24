import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem } from "./FeedItem-CnkQr2eK.mjs";
import { r as resolveStorageUrl } from "./storage-C0T7Obi-.mjs";
import { i as Play, E as Ellipsis, P as Pencil, b as Trash2 } from "../_libs/lucide-react.mjs";
function PostGridItem({
  post,
  isOwner,
  onEdit,
  onDelete,
  onClick
}) {
  const isVideo = post.type === "video";
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const coverUrl = resolveStorageUrl(post.cover_url);
  const mediaUrl = resolveStorageUrl(post.media_url);
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    coverUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: coverUrl,
        className: "absolute inset-0 h-full w-full object-cover",
        alt: post.title,
        loading: "lazy"
      }
    ) : isVideo && mediaUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        src: `${mediaUrl}#t=0.1`,
        preload: "metadata",
        muted: true,
        playsInline: true,
        className: "absolute inset-0 h-full w-full object-cover"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-card to-background" }),
    isVideo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-black/60 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-2.5 w-2.5 fill-white text-white" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-2 text-[10px] text-white", children: post.title }) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden rounded-md bg-card", children: [
    onClick ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick, className: "absolute inset-0 w-full text-left", "aria-label": post.title, children: content }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/p/$id",
        params: { id: post.id },
        className: "absolute inset-0",
        "aria-label": post.title,
        children: content
      }
    ),
    isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { open: menuOpen, onOpenChange: setMenuOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          "aria-label": "Post actions",
          onClick: (e) => e.stopPropagation(),
          className: "absolute left-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-3.5 w-3.5" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", className: "w-32", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onEdit?.(post), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-2 h-3.5 w-3.5" }),
          " Edit"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DropdownMenuItem,
          {
            onClick: () => onDelete?.(post),
            className: "text-destructive focus:text-destructive",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-3.5 w-3.5" }),
              " Delete"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  PostGridItem as P
};
