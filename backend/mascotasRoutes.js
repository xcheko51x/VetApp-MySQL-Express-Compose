const express = require('express')
const router = express.Router()
const db = require('./conexion')

router.post('/mascotas/add', (req, res) => {

    const idMascota = Date.now()

    const { nombre, especie, sexo, id_propietario } = req.body

    if(
        !idMascota ||
        !nombre ||
        !especie ||
        !sexo ||
        !id_propietario
    ) {
        return res.status(400).send('Todos los campos son obligatorios')
    }

    const query = `
        INSERT INTO 
            mascotas(id_mascota, nombre, especie, sexo, id_propietario)
        VALUES
            (?,?,?,?,?)
    `

    db.query(query, [idMascota, nombre, especie, sexo, id_propietario], (err, result) => {
        if(err) {
            console.error('Error al agregar la mascota: ', err)
            return res.status(500).send('Error al agregar la mascota')
        }

        res.status(201).send({
            idMascota, nombre, especie, sexo, id_propietario
        })
    })
})

router.get('/mascotas', (req, res) => {
    const query = `
        SELECT 
            mascotas.id_mascota,
            mascotas.nombre AS nombre_mascota,
            mascotas.especie,
            mascotas.sexo,
            mascotas.id_propietario,
            propietarios.nombre AS nombre_propietario,
            propietarios.telefono,
            propietarios.email
        FROM 
            mascotas
        INNER JOIN 
            propietarios ON mascotas.id_propietario = propietarios.id_propietario;
    `

    db.query(query, (err, results) => {
        if(err) {
            return res.status(500).send('Error en la consulta')
        }

        res.json(results)
    })
})

router.get('/mascota', (req, res) => {

    const { id_mascota } = req.query

    const query = `
        SELECT 
            mascotas.id_mascota,
            mascotas.nombre AS nombre_mascota,
            mascotas.especie,
            mascotas.sexo,
            mascotas.id_propietario,
            propietarios.nombre AS nombre_propietario,
            propietarios.telefono,
            propietarios.email
        FROM 
            mascotas
        INNER JOIN 
            propietarios ON mascotas.id_propietario = propietarios.id_propietario
        WHERE 
            id_mascota = ?
    `

    db.query(query, [id_mascota], (err, results) => {
        if(err) {
            return res.status(500).send('Error en la consulta')
        }

        res.json(results)
    })
})

router.put('/mascotas/update', (req, res) => {
    
    const { id_mascota, nombre, especie, sexo, id_propietario } = req.body

    if(
        !id_mascota ||
        !nombre ||
        !especie ||
        !sexo ||
        !id_propietario
    ) {
        return res.status(400).send('Todos los campos son obligatorios')
    }

    const query = `
        UPDATE 
            mascotas
        SET 
            nombre = ?, 
            especie = ?, 
            sexo = ?, 
            id_propietario = ?
        WHERE 
            id_mascota = ?
    `

    db.query(query, [nombre, especie, sexo, id_propietario, id_mascota], (err, result) => {
        if(err) {
            console.error('Error al actualizar la mascota: ', err)
            return res.status(500).send('Error al actualizar la mascota')
        }

        res.status(201).send({
            id_mascota, nombre, especie, sexo, id_propietario
        })
    })
})

router.delete('/mascotas/delete', (req, res) => {
    const { id_mascota } = req.body

    const query = `
        DELETE FROM 
            mascotas 
        WHERE 
            id_mascota = ?
    `

    db.query(query, [id_mascota], (err, result) => {
        if(err) {
            return res.status(500).send('Error al eliminar la mascota')
        }

        res.send('Mascota eliminada')
    })
})

module.exports = router