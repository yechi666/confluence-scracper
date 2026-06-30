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
  parentId: string | null;
  title: string;
  status: string;
  body: string;
  version: number;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConfluenceAttachment {
  id: string;
  pageId: string;
  title: string;
  mediaType: string;
  fileSize: number;
  downloadLink: string;
  createdAt: string;
}
