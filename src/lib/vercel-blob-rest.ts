/**
 * Minimal Vercel Blob REST wrapper.
 *
 * The official SDK currently pulls in @vercel/oidc, which crashes in this
 * TanStack Start ESM server bundle on Vercel (`require is not defined`).
 * Keeping this tiny fetch-based client avoids that runtime import path.
 */

export type BlobRecord = {
  url: string;
  downloadUrl?: string;
  pathname: string;
  size?: number;
  uploadedAt?: string;
};

export type BlobListResponse = {
  blobs: BlobRecord[];
  cursor?: string;
  hasMore?: boolean;
};

export type PutBlobOptions = {
  access?: "public";
  contentType?: string;
  allowOverwrite?: boolean;
  addRandomSuffix?: boolean;
};

const PLACEHOLDER_TOKEN = "your_vercel_blob_token_here";
const BLOB_API_BASE = "https://vercel.com/api/blob";
const BLOB_API_VERSION = "12";

export function hasBlobToken(token: string) {
  return Boolean(token && token !== PLACEHOLDER_TOKEN);
}

function getStoreId(token: string) {
  return token.split("_")[3] ?? "";
}

async function parseBlobError(response: Response) {
  try {
    const body = await response.json();
    return body?.error?.message ?? body?.error?.code ?? response.statusText;
  } catch {
    return response.statusText;
  }
}

async function blobRequest<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BLOB_API_BASE}${path}`, {
    ...init,
    headers: {
      "x-api-version": BLOB_API_VERSION,
      "x-vercel-blob-store-id": getStoreId(token),
      authorization: `Bearer ${token}`,
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const error = await parseBlobError(response);
    throw new Error(`Vercel Blob request failed (${response.status}): ${error}`);
  }

  return (await response.json()) as T;
}

export async function listBlobs(
  token: string,
  options: { prefix?: string; cursor?: string; limit?: number } = {},
): Promise<BlobListResponse> {
  const params = new URLSearchParams();
  if (options.prefix) params.set("prefix", options.prefix);
  if (options.cursor) params.set("cursor", options.cursor);
  if (options.limit) params.set("limit", String(options.limit));

  const result = await blobRequest<BlobListResponse>(
    token,
    params.size > 0 ? `?${params}` : "",
    { method: "GET" },
  );

  return {
    blobs: result.blobs.map((b) => ({
      url: b.url,
      downloadUrl: b.downloadUrl,
      pathname: b.pathname,
      size: b.size,
      uploadedAt: b.uploadedAt ? String(b.uploadedAt) : undefined,
    })),
    cursor: result.cursor,
    hasMore: result.hasMore,
  };
}

export async function putBlob(
  token: string,
  pathname: string,
  body: Buffer | string | Blob | ArrayBuffer,
  options: PutBlobOptions = {},
): Promise<BlobRecord> {
  const params = new URLSearchParams({ pathname });
  const result = await blobRequest<BlobRecord>(token, `?${params}`, {
    method: "PUT",
    body: body as BodyInit,
    headers: {
      "x-vercel-blob-access": options.access ?? "public",
      "x-allow-overwrite": options.allowOverwrite ? "1" : "0",
      "x-add-random-suffix": options.addRandomSuffix ? "1" : "0",
      ...(options.contentType ? { "x-content-type": options.contentType } : {}),
    },
  });

  return {
    url: result.url,
    downloadUrl: result.downloadUrl,
    pathname: result.pathname,
  };
}

export async function deleteBlob(token: string, urlOrPathname: string): Promise<void> {
  try {
    await blobRequest(token, "/delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ urls: [urlOrPathname] }),
    });
  } catch {
    // Ignore "not found" errors - blob may have already been deleted.
  }
}


