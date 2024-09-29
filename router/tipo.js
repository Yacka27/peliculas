const { Router } = require("express");
const Tipo = require("../models/Tipo");
const { validationResult, check } = require("express-validator");

const router = Router();

// Listar
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
    check( 'fechaCreacion', 'invalid.fecha').not().isDate(),
    check( 'fechaActualizacion', 'invalid.fecha').not().isDate(),
    check( 'descripcion', 'invalid.descripcion').isString(),
], async function (req,res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({mensaje: errors.array()});
        }
/*
        const existetipo = await Tipo.findOne({nombre: req.body.nombre})
        if (existetipo) {
            return res.status(400).send('Tipo ya existe')
        }
*/
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
router.put('/:tipoId',[
    check( 'nombre', 'invalid.nombre').not().isEmpty(),
    check( 'fechaActualizacion', 'invalid.fecha').isDate(),
    check( 'descripcion', 'invalid.descripcion').isString(),
], async function (req,res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = await Tipo.findById(req.params.tipoId);

        if (!tipo) {
            return res.status(400).send('Tipo no existe');
        }
/*
        const existeTipo = await Tipo.findOne({ nombre: req.body.nombre, _id:{ $ne: tipo._id} });
        if (existeTipo) {
            return res.status(400).send('Tipo ya existe')
        }
*/
        tipo.nombre = req.body.nombre;
        tipo.fechaCreacion = new Date;
        tipo.fechaActualizacion = new Date;
        tipo.descripcion = req.body.descripcion;

        tipo = await tipo.save(); 
        res.send(tipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear tipo')
        
    }
    
    });

module.exports = router;