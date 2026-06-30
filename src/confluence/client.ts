import axios from 'axios';
import { ConfluenceAttachment, ConfluencePage, ConfluenceSpace } from './types';

interface PaginatedResult<T> {
  results: T[];
  _links: {
    next?: string;
    base: string;
  };
}

interface RawPage {
  id: string;
  spaceId: string;
  parentId: string | null;
  title: string;
  status: string;
  body: { storage: { value: string } };
  version: { number: number; createdAt: string };
  authorId: string;
  createdAt: string;
}

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

const BASE_URL = requireEnv('CONFLUENCE_BASE_URL');

const http = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: requireEnv('CONFLUENCE_USERNAME'),
    password: requireEnv('CONFLUENCE_API_TOKEN'),
  },
  headers: { Accept: 'application/json' },
});

export async function getSpaces(): Promise<ConfluenceSpace[]> {
  return fetchAll<ConfluenceSpace>('/api/v2/spaces', { limit: 50 });
}

export async function getPagesForSpace(spaceId: string): Promise<ConfluencePage[]> {
  const raw = await fetchAll<RawPage>(`/api/v2/spaces/${spaceId}/pages`, {
    limit: 50,
    'body-format': 'storage',
  });
  return raw.map((p) => ({
    id: p.id,
    spaceId: p.spaceId,
    parentId: p.parentId,
    title: p.title,
    status: p.status,
    body: p.body.storage.value,
    version: p.version.number,
    authorId: p.authorId,
    createdAt: p.createdAt,
    updatedAt: p.version.createdAt,
  }));
}

export async function getAttachmentsForPage(pageId: string): Promise<ConfluenceAttachment[]> {
  return fetchAll<ConfluenceAttachment>(`/api/v2/pages/${pageId}/attachments`, { limit: 50 });
}

export async function downloadAttachment(downloadLink: string): Promise<Buffer> {
  const res = await http.get<ArrayBuffer>(downloadLink, { responseType: 'arraybuffer' });
  return Buffer.from(res.data);
}

async function fetchAll<T>(path: string, params: Record<string, unknown>): Promise<T[]> {
  const items: T[] = [];
  let cursor: string | undefined;

  do {
    const res = await http.get<PaginatedResult<T>>(path, {
      params: cursor ? { ...params, cursor } : params,
    });
    items.push(...res.data.results);
    cursor = extractCursor(res.data._links.next);
  } while (cursor);

  return items;
}

function extractCursor(next?: string): string | undefined {
  if (!next) return undefined;
  return new URL(next, BASE_URL).searchParams.get('cursor') ?? undefined;
}
