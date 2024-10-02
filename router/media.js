const { Router } = require("express");
const Media = require("../models/Media");
const { validationResult, check } = require("express-validator");

const router = Router();

router.get("/", async function (req,res) {

    try {
        
        const medias = await Media.find();
        res.send(medias);

    } catch (error) {
        console.log(error)
        res.status(500).send("error")
    }
    
});

   // POST metodo
router.post('/',[
    check( 'serial', 'invalid.serial').not().isEmpty(),
    check( 'titulo', 'invalid.titulo').not().isEmpty(),
    check( 'sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check( 'urlPeli', 'invalid.urlPeli').not().isEmpty(),
    check( 'foto', 'invalid.foto').not().isEmpty(),
    check( 'fechaCreacion', 'invalid.fecha').isDate(),
    check( 'fechaActualizacion', 'invalid.fecha').isDate(),
    check( 'añoEstreno', 'invalid.fecha').isDate(),
    check( 'genero', 'invalid.genero').not().isEmpty(),
    check( 'director', 'invalid.director').not().isEmpty(),
    check( 'productora', 'invalid.productora').not().isEmpty(),
    check( 'tipo', 'invalid.tipo').not().isEmpty(),

], async function (req,res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({mensaje: errors.array()});
        }

        const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial });
        
        if (existeMediaPorSerial) {
            return res.status(400).send('El serial ya exixte para la media ')
        }

        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.urlPeli = req.body.urlPeli;
        media.foto = req.body.foto;
        media.fechaCreacion = new Date(req.body.fechaCreacion);
        media.fechaActualizacion = new Date(req.body.fechaActualizacion);
        media.añoEstreno = new Date(req.body.añoEstreno);
        media.genero = req.body.genero._id;
        media.director = req.body.director._id;
        media.productora = req.body.productora._id;
        media.tipo = req.body.tipo._id;

        media = await media.save();
        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear media')
    }
    
    });

  // GET
router.get('/', async function (req, res) {

    try {
        const medias = await Media.find().populate([
            {
                path: 'genero', select: 'nombre'
            },
            {
                path: 'director', select: 'nombre'
            },
            {
                path: 'productora', select: 'nombre'
            },
            {
                path: 'tipo', select: 'nombre'
            }
        ]);
    
        res.send(medias);

    } catch(error){
        console.log(error)
    }
    
    })

  // PUT
router.put('/:mediaId', [
    check( 'serial', 'invalid.serial').not().isEmpty(),
    check( 'titulo', 'invalid.titulo').not().isEmpty(),
    check( 'sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check( 'urlPeli', 'invalid.urlPeli').not().isEmpty(),
    check( 'foto', 'invalid.foto').not().isEmpty(),
    check( 'fechaCreacion', 'invalid.fecha').isDate(),
    check( 'fechaActualizacion', 'invalid.fecha').isDate(),
    check( 'añoEstreno', 'invalid.fecha').isDate(),
    check( 'genero', 'invalid.genero').not().isEmpty(),
    check( 'director', 'invalid.director').not().isEmpty(),
    check( 'productora', 'invalid.productora').not().isEmpty(),
    check( 'tipo', 'invalid.tipo').not().isEmpty(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let media = await Media.findById(req.params.mediaId);

        if (!media) {
            return res.status(400).send('Media no existe');
        }

        const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial, _id:{$ne: media._id} });
        
        if (existeMediaPorSerial) {
            return res.status(400).send('El serial ya esta en uso')
        }

        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.urlPeli = req.body.urlPeli;
        media.foto = req.body.foto;
        media.fechaCreacion = new Date(req.body.fechaCreacion);
        media.fechaActualizacion = new Date(req.body.fechaActualizacion);
        media.añoEstreno = new Date(req.body.añoEstreno);
        media.genero = req.body.genero._id;
        media.director = req.body.director._id;
        media.productora = req.body.productora._id;
        media.tipo = req.body.tipo._id;

        media = await media.save();
        res.send(media);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear media')
        
    }
});

module.exports = router;