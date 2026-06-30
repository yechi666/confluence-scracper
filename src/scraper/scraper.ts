import * as client from '../confluence/client';
import * as spacesRepository from '../dal/spacesRepository';
import * as pagesRepository from '../dal/pagesRepository';

export async function runScrape(): Promise<void> {
  console.log('[scraper] Starting scrape...');

  const spaces = await client.getSpaces();
  console.log(`[scraper] Found ${spaces.length} spaces`);

  for (const space of spaces) {
    await spacesRepository.upsert(space);

    const pages = await client.getPagesForSpace(space.id);
    console.log(`[scraper] Space "${space.name}": ${pages.length} pages`);

    for (const page of pages) {
      await pagesRepository.upsert(page);
    }
  }

  console.log('[scraper] Done');
}
