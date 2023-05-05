import { Router as router } from 'express';


export default router()
    .get('/test', (req, res) => {
        console.log('get /');
        res.send({ response: "I am alive" }).status(200);
    })
