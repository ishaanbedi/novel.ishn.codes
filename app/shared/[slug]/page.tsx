"use client";
import Github from "@/ui/shared/github";
import Slug from "@/ui/slug";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = params.slug;
  const [content, setContent] = useState("");
  const [showingNotFoundError, setShowingNotFoundError] = useState(false);
  useEffect(() => {
    const performKVOperation = async () => {
      const res = await fetch("/api/getData?slug=" + slug, {
        method: "GET",
      });
      const data = await res.json();
      if (data !== null) {
        setContent(data.content);
      } else {
        setShowingNotFoundError(true);
      }
    };
    performKVOperation();
  }, []);
  return (
    <>
      <a
        href="/deploy"
        target="_blank"
        className="absolute bottom-5 left-5 max-h-fit rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto sm:top-5"
      >
        <svg
          width={22}
          viewBox="0 0 76 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#000000" />
        </svg>
      </a>
      <a
        href="/github"
        target="_blank"
        className="absolute bottom-5 right-5 max-h-fit rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto sm:top-5"
      >
        <Github />
      </a>
      <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(20vh)]">
        {content !== "" && <Slug content={content} />}
        {showingNotFoundError && (
          <>
            <p className="text-stone-400">
              The page you're looking for doesn't exist.
            </p>
            <Link href="/">
              <button className="rounded-lg bg-stone-300 px-3 py-2 text-stone-400 transition-colors duration-200 hover:bg-stone-400 hover:text-stone-100">
                Go To Home
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
