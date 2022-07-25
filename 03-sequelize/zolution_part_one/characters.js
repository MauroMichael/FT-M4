const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();


router.post('/', async (req, res)=>{
    
    let {code, name, age, race, hp, mana, date_added} = req.body

    
    if(!code || !name || !hp || !mana) res.status(404).send(req.body)
    let charac = {code, name, age, race, hp, mana, date_added}
    try {
        const resp = await Character.create(charac)  
        res.send(resp);  
    } catch (error) {
        res.status(404).send(error)
    }        
})

module.exports = router;