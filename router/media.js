const { Router } = require("express");
const Tipo = require("../models/Tipo");
const { validationResult, check } = require("express-validator");

const router = Router();

router.get("/", async function (req,res) {

    try {
        
        const tipos = await Tipo.find();
        res.send(tipos);

    } catch (error) {
        console.log(error)
        res.status(500).send("error")
    }
    
});

   // POST metodo
router.post('/',[
    check( 'nombre', 'invalid.nombre').not().isEmpty(),
    check( 'fechaCreacion', 'invalid.fecha').isDate(),
    check( 'fechaActualizacion', 'invalid.fecha').isDate(),
    check( 'descripcion', 'invalid.descripcion').isString(),
], async function (req,res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({mensaje: errors.array()});
        }

        const existetipo = await Tipo.findOne({nombre: req.body.nombre})
        if (existetipo) {
            return res.status(400).send('Tipo ya existe')
        }

        let tipo = new Tipo();
        tipo.nombre = req.body.nombre;
        tipo.fechaCreacion = new Date;
        tipo.fechaActualizacion = new Date;
        tipo.descripcion = req.body.descripcion;

        tipo = await tipo.save();
        res.send(tipo);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear tipo')
    }
    
  });

  // PUT
  router.put('/:usuarioId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = await tipo.findById(req.params.tipoId);
        if (!tipo) {
            return res.status(400).send('Usuario no existe');
        }

        const existetipo = await Tipo.findOne({ email: req.body.email, _id:{ $ne: tipo._id} });
        if (existetipo) {
            return res.status(400).send('Email ya existe')
        }

        tipo.nombre = req.body.nombre;
        tipo.email = req.body.email;
        tipo.estado = req.body.estado;
        tipo.fechaActualizacion = new Date;

        tipo = await usuario.save(); 
        res.send(tipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear tipo')
        
    }
    
  });

module.exports = router;