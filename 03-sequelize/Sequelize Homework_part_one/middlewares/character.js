const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

module.exports = router;

router.post('/', async(req, res) => {
    const { code, name, age, hp, race, mana, date_added } = req.body;

    if(!code || !name || !hp || !mana){
        res.status(404).send("Falta enviar datos obligatorios");
    }
    try {
        const response = await Character.create(req.body)
        res.status(201).json(response);
    } catch (error) {
        res.status(404).send( "Error en alguno de los datos provistos")
    }
})

//medio trucho
// router.get('/', async(req, res) => { 
//     const { race } = req.query;
//     if(!race) {
//         const characters = await Character.findAll();
//         res.json(characters);
//     } else {
//         const characters = await Character.findAll({
//             where: {
//                 race
//             }
//         })
//         res.json(characters);
//     }

// })

// mas posta
router.get('/', async(req, res) => {
    const { race } = req.query;
    const condition = {};
    const where = {};
    if(race) where.race = race;
    condition.where = where;
    const characters = await Character.findAll(condition);
    res.json(characters);
})

router.get('/:code', async(req, res) => {
    const { code } = req.params;
    const character = await Character.findByPk(code);
    if(!character) {
        res.status(404).send(`El código ${code} no corresponde a un personaje existente`);
    } else {
        res.json(character);
    }

})



