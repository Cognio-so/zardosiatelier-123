type BlobAccess = "public";

type BlobRecord = {
  url: string;
  downloadUrl?: string;
  pathname: string;
  size?: number;
  uploadedAt?: string;
  etag?: string;
};

type BlobListResponse = {
  blobs: BlobRecord[];
  cursor?: string;
  hasMore?: boolean;
};

type PutBlobOptions = {
  access?: BlobAccess;
  contentType?: string;
  allowOverwrite?: boolean;
  addRandomSuffix?: boolean;
};

// Correct Vercel Blob REST API endpoint
const API_BASE_URL = "https://blob.vercel-storage.com";
const API_VERSION = "7";
const PLACEHOLDER_TOKEN = "your_vercel_blob_token_here";

export function hasBlobToken(token: string) {
  return Boolean(token && token !== PLACEHOLDER_TOKEN);
}

function storeIdFromToken(token: string) {
  // Token format: vercel_blob_rw_<storeId>_<secret>
  const parts = token.split("_");
  return parts.slice(0, 4).join("_");
}

async function blobRequest<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(`Vercel Blob request failed (${response.status}): ${message}`);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export async function listBlobs(
  token: string,
  options: { prefix?: string; cursor?: string; limit?: number } = {},
) {
  const params = new URLSearchParams();
  if (options.prefix) params.set("prefix", options.prefix);
  if (options.cursor) params.set("cursor", options.cursor);
  if (options.limit) params.set("limit", String(options.limit));

  const query = params.toString();
  return blobRequest<BlobListResponse>(token, query ? `?${query}` : "");
}

export async function putBlob(
  token: string,
  pathname: string,
  body: BodyInit | Uint8Array | string,
  options: PutBlobOptions = {},
) {
  const params = new URLSearchParams({ pathname });
  const headers = new Headers();
  headers.set("x-vercel-blob-access", options.access ?? "public");
  if (options.contentType) headers.set("content-type", options.contentType);
  if (options.allowOverwrite) headers.set("x-allow-overwrite", "1");
  if (options.addRandomSuffix === false) headers.set("x-add-random-suffix", "0");

  return blobRequest<BlobRecord>(token, `/${pathname}`, {
    method: "PUT",
    headers,
    body: body as BodyInit,
  });
}

export async function deleteBlob(token: string, urlOrPathname: string) {
  const headers = new Headers({ "content-type": "application/json" });
  await blobRequest<void>(token, "/delete", {
    method: "POST",
    headers,
    body: JSON.stringify({ urls: [urlOrPathname] }),
  });
}
