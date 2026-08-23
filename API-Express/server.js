const express = require("express");
const productRoutes = require("./src/routes/product.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(productRoutes);

// 404 para rotas não mapeadas
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada." });
});

app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "JSON inválido no corpo da requisição." });
  }
  console.error(err);
  return res.status(500).json({ message: "Erro interno do servidor." });
});

app.listen(PORT, () => {
  console.log(`API de produtos rodando em http://localhost:${PORT}`);
});