import { ConfluenceSpace } from '../confluence/types';

const store = new Map<string, ConfluenceSpace>();

export function upsert(space: ConfluenceSpace): void {
  store.set(space.id, space);
}

export function findAll(): ConfluenceSpace[] {
  return Array.from(store.values());
}
