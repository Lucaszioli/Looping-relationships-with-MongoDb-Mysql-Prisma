import AulasService from '../services/aulasService'
import { Router, Request, Response, NextFunction } from 'express'


const router = Router();

router.get('/mysql', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const aulas = await AulasService.getAulasMysql();
        res.status(200).json(aulas);
    } catch (error) {
        next(error);
    }
});

router.get('/mongo/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const aulas = await AulasService.getAulasMongo(req.params.id);
        res.status(200).json(aulas);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const aula = await AulasService.createAula(req.body);
        res.status(200).json(aula);
    } catch (error) {
        next(error);
    }
});

router.post('/comment', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await AulasService.createComment(req.body);
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
});

router.delete('/comment/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await AulasService.deleteComment(req.params.id);
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
})

export default router;