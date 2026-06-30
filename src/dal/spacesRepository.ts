import { ConfluenceSpace } from '../confluence/types';

const store = new Map<string, ConfluenceSpace>();

export async function upsert(space: ConfluenceSpace): Promise<void> {
  store.set(space.id, space);
}

export async function findAll(): Promise<ConfluenceSpace[]> {
  return Array.from(store.values());
}
