const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname)));


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages', 'index.html')); 
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Safe Work - Site rodando com sucesso na porta ${PORT}`);
});
