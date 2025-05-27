const express = require('express')
const router = express.Router()
const db = require('./conexion')

router.post('/propietarios/add', (req, res) => {

    const idPropietario = Date.now()

    const { nombre, telefono, email } = req.body

    let finalTelefono = telefono
    let finalEmail = email

    if(!nombre) {
        return res.status(400).send('Todos los campos son obligatorios')
    }

    if(telefono == "") {
        finalTelefono = null
    }

    if(email == "") {
        finalEmail = null
    }

    const query = `
        INSERT INTO 
            propietarios(id_propietario, nombre, telefono, email)
        VALUES
            (?,?,?,?)
    `

    db.query(query, [idPropietario, nombre, finalTelefono, finalEmail], (err, result) => {
        if(err) {
            console.error('Error al agregar al propietario: ', err)
            return res.status(500).send('Error al agregar al propietario')
        }

        res.status(201).send({
            idPropietario, nombre, telefono, email
        })
    })
})

router.get('/propietarios', (req, res) => {
    const query = `
        SELECT 
            *
        FROM 
            propietarios
    `

    db.query(query, (err, results) => {
        if(err) {
            return res.status(500).send('Error en la consulta')
        }

        res.json(results)
    })
})

router.put('/propietarios/update', (req, res) => {
    
    const { id_propietario, nombre, telefono, email } = req.body

    let finalTelefono = telefono
    let finalEmail = email

    if(
        !id_propietario ||
        !nombre
    ) {
        return res.status(400).send('Todos los campos son obligatorios')
    }

    if(telefono == "") {
        finalTelefono = null
    }

    if(email == "") {
        finalEmail = null
    }

    const query = `
        UPDATE 
            propietarios
        SET 
            nombre = ?, 
            telefono = ?, 
            email = ?
        WHERE 
            id_propietario = ?
    `

    db.query(query, [nombre, finalTelefono, finalEmail, id_propietario], (err, result) => {
        if(err) {
            console.error('Error al actualizar al propietario: ', err)
            return res.status(500).send('Error al actualizar al propietarion')
        }

        res.status(201).send({
            id_propietario, nombre, telefono, email
        })
    })
})

router.delete('/propietarios/delete', (req, res) => {
    const { id_propietario } = req.body

    const query = `
        DELETE FROM 
            propietarios 
        WHERE 
            id_propietario = ?
    `

    db.query(query, [id_propietario], (err, result) => {
        if(err) {
            return res.status(500).send('Error al eliminar al propietario')
        }

        res.send('Propietario eliminado')
    })
})

module.exports = router