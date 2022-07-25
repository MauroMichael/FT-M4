const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:R0b0tech@localhost:5432/demopart04seq', {
    logging: false
}); // Deshabilita el logging explicativo en la terminal. Por default loggea.

// Para chequear la conexión a la db
// sequelize.authenticate()
//     .then(() => {
//         console.log('Conexión exitosa');
//     })
//     .catch(err => {
//         console.log(err);
//     })

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        validate: { //CUSTOM VALIDATOR
            isEven(value) { //el isEven es inventado
                if(value % 2 !== 0) {
                    throw new Error('Only even values are allowed');
                }
            }
        }
    },
    skill: {
        type: DataTypes.FLOAT,
        defaultValue: 50.0,
        get() { // el GETTER agrega datos por fuera de la db
            return this.getDataValue('skill') + ' points para ' + this.firstName;
        }
    },
    password: {
        type: DataTypes.STRING,
        set(value) { // el SETTER agrea datos de forma dinámia al usuario en la db
            this.setDataValue('password', (this.firstName + this.lastName + value).split('').sort(() => 0.5 - Math.random()).join(''));
        } //en este caso modifica el password a un hash trucho
    },
    fullName: {
        type: DataTypes.VIRTUAL, //El VIRTUAL FIELD crea un atributo que no se guarda en la db
        get() {
            return this.firstName + ' ' + this.lastName;
        }
    },
    email: { 
        type: DataTypes.STRING,
        validate: {//VALIDATOR, hay un montón.
            isEmail: true
        }
    }
});

const Team = sequelize.define('Team', {
    code: {
        type: DataTypes.STRING(3),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    uniqueOne: {
        type: DataTypes.STRING,
        unique: 'compositeIndex' //el valor no se puede repetir en ninguno de los dos atributos.
    },
    uniqueTwo: {
        type: DataTypes.INTEGER,
        unique: 'compositeIndex'
    }
},
{
    timestamps: false  //3er parametro para sacar los timestamps por deafault(createdAt y upda...)
});

// Team.hasOne(User); //Asociación uno a uno, realcion de tablas, genera una Fk en User
// User.belongsTo(Team);//ONE TO ONE

// Team.hasMany(User); //Asociación ONE TO MANY, ralacion de tablas, 
// User.belongsTo(Team);

Team.belongsToMany(User, { through: 'Team_Player'}); //Esto siempre y cuando no haya que agrear atributos a la tabla intermedia
User.belongsToMany(Team, { through: 'Team_Player'});//sino hay que crear una como todas, con sequelize.difine

// Para sincronizar/crear un solo modelo o tabla
// User.sync()
//     .then(() => {
//         console.log('User sincronizado');
//     })

// Para sincronizar/crear toda la bd
// sequelize.sync()
//     .then(() => {
//         console.log('Modelos sincronizados');
//     })

// Actualiza sólo los cambios agreagados
// sequelize.sync({ alter: true})
//     .then (() => {
//         console.log('Modelos sincronizados');
//     });

// // Actualiza todos los cambios de la bd y los reacomoda OJO: si hay info en las tabalas, las elimina
sequelize.sync({ force: true })
    .then(async () => {
        console.log('Modelos sincronizados');

        const user1 = await User.create({
            firstName: 'Mauro',
            lastName: 'Ptaskin',
            age: 48,
            skill: 12.2,
            password: 2022,
            email: 'mauro@mail.com'
        })

        const user2 = await User.create({
            firstName: 'Ian',
            lastName: 'Vecchiarelli',
            age: 10
        })

        const user3 = await User.create({
            firstName: 'Fernando',
            lastName: 'Vecchiarelli',
            age: 54,
            skill: 31
        })

        const user4 = await User.create({
            firstName: 'Alma',
            lastName: 'Bertora'
        })

        const user5 = await User.create({
            firstName: 'Mariela',
            lastName: 'Bertora'
        })

        const team1 = await Team.create({
            code: 'SDF',
            name: 'Macross',
            uniqueOne: 'A',
            uniqueTwo: 1
        })

        const team2 = await Team.create({
            code: 'DDL',
            name: 'Dedalus',
            uniqueOne: 'B',
            uniqueTwo: 1
        })


        // user1.age = 28;
        // await user1.save();  //para modificar data

        //await user2.destroy(); //para eliminar fila

        //console.log(user1.toJSON()); //para loguear solo datos generados

        // const users = await User.findAll();
        // console.log(users.map(u => u.toJSON()));//Traer todos los User, OJO es un array.

        // const users = await User.findAll({
        //     attributes: ['lastName', ['skill', 'habilidad']]
        // });
        // console.log(users.map(u => u.toJSON())) //Traer atributos específicos y/o modificar su nombre

        // const users = await User.findAll({
        //     where: {
        //         lastName: 'Vecchiarelli'
        //     }
        // });
        // console.log(users.map(u => u.toJSON())) //Trae los objs que contengan ese attributo/valor

        // const user = await User.findByPk(2, {
        //     attributes: ['firstName', 'skill']
        // });
        // console.log(user.toJSON());  // Trae por primary key y en este caso el atributo pedido
        // ó
        // const team = await Team.findByPk('SDF');
        // console.log(team.toJSON())

        // const user = await User.findOne({
        //     where: {
        //         lastName: 'Vecchiarelli'
        //     }
        // });
        // console.log(user.toJSON()); //Trae el primero que coincida

        // const [user, created] = await User.findOrCreate({
        //     where: {
        //         lastName: 'Vecchiarelli'
        //     },
        //     defaults: {
        //         firstName: 'Ian'
        //     }
        // });
        // console.log(created);
        // console.log(user.toJSON()); // Si no lo encuentra, lo crea y devueve true

        // const users = await User.findAll({
        //     where: {
        //         [Op.or]: [
        //             {lastName: 'Ptaskin'},
        //             {age: 9}      
        //         ]
        //     }
        // });
        // console.log(users.map(u => u.toJSON())); //Trae los objs que contengan un atributo o el otro

            
        // const users = await User.findAll({
        //     where: {
        //         [Op.or]: [
        //             {lastName: 'Ptaskin'},
        //             {age: {[Op.gt]: 50}  }    
        //         ]
        //     }
        // });
        // console.log(users.map(u => u.toJSON()));//idem anterior + age > 50
        
        // await User.update({
        //     age: 20
        // }, {
        //     where: {
        //         age: {[Op.is]: null} // o simplemente age: null
        //     }
        // })
        // const users = await User.findAll();
        // console.log(users.map(u => u.toJSON()));//actualiza a 20 sólo aquellos que su age sea null
        // //con el 'where' vacío actualiza todos.

        // await User.destroy({
        //     where: {
        //         age: null
        //     }
        // })

        // const users = await User.findAll();
        // console.log(users.map(u => u.toJSON())); //Elimina aqullos cuyo age: null

        // await User.destroy({
        //     truncate: true
        // })

        // const users = await User.findAll();
        // console.log(users.map(u => u.toJSON())); //Elimina todo

//ONE TO ONE --------------------------------------------------------------
        // user2.setTeam('DDL'); //Asocia el usuario al Team por codigo de Team
        // user2.setTeam(team2); //Asocia el usuario al Team por el team(instancia)

        // const teamIan = await user2.getTeam(); // Obtiene el Team al que esta asociado el user
        // console.log(teamIan.toJSON());

        // await user4.createTeam({ // crea el Team y le asigna el user a la vez
        //     code: 'ALF',
        //     name: 'Another Life Form',
        //     uniqueOne: 'C',
        //     uniqueTwo: 1
        // })

        // //Y asi hacer combinaciones:
        // team1.setUser(user3);
        // team2.createUser({
        //     firstName: 'Rick',
        //     lastName: 'Hunter'
        // })


//ONE TO MANY -----------------------------------------------------------------
    // await team1.setUsers([user1, user2]); //OJO: pasa a ser 'Users'(plural)
    // await team1.setUsers([3, 5]); //OJO a los demás users que no son 3 y 5 los saca
    // await team1.addUsers([1, 2]); //agreaga a los que ya están.
    // console.log(await team1.countUsers());


//MANY TO MANY---------------------------------------------------------------
        // await team1.setUsers([3, 4]);
        await user2.setTeams(['SDF', 'DDL']);
        await team1.addUsers([5, 4]);
        // await user1.removeTeam('SDF');


//FETCHING ASSOCIATIONS-----------------------------------------------------
        //LAZY LOADING: lo traigo a medida que lo necestio.
        // const teamRobo = await Team.findByPk('SDF');
        // console.log(teamRobo.toJSON());  //Me traigo el equipo

        // const usersRobo = await teamRobo.getUsers();//ME traigo los users de ese equipo
        // console.log(usersRobo.map(u => u.toJSON()));
        //hasta aca fue como un query de JOIN

//      EAGER LOADING: lo traigo todo junto.
        const teamRobo = await Team.findByPk('SDF', {
            include: User
        });
        console.log(teamRobo.toJSON()); //El 'include' sería el JOIN, devuelve el equipo y un array de sus users

        const allTeams = await Team.findAll({
            include: User
        })
        console.log(allTeams.map(t => t.toJSON()));
    });
