import { ConfluencePage } from '../confluence/types';

const store = new Map<string, ConfluencePage>();

export function upsert(page: ConfluencePage): void {
  store.set(page.id, page);
}

export function findBySpace(spaceId: string): ConfluencePage[] {
  return Array.from(store.values()).filter((p) => p.spaceId === spaceId);
}

export function findLastModified(limit = 10): ConfluencePage[] {
  return Array.from(store.values())
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}
