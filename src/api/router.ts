import { Router } from 'express';
import * as spacesRepository from '../dal/spacesRepository';
import * as pagesRepository from '../dal/pagesRepository';

const router = Router();

router.get('/spaces', async (_req, res) => {
  const spaces = await spacesRepository.findAll();
  res.json(spaces);
});

router.get('/spaces/:spaceId/pages', async (req, res) => {
  const pages = await pagesRepository.findBySpace(req.params.spaceId);
  res.json(pages);
});

router.get('/pages/recent', async (_req, res) => {
  const pages = await pagesRepository.findLastModified(10);
  res.json(pages);
});

export default router;
