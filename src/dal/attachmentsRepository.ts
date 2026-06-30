import { ConfluenceAttachment } from '../confluence/types';

interface StoredAttachment extends ConfluenceAttachment {
  filePath?: string;
}

const store = new Map<string, StoredAttachment>();

export function upsert(attachment: ConfluenceAttachment, filePath?: string): void {
  store.set(attachment.id, { ...attachment, filePath });
}

export function findByPage(pageId: string): StoredAttachment[] {
  return Array.from(store.values()).filter((a) => a.pageId === pageId);
}
