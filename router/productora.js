const { Router } = require("express");
const Productora = require("../models/Productora");
const { validationResult, check } = require("express-validator");

const router = Router();

router.get("/", async function (req,res) {

    try {
        
        const productoras = await Productora.find();
        res.send(productoras);

    } catch (error) {
        console.log(error)
        res.status(500).send("error")
    }
    
});

   // POST metodo
router.post('/',[
    check( 'nombre', 'invalid.nombre').not().isEmpty(),
    check( 'estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check( 'fechaCreacion', 'invalid.fecha').isDate(),
    check( 'fechaActualizacion', 'invalid.fecha').isDate(),
    check( 'slogan', 'invalid.slogan').isString(),
    check( 'descripcion', 'invalid.descripcion').isString(),
], async function (req,res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({mensaje: errors.array()});
        }

        let productora = new Productora();
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.fechaCreacion = new Date;
        productora.fechaActualizacion = new Date;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;

        productora = await productora.save();
        res.send(productora);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear productora')
    }
    
});

  // PUT
router.put('/:productoraId', [
    check( 'nombre', 'invalid.nombre').not().isEmpty(),
    check( 'estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check( 'fechaCreacion', 'invalid.fecha').isDate(),
    check( 'fechaActualizacion', 'invalid.fecha').isDate(),
    check( 'slogan', 'invalid.slogan').isString(),
    check( 'descripcion', 'invalid.descripcion').isString(),
], async function (req, res) {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let productora = await Productora.findById(req.params.productoraId);

        if (!productora) {
            return res.status(400).send('Productora ya existe');
        }

        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.fechaCreacion = new Date;
        productora.fechaActualizacion = new Date;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;

        productora = await productora.save();
        res.send(productora);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear productora')
        
    }
    
});

module.exports = router;