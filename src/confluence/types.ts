// Domain types — what we store and work with internally.
// The Confluence client maps raw API responses onto these.

export interface ConfluenceSpace {
  id: string;
  key: string;
  name: string;
  type: string;
  status: string;
  homepageId: string;
  authorId: string;
  description: string | null;
  createdAt: string;
}

export interface ConfluencePage {
  id: string;
  spaceId: string;
  parentId: string | null; // null for root pages
  title: string;
  status: string;
  body: string;      // extracted from body.storage.value
  version: number;   // extracted from version.number
  authorId: string;
  createdAt: string;
  updatedAt: string; // extracted from version.createdAt
}

export interface ConfluenceAttachment {
  id: string;
  pageId: string;
  title: string;
  mediaType: string;
  fileSize: number;
  downloadLink: string; // relative path, e.g. /rest/api/content/.../download
  createdAt: string;
}

export interface PaginatedResult<T> {
  results: T[];
  _links: {
    next?: string; // absent on the last page
    base: string;
  };
}
