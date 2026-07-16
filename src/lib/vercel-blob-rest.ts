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

const API_BASE_URL = "https://vercel.com/api/blob";
const API_VERSION = "12";
const PLACEHOLDER_TOKEN = "your_vercel_blob_token_here";

export function hasBlobToken(token: string) {
  return Boolean(token && token !== PLACEHOLDER_TOKEN);
}

function storeIdFromToken(token: string) {
  return token.split("_")[3] ?? "";
}

async function blobRequest<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  const storeId = storeIdFromToken(token);
  const headers = new Headers(init.headers);
  headers.set("authorization", `Bearer ${token}`);
  headers.set("x-api-version", API_VERSION);
  headers.set("x-vercel-blob-store-id", storeId);
  headers.set(
    "x-api-blob-request-id",
    `${storeId}:${Date.now()}:${Math.random().toString(16).slice(2)}`,
  );
  headers.set("x-api-blob-request-attempt", "0");

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
  if (options.contentType) headers.set("x-content-type", options.contentType);
  if (options.allowOverwrite) headers.set("x-allow-overwrite", "1");
  if (options.addRandomSuffix === false) headers.set("x-add-random-suffix", "0");

  return blobRequest<BlobRecord>(token, `?${params.toString()}`, {
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
