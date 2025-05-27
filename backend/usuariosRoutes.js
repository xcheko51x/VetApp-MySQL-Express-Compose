const express = require('express')
const router = express.Router()
const db = require('./conexion')

// RUTA PARA EL LOGIN
router.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body

    if(!usuario || !contrasena) {
        return res.status(400).send('Usuario y contraseña son obligatorios')
    }

    // CONSULTA
    const query = `
        SELECT 
            * 
        FROM 
            veterinarios 
        WHERE 
            usuario = ? 
        AND 
            contrasena = ?
    `

    // BUSCAR EL USUARIO EN LA BASE DE DATOS
    db.query(query, [usuario, contrasena], (err, results) => {
        if(err) {
            return res.status(500).send('Error en la consulta')
        }

        if(results.length === 0) {
            return res.status(401).send('Usuario no encontrado')
        }

        const usuarioEncontrado = results[0]

        res.status(200).send({
            mensaje: 'Bienvenido al sistema',
            usuario: {
                usuario: usuarioEncontrado.usuario,
                nombre: usuarioEncontrado.nombre
            }
        })
    })
})

module.exports = router