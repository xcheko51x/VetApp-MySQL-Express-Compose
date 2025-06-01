const express = require('express')
const router = express.Router()
const db = require('./conexion')

router.post('/expediente/add', (req, res) => {
    const idExpediente = Date.now()

    const hoy = new Date()
    const dia = String(hoy.getDate()).padStart(2, '0')
    const mes = String(hoy.getMonth() + 1).padStart(2, '0')
    const anio = hoy.getFullYear()

    const fechaFormateada = `${anio}-${mes}-${dia}`

    const { id_mascota, id_propietario, usuario_veterinario, padecimiento, tratamiento, observaciones } = req.body

    let finalObservaciones = observaciones

    if(observaciones == "") {
        finalObservaciones = null
    }

    if(
        !id_mascota ||
        !id_propietario ||
        !usuario_veterinario ||
        !padecimiento ||
        !tratamiento
    ) {
        return res.status(400).send('Todos los campos son obligatorios')
    }

    const query = `
        INSERT INTO 
            expedientes(
                id_expediente,
                id_mascota, 
                id_propietario,
                usuario_veterinario,
                fecha_atencion,
                padecimiento,
                tratamiento,
                observaciones
            )
        VALUES
            (?,?,?,?,?,?,?,?)
    `

    db.query(query, [idExpediente, id_mascota, id_propietario, usuario_veterinario, fechaFormateada, padecimiento, tratamiento, finalObservaciones], (err, result) => {
        if(err) {
            console.error('Error al agregar el expediente: ', err)
            return res.status(500).send('Error al agregar el expediente')
        }

        res.status(201).send({
            idExpediente, id_mascota, id_propietario, usuario_veterinario, fechaFormateada, padecimiento, tratamiento, finalObservaciones
        })
    })
})

router.get('/expediente', (req, res) => {

    const { id_expediente } = req.query

    const query = `
        SELECT 
            e.id_expediente,
            e.fecha_atencion,
            e.padecimiento,
            e.tratamiento,
            e.observaciones,

            -- Datos de la mascota
            m.id_mascota,
            m.nombre AS nombre_mascota,
            m.especie,
            m.sexo,

            -- Datos del propietario
            p.id_propietario,
            p.nombre AS nombre_propietario,
            p.telefono,
            p.email,

            -- Datos del veterinario
            v.usuario AS usuario_veterinario,
            v.nombre AS nombre_veterinario

        FROM expedientes e
        JOIN mascotas m ON e.id_mascota = m.id_mascota
        JOIN propietarios p ON e.id_propietario = p.id_propietario
        JOIN veterinarios v ON e.usuario_veterinario = v.usuario
        WHERE e.id_expediente = ?
    `

    db.query(query, [id_expediente], (err, results) => {
        if(err) {
            return res.status(500).send('Error en la consulta')
        }

        res.json(results)
    })
})

router.get('/expedientes', (req, res) => {

    const query = `
        SELECT 
            e.id_expediente,
            e.fecha_atencion,
            e.padecimiento,
            e.tratamiento,
            e.observaciones,

            -- Datos de la mascota
            m.id_mascota,
            m.nombre AS nombre_mascota,
            m.especie,
            m.sexo,

            -- Datos del propietario
            p.id_propietario,
            p.nombre AS nombre_propietario,
            p.telefono,
            p.email,

            -- Datos del veterinario
            v.usuario AS usuario_veterinario,
            v.nombre AS nombre_veterinario

        FROM expedientes e
        JOIN mascotas m ON e.id_mascota = m.id_mascota
        JOIN propietarios p ON e.id_propietario = p.id_propietario
        JOIN veterinarios v ON e.usuario_veterinario = v.usuario
    `

    db.query(query, (err, results) => {
        if(err) {
            return res.status(500).send('Error en la consulta')
        }

        res.json(results)
    })
})

module.exports = router