const { Router } = require("express");
const Tipo = require("../models/Tipo");
const { validationResult, check } = require("express-validator");

const router = Router();

// Listar todos los tipos
router.get("/", async function (req, res) {
    try {
        const tipos = await Tipo.find();
        res.send(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al obtener los tipos");
    }
});

// POST para crear un nuevo tipo
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('fechaCreacion', 'invalid.fecha').isDate(),
    check('fechaActualizacion', 'invalid.fecha').isDate(),
    check('descripcion', 'invalid.descripcion').isString(),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = new Tipo();
        tipo.nombre = req.body.nombre;
        tipo.fechaCreacion = new Date();
        tipo.fechaActualizacion = new Date();
        tipo.descripcion = req.body.descripcion;

        tipo = await tipo.save();
        res.send(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear el tipo');
    }
});

// PUT para actualizar un tipo existente
router.put('/:tipoId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('fechaActualizacion', 'invalid.fecha').isDate(),
    check('descripcion', 'invalid.descripcion').isString(),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = await Tipo.findById(req.params.tipoId);
        if (!tipo) {
            return res.status(404).send('Tipo no encontrado');
        }

        tipo.nombre = req.body.nombre;
        tipo.fechaActualizacion = new Date();  // Fecha actual para la actualización
        tipo.descripcion = req.body.descripcion;

        tipo = await tipo.save();
        res.send(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar el tipo');
    }
});

// DELETE para eliminar un tipo por su ID
router.delete('/:tipoId', async function (req, res) {
    try {
        const tipo = await Tipo.findByIdAndDelete(req.params.tipoId);
        if (!tipo) {
            return res.status(404).send('Tipo no encontrado');
        }
        res.send('Tipo eliminado exitosamente');
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al eliminar el tipo');
    }
});

module.exports = router;