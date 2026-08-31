"use client";

import { useRef, useState } from "react";
import { ImagePlus, Search, X, UploadCloud } from "lucide-react";

export default function Home() {
  const [photos, setPhotos] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    const newPhotos = imageFiles.map((file) => URL.createObjectURL(file));

    setPhotos((current) => [...current, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    setPhotos((current) => current.filter((_, i) => i !== index));
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-2 text-black">
              <ImagePlus size={22} />
            </div>

            <span className="text-xl font-bold">MemoryLens</span>
          </div>

          <div className="text-sm text-gray-400">
            AI-powered memory search
          </div>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium text-purple-400">
            YOUR MEMORIES, SEARCHABLE
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Find any photo.
            <br />
            <span className="text-gray-500">Without scrolling forever.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            Upload your memories and eventually search them using natural
            language like “me playing cricket” or “sunset at the beach.”
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
          <Search size={21} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search your memories..."
            className="w-full bg-transparent text-white outline-none placeholder:text-gray-600"
          />
        </div>

        {/* Upload */}
        <div
          onClick={() => inputRef.current?.click()}
          className="mx-auto mt-8 max-w-2xl cursor-pointer rounded-3xl border border-dashed border-white/20 bg-white/[0.03] p-12 text-center transition hover:border-purple-400/50 hover:bg-white/[0.05]"
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => handleFiles(event.target.files)}
          />

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <UploadCloud size={30} />
          </div>

          <h2 className="text-lg font-semibold">Upload your memories</h2>

          <p className="mt-2 text-sm text-gray-500">
            Click here to select photos from your computer
          </p>

          <button
            type="button"
            className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            Choose Photos
          </button>
        </div>

        {/* Photo Preview */}
        {photos.length > 0 && (
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Selected Memories
              </h2>

              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-400">
                {photos.length} photo{photos.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {photos.map((photo, index) => (
                <div
                  key={`${photo}-${index}`}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <img
                    src={photo}
                    alt={`Selected memory ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute right-2 top-2 rounded-full bg-black/70 p-2 opacity-0 transition group-hover:opacity-100"
                    aria-label={`Remove photo ${index + 1}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}