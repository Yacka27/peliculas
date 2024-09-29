const { Router } = require("express");
const Director = require("../models/Director");
const { validationResult, check } = require("express-validator");

const router = Router();

//GET
router.get("/", async function (req,res) {

    try {
        
        const directores = await Director.find();
        res.send(directores);

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

], async function (req,res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({mensaje: errors.array()});
        }

        let director = new Director();
        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaCreacion = new Date;
        director.fechaActualizacion = new Date;
        

        director = await director.save();
        res.send(director);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear director')
    }
    
    });

  // PUT
router.put('/:directorId', [
    check( 'nombre', 'invalid.nombre').not().isEmpty(),
    check( 'estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check( 'fechaActualizacion', 'invalid.fecha').isDate(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let director = await Director.findById(req.params.directorId);
        if (!director) {
            return res.status(400).send('Director ya existe');
        }


        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaActualizacion = new Date;

        director = await director.save();
        res.send(director);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar Director')
        
    }
    
});

module.exports = router;