/**
 * Vercel Blob Storage wrapper using the official @vercel/blob SDK.
 * Replaces the previous broken custom REST implementation.
 */
import { put, del, list } from "@vercel/blob";

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

export function hasBlobToken(token: string) {
  return Boolean(token && token !== PLACEHOLDER_TOKEN);
}

export async function listBlobs(
  token: string,
  options: { prefix?: string; cursor?: string; limit?: number } = {},
): Promise<BlobListResponse> {
  const result = await list({
    token,
    ...(options.prefix ? { prefix: options.prefix } : {}),
    ...(options.cursor ? { cursor: options.cursor } : {}),
    ...(options.limit ? { limit: options.limit } : {}),
  });

  return {
    blobs: result.blobs.map((b) => ({
      url: b.url,
      downloadUrl: b.downloadUrl,
      pathname: b.pathname,
      size: b.size,
      uploadedAt: b.uploadedAt instanceof Date ? b.uploadedAt.toISOString() : String(b.uploadedAt),
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
  const result = await put(
    pathname,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body as any, // Buffer / string / Blob / ArrayBuffer are all valid PutBody at runtime
    {
      token,
      access: options.access ?? "public",
      ...(options.contentType ? { contentType: options.contentType } : {}),
      allowOverwrite: options.allowOverwrite ?? false,
      addRandomSuffix: options.addRandomSuffix ?? false,
    },
  );

  return {
    url: result.url,
    downloadUrl: result.downloadUrl,
    pathname: result.pathname,
  };
}

export async function deleteBlob(token: string, urlOrPathname: string): Promise<void> {
  try {
    await del(urlOrPathname, { token });
  } catch {
    // Ignore "not found" errors — blob may have already been deleted
  }
}
