const { Router } = require('express');
const { Ability } = require('../db');
const router = Router();

router.post('/', async(req, res) => {
    const { name, mana_cost } = req.body;
    if(!name || !mana_cost) {
        return res.status(404).send("Falta enviar datos obligatorios");
    } else {
        try {
            const ability = await Ability.create(req.body);
            return res.status(201).json(ability);
        } catch ( error ) {
            return res.status(404).send('Request error')
        }
    }
})

router.put('/setCharacter', async(req, res) => {
    const { idAbility, codeCharacter } = req.body;
    // const character = await Character.findByPk(codeCharacter);//parado desde el Character
    // await character.addAbility(idAbility);
    const ability = await Ability.findByPk(idAbility);//parado desde Ability
    await abiliby.setCharacter(codeCharacter);
    res.json(ability);
})

module.exports = router;