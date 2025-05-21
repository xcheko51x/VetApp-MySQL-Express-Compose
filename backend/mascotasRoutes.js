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
        INSERT INTO mascotas(id_mascota, nombre, especie, sexo, id_propietario)
        VALUES(?,?,?,?,?)
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

module.exports = router