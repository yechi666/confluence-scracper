import { ConfluenceAttachment } from '../confluence/types';

interface StoredAttachment extends ConfluenceAttachment {
  filePath?: string;
}

const store = new Map<string, StoredAttachment>();

export async function upsert(attachment: ConfluenceAttachment, filePath?: string): Promise<void> {
  store.set(attachment.id, { ...attachment, filePath });
}

export async function findByPage(pageId: string): Promise<StoredAttachment[]> {
  return Array.from(store.values()).filter((a) => a.pageId === pageId);
}
