import { Router } from 'express'
var router = Router();

import trimRoutes from './trim/index.js';

/* home page resource. */
router.route('/')
  .get(function(req, res, next) {
    console.log("hello")
    res.send('Hello, world with slash at root');
  });
router.use('/trim', trimRoutes);

/* GET test page. */
router.get('/test', function(req, res, next) {
  res.send('Hello, test');
});


export default router;
