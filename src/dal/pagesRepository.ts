import { ConfluencePage } from '../confluence/types';

const store = new Map<string, ConfluencePage>();

export async function upsert(page: ConfluencePage): Promise<void> {
  store.set(page.id, page);
}

export async function findBySpace(spaceId: string): Promise<ConfluencePage[]> {
  return Array.from(store.values()).filter((p) => p.spaceId === spaceId);
}

export async function findLastModified(limit = 10): Promise<ConfluencePage[]> {
  return Array.from(store.values())
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}
