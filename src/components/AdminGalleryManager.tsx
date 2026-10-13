
"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type GalleryKind = "PHOTO" | "VIDEO";

type GalleryItem = {
  id: string;
  title: string;
  type: GalleryKind;
  url: string;
  thumbnailUrl?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  isPublished: boolean;
  createdAt: string;
};

type ApiResponse = {
  data?: GalleryItem[] | { items?: GalleryItem[] };
  items?: GalleryItem[];
  message?: string;
};

function getItems(result: ApiResponse): GalleryItem[] {
  if (Array.isArray(result.data)) return result.data;
  if (result.data && "items" in result.data) return result.data.items ?? [];
  return result.items ?? [];
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function formatSize(bytes?: number | null) {
  if (typeof bytes !== "number") return "Size unavailable";

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminGalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<GalleryKind>("PHOTO");
  const [publishOnUpload, setPublishOnUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filter, setFilter] = useState<"ALL" | GalleryKind>("ALL");

  const [localPreview, setLocalPreview] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setLocalPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setLocalPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  async function loadItems() {
    if (!API_URL) {
      setError("NEXT_PUBLIC_API_URL is not configured.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/gallery/media/admin`, {
        credentials: "include",
        cache: "no-store",
      });

      if (response.status === 401) {
        throw new Error("Your admin session has expired. Please log in again.");
      }

      if (!response.ok) {
        throw new Error(`Could not load gallery media (HTTP ${response.status}).`);
      }

      const result = await response.json();

      console.log("Gallery API response:", result);
      console.log("Is direct array:", Array.isArray(result));

      const galleryItems = Array.isArray(result)
        ? result
        : getItems(result as ApiResponse);

      console.log("Gallery items parsed:", galleryItems);
      console.log("Gallery item count:", galleryItems.length);

      setItems(galleryItems);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load gallery media.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadItems();
    // Initial load when the gallery tab mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFileChange(file: File | null) {
    setSelectedFile(file);
    setError("");
    setSuccess("");

    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (
      (kind === "PHOTO" && !isImage) ||
      (kind === "VIDEO" && !isVideo)
    ) {
      setSelectedFile(null);
      setError(
        kind === "PHOTO"
          ? "Please select an image file."
          : "Please select a video file.",
      );
      return;
    }

    const maxBytes = kind === "PHOTO" ? 15 * 1024 * 1024 : 250 * 1024 * 1024;

    if (file.size > maxBytes) {
      setSelectedFile(null);
      setError(
        kind === "PHOTO"
          ? "Image size must not exceed 15 MB."
          : "Video size must not exceed 250 MB.",
      );
    }
  }

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!API_URL) {
      setError("NEXT_PUBLIC_API_URL is not configured.");
      return;
    }

    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("type", kind);
      formData.append("title", title.trim());
      formData.append("isPublished", String(publishOnUpload));

      const response = await fetch(`${API_URL}/gallery/media`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.status === 401) {
        throw new Error("Your admin session has expired. Please log in again.");
      }

      if (!response.ok) {
        const message = await response.text().catch(() => "");
        throw new Error(
          `Upload failed (HTTP ${response.status})${message ? `: ${message.slice(0, 200)}` : ""}`,
        );
      }

      setTitle("");
      setSelectedFile(null);
      setPublishOnUpload(false);
      setSuccess("Media uploaded successfully.");

      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function togglePublished(item: GalleryItem) {
    if (!API_URL) {
      setError("NEXT_PUBLIC_API_URL is not configured.");
      return;
    }

    setBusyId(item.id);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/gallery/media/${encodeURIComponent(item.id)}/publish`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isPublished: !item.isPublished }),
        },
      );

      if (!response.ok) {
        throw new Error(`Could not update publication (HTTP ${response.status}).`);
      }

      setItems((current) =>
        current.map((entry) =>
          entry.id === item.id
            ? { ...entry, isPublished: !entry.isPublished }
            : entry,
        ),
      );

      setSuccess(
        item.isPublished ? "Media unpublished." : "Media published.",
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not update publication.",
      );
    } finally {
      setBusyId(null);
    }
  }

  async function deleteItem(item: GalleryItem) {
    if (!API_URL) {
      setError("NEXT_PUBLIC_API_URL is not configured.");
      return;
    }

    const confirmed = window.confirm(
      `Delete "${item.title}" permanently? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setBusyId(item.id);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/gallery/media/${encodeURIComponent(item.id)}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`Could not delete media (HTTP ${response.status}).`);
      }

      setItems((current) => current.filter((entry) => entry.id !== item.id));
      setSuccess("Media deleted successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete media.");
    } finally {
      setBusyId(null);
    }
  }

  const visibleItems = items.filter(
    (item) => filter === "ALL" || item.type === filter,
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h3 className="text-lg font-bold text-slate-900">
            Upload training media
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Add training photos or videos to the NLETA gallery.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
          >
            {success}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Media title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={180}
                required
                placeholder="e.g. Lift Safety Training"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Media type
              <select
                value={kind}
                onChange={(event) => {
                  setKind(event.target.value as GalleryKind);
                  setSelectedFile(null);
                  setLocalPreview("");
                  setError("");
                }}
                className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
              >
                <option value="PHOTO">Photo</option>
                <option value="VIDEO">Video</option>
              </select>
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Choose {kind === "PHOTO" ? "image" : "video"}
            <input
              key={kind}
              type="file"
              accept={kind === "PHOTO" ? "image/*" : "video/*"}
              required
              onChange={(event) =>
                handleFileChange(event.target.files?.[0] ?? null)
              }
              className="mt-1 block w-full rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            <span className="mt-1 block text-xs text-slate-500">
              Images: maximum 15 MB. Videos: maximum 250 MB.
            </span>
          </label>

          {selectedFile && localPreview && (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="mb-3 break-all text-sm font-medium text-slate-700">
                {selectedFile.name} · {formatSize(selectedFile.size)}
              </p>

              {kind === "PHOTO" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={localPreview}
                  alt="Selected upload preview"
                  className="max-h-72 w-full rounded-lg object-contain"
                />
              ) : (
                <video
                  src={localPreview}
                  controls
                  className="max-h-80 w-full rounded-lg bg-black"
                />
              )}
            </div>
          )}

          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={publishOnUpload}
              onChange={(event) => setPublishOnUpload(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300"
            />
            <span>
              <span className="block font-semibold">Publish immediately</span>
              <span className="mt-0.5 block text-xs text-slate-500">
                If unchecked, upload as unpublished media for review.
              </span>
            </span>
          </label>

          <button
            type="submit"
            disabled={uploading || !selectedFile}
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload media"}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Gallery library
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {items.length} media item(s)
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value as "ALL" | GalleryKind)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="ALL">All media</option>
              <option value="PHOTO">Photos</option>
              <option value="VIDEO">Videos</option>
            </select>

            <button
              type="button"
              onClick={() => void loadItems()}
              disabled={loading}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>

        {loading ? (
          <p className="py-10 text-center text-sm text-slate-500">
            Loading gallery...
          </p>
        ) : visibleItems.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 px-5 py-12 text-center">
            <p className="font-semibold text-slate-700">No media found</p>
            <p className="mt-1 text-sm text-slate-500">
              Upload your first training photo or video above.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleItems.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <div className="relative aspect-video bg-slate-100">
                  {item.type === "VIDEO" ? (
                    <video
                      src={item.url}
                      poster={item.thumbnailUrl || undefined}
                      controls
                      preload="metadata"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.thumbnailUrl || item.url}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="break-words font-semibold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.type} · {formatDate(item.createdAt)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {formatSize(item.sizeBytes)}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${item.isPublished
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                        }`}
                    >
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-3">
                    <button
                      type="button"
                      onClick={() => void togglePublished(item)}
                      disabled={busyId === item.id}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                    >
                      {busyId === item.id
                        ? "Saving..."
                        : item.isPublished
                          ? "Unpublish"
                          : "Publish"}
                    </button>

                    <button
                      type="button"
                      onClick={() => void deleteItem(item)}
                      disabled={busyId === item.id}
                      className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
