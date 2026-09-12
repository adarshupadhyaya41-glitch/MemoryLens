"use client";

import { useState, useRef } from "react";


import {
  Search,
  Upload,
  Image as ImageIcon,
  Heart,
  Sparkles,
  Grid3X3,
  Clock3,
  MapPin,
} from "lucide-react";

const memories = [
  {
    title: "College Days",
    date: "August 2026",
    location: "VIT Bhopal",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Gym Session",
    date: "August 2026",
    location: "Campus Gym",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Friends",
    date: "July 2026",
    location: "Bhopal",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Travel",
    date: "June 2026",
    location: "India",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [aiResults, setAiResults] = useState<string[]>([]);
  const filteredMemories = memories.filter((memory) =>
    `${memory.title} ${memory.date} ${memory.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const filteredUploadedImages = uploadedImages
  .map((image, index) => ({ image, index }))
  .filter(({ index }) =>
    !search ||
    aiResults[index]?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
              <Sparkles size={21} />
            </div>

            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                MemoryLens
              </h1>
              <p className="text-xs text-zinc-500">Your memories, understood.</p>
            </div>
          </div>

          <div className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
            <button className="transition hover:text-white">Memories</button>
            <button className="transition hover:text-white">Favorites</button>
            <button className="transition hover:text-white">Timeline</button>
          </div>

          <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200">
            <Upload size={16} />
            Upload
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={async (event) => {
                const files = Array.from(event.target.files || []);

                for (const file of files) {
                  const imageUrl = URL.createObjectURL(file);

                  setUploadedImages((previous) => [
                    ...previous,
                    imageUrl,
                  ]);

                  const reader = new FileReader();

                  reader.onload = async () => {


                    try {
                      const formData = new FormData();
                      formData.append("image", file);

                      const response = await fetch("/api/analyze", {
                        method: "POST",
                        body: formData,
                      });

                      const data = await response.json();

                      const bestResult = data.result?.[0];

                      if (bestResult) {
                        setAiResults((previous) => [
                          ...previous,
                          bestResult.label,
                        ]);
                      }

                      console.log("AI analysis:", data);
                    } catch (error) {
                      console.error("AI analysis failed:", error);
                    }
                  };

                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-16">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">
            <Sparkles size={14} />
            AI-powered memory search
          </div>

          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Find any memory.
            <br />
            <span className="text-zinc-500">Without scrolling forever.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
            MemoryLens helps you organize, understand, and rediscover the
            moments hidden inside your photos.
          </p>
        </div>

        {/* Search */}
        <div className="mt-10 max-w-3xl">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-2xl shadow-black/20">
            <Search className="text-zinc-500" size={21} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your memories..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
            />

            <kbd className="hidden rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-500 sm:block">
              /
            </kbd>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black">
            <Grid3X3 size={16} />
            All Memories
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white">
            <Clock3 size={16} />
            Recent
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white">
            <Heart size={16} />
            Favorites
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white">
            <MapPin size={16} />
            Places
          </button>
        </div>
      </section>

      {/* Memories */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h3 className="text-xl font-semibold">Your memories</h3>
            <p className="mt-1 text-sm text-zinc-500">
              {filteredMemories.length + uploadedImages.length} memories found
            </p>
          </div>

          <button className="text-sm text-zinc-400 transition hover:text-white">
            View all →
          </button>
        </div>

{filteredMemories.length === 0 && filteredUploadedImages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">
            <ImageIcon className="mx-auto mb-4 text-zinc-600" size={35} />
            <p className="text-zinc-400">No memories found.</p>
            <p className="mt-1 text-sm text-zinc-600">
              Try a different search.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
           {filteredUploadedImages.map(({ image, index }) => (
              <article
                key={`uploaded-${index}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={image}
                    alt={`Uploaded memory ${index + 1}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16">
                    <h4 className="font-medium">New Memory</h4>
                    <p className="mt-1 text-xs text-zinc-300">
                      Just uploaded
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 text-xs text-zinc-500">
                  📸 Your uploaded photo

                  {aiResults[index] && (
                    <p className="mt-2 text-zinc-300">
                      🧠 AI detected:{" "}
                      <span className="font-medium text-white">
                        {aiResults[index]}
                      </span>
                    </p>
                  )}
                </div>
              </article>
            ))}
            {filteredMemories.map((memory) => (
              <article
                key={memory.title}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 pt-16">
                    <h4 className="font-medium">{memory.title}</h4>
                    <p className="mt-1 text-xs text-zinc-300">
                      {memory.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-3 text-xs text-zinc-500">
                  <MapPin size={13} />
                  {memory.location}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-zinc-600">
          <p>© 2026 MemoryLens</p>
          <p>Built with Next.js</p>
        </div>
      </footer>
    </main>
  );
}