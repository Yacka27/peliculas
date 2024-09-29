const { Router } = require("express");
const Genero = require("../models/Genero");
const { validationResult, check } = require("express-validator");

const router = Router();

//GET
router.get("/", async function (req,res) {

    try {
        
        const generos = await Genero.find();
        res.send(generos);

    } catch (error) {
        console.log(error)
        res.status(500).send("error")
    }
    
});

   // POST
router.post('/',[
    check( 'nombre', 'invalid.nombre').not().isEmpty(),
    check( 'estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check( 'fechaCreacion', 'invalid.fecha').isDate(),
    check( 'fechaActualizacion', 'invalid.fecha').isDate(),
    check( 'descripcion', 'invalid.descripcion').isString(),
], async function (req,res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({mensaje: errors.array()});
        }

        let genero = new Genero();
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.fechaCreacion = new Date;
        genero.fechaActualizacion = new Date;
        genero.descripcion = req.body.descripcion;
        

        genero = await genero.save();
        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear genero')
    }
    
});

  // PUT
router.put('/:generoId', [
    check( 'nombre', 'invalid.nombre').not().isEmpty(),
    check( 'estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check( 'fechaActualizacion', 'invalid.fecha').isDate(),
    check( 'descripcion', 'invalid.descripcion').isString(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let genero = await Genero.findById(req.params.generoId);

        if (!genero) {
            return res.status(400).send('Genero no existe');
        }


        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.fechaCreacion = new Date;
        genero.fechaActualizacion = new Date;
        genero.descripcion = req.body.descripcion;

        genero = await genero.save();
        res.send(genero);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar Genero')
        
    }
    
});

module.exports = router;