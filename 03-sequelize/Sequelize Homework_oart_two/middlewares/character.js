const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
  const { code, name, hp, mana } = req.body;
  if(!code || !name || !hp || !mana) return res.status(404).send('Falta enviar datos obligatorios');
  try {
    const character = await Character.create(req.body);
    res.status(201).json(character);
  } catch (error) {
    res.status(404).send('Error en alguno de los datos provistos');
  }
})

router.get('/young', async(req, res) => {//ojo con el orden
  // const { age } = req.body; supongo que es lo único que viene por default
  const characters = await Character.findAll({
    where: {
        age: {
          [Op.lt]: 25
        }
    }
  });
  res.json(characters);
})

// GET /character --> Devolver todos los personajes
// GET /character?race=Human --> Devolver SOLo los personajes con race = Human
router.get('/', async (req, res) => {
  const { race, age } = req.query;
  // if(!race || !age) {
  //   const characters = await Character.findAll({});
  //   res.json(characters);
  // } else {
  //   const characters = await Character.findAll({
  //     where: {
  //       race: race,
  //       age: age
  //     }
  //   });
  //   res.json(characters);
  // }
  const condition = {};
  const where = {};
  if(race) where.race = race;
  if(age) where.age = age

  // if(age) where.age = age:
  // where = {
  //   race: 'Human'
  // }
  // condition = {
  //   where: {
  //     race: 'Human',
  //     age: 27
  //   }
  // }
  condition.where = where;
  const characters = await Character.findAll(condition);
  res.json(characters);
})

router.get('/roles/:code', async(req, res) => {
  const { code } = req.params;
  const character = await Character.findByPk(code, {
    include: Role
  });
  res.json(character)
})

router.get('/:code', (req, res) => {
  const { code } = req.params;
  // const character = await Character.findByPk(code);
  Character.findByPk(code)
    .then(character => {
      if(!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`);
      res.json(character);
    })
})

router.put('/addAbilities', async(req, res) => {//ojo el orden
  const { codeCharacter, abilities} = req.body;
  const character = await Character.findByPk(codeCharacter);//traigo el peronaje
  const promises = abilities.map(a => character.createAbility(a));//le creo y asocio las abilities
  await Promise.all(promises);//await a que se cumplan las promesas;
})

router.put('/:attribute', async(req, res) => {
  const { attribute } = req.params;
  const { value } = req.query;

  await Character.update({ //no se guarda porque no hay que devolver
    [attribute]: value
  }, {
    where: {
      [attribute]: null
    }
  })
  res.json('Personaje actualizado correctamente');
})


module.exports = router;