const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//CREAR
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia,
    };
    usuarios.push(nuevoUsuario);
    res.json(nuevoUsuario);
});

//LEER
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});


app.get('/usuarios/:nombre', (req, res) => {
    const usuarioJuego = usuarios.find(usuario => usuario.nombre === req.params.nombre);
    if (!usuarioJuego) {
        return res.json({ Error: 'El usuario no se ha encontrado.' });
    }
    res.json(usuarioJuego);
});

//ACTUALIZAR
app.put('/usuarios/:nombre', (req, res) => {
    const index = usuarios.findIndex(usuario => usuario.nombre === req.params.nombre);
    if (index === -1) {
        return res.json({ Error: 'El usuario no se ha encontrado.' });
    }
    if (req.body.edad) usuarios[index].edad = req.body.edad;
    if (req.body.lugarProcedencia) usuarios[index].lugarProcedencia = req.body.lugarProcedencia;
    res.json(usuarios[index]);
});

//ELIMINAR
app.delete('/usuarios/:nombre', (req, res) => {
    const usuario = usuarios.find(usuario => usuario.nombre === req.params.nombre);
    if (!usuario) {
        return res.status(404).json({ Error: 'El usuario no se ha encontrado.' });
    }
    usuarios = usuarios.filter(usuario => usuario.nombre !== req.params.nombre);
    res.json({ Mensaje: `El usuario ${req.params.nombre} ha sido eliminado.` });
});

app.listen(PORT, () => {
    console.log(`El servidor se está ejecutando en http://localhost:${PORT}/usuarios`);
});