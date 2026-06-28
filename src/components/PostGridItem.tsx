import { Link } from "@tanstack/react-router";
import { Play, MoreHorizontal, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type GridPost = {
  id: string;
  type: string;
  title: string;
  cover_url?: string | null;
  media_url?: string | null;
};

export function PostGridItem({
  post,
  isOwner,
  onEdit,
  onDelete,
  onClick,
}: {
  post: GridPost;
  isOwner?: boolean;
  onEdit?: (p: GridPost) => void;
  onDelete?: (p: GridPost) => void;
  onClick?: () => void;
}) {
  const isVideo = post.type === "video";
  const [menuOpen, setMenuOpen] = useState(false);

  const content = (
    <>
      {post.cover_url ? (
        <img
          src={post.cover_url}
          className="absolute inset-0 h-full w-full object-cover"
          alt={post.title}
          loading="lazy"
        />
      ) : isVideo && post.media_url ? (
        <video
          src={`${post.media_url}#t=0.1`}
          preload="metadata"
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-card to-background" />
      )}
      {isVideo && (
        <div className="pointer-events-none absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-black/60 backdrop-blur">
          <Play className="h-2.5 w-2.5 fill-white text-white" />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
        <div className="line-clamp-2 text-[10px] text-white">{post.title}</div>
      </div>
    </>
  );

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-card">
      {onClick ? (
        <button onClick={onClick} className="absolute inset-0 w-full text-left" aria-label={post.title}>
          {content}
        </button>
      ) : (
        <Link
          to="/p/$id"
          params={{ id: post.id }}
          className="absolute inset-0"
          aria-label={post.title}
        >
          {content}
        </Link>
      )}
      {isOwner && (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="Post actions"
              onClick={(e) => e.stopPropagation()}
              className="absolute left-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-32">
            <DropdownMenuItem onClick={() => onEdit?.(post)}>
              <Pencil className="mr-2 h-3.5 w-3.5" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(post)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}