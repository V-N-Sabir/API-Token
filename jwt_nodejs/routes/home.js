import {Router} from 'express'
const router = Router()

router.get('/', (reg, res) => {
    res.render('index', {
        title: 'Главная страница',
        isHome: true
    })
})

export default router
//module.exports = router