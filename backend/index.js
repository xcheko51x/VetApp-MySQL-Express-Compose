const express = require('express')
const bodyParser = require('body-parser')

const usuariosRoutes = require('./usuariosRoutes')
const mascotasRoutes = require('./mascotasRoutes')
const propietariosRoutes = require('./propietariosRoutes')
const expedientesRoutes = require('./expedientesRoutes')

// CREAR INSTACIA DE EXPRESS
const app = express()

// MIDDLEWARE PARA ANALIZAR JSON
app.use(bodyParser.json())

// IMPORTAMOS EL USO DE LAS RUTAS
app.use('/', usuariosRoutes)
app.use('/', mascotasRoutes)
app.use('/', propietariosRoutes)
app.use('/', expedientesRoutes)

// INICIAR EL SERVIDOR
const port = 3000
app.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`)
})