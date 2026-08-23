const { products, getNextId } = require("../data/products");

function validateProduct(body, { partial = false } = {}) {
  const errors = [];
  const { name, price, stock } = body;

  if (!partial || name !== undefined) {
    if (typeof name !== "string" || name.trim().length === 0) {
      errors.push("O campo 'name' é obrigatório e deve ser uma string não vazia.");
    }
  }

  if (!partial || price !== undefined) {
    if (typeof price !== "number" || Number.isNaN(price) || price < 0) {
      errors.push("O campo 'price' é obrigatório e deve ser um número maior ou igual a 0.");
    }
  }

  if (!partial || stock !== undefined) {
    if (typeof stock !== "number" || !Number.isInteger(stock) || stock < 0) {
      errors.push("O campo 'stock' é obrigatório e deve ser um número inteiro maior ou igual a 0.");
    }
  }

  return errors;
}

function findAll(req, res) {
  return res.status(200).json(products);
}

function findById(req, res) {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: `Produto com id ${id} não encontrado.` });
  }

  return res.status(200).json(product);
}

function create(req, res) {
  const errors = validateProduct(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ message: "Dados inválidos.", errors });
  }

  const { name, price, stock } = req.body;
  const newProduct = { id: getNextId(), name, price, stock };
  products.push(newProduct);

  return res
    .status(201)
    .location(`/product/${newProduct.id}`)
    .json(newProduct);
}

function replace(req, res) {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Produto com id ${id} não encontrado.` });
  }

  const errors = validateProduct(req.body, { partial: false });
  if (errors.length > 0) {
    return res.status(400).json({ message: "Dados inválidos.", errors });
  }

  const { name, price, stock } = req.body;
  products[index] = { id, name, price, stock };

  return res.status(200).json(products[index]);
}

function update(req, res) {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Produto com id ${id} não encontrado.` });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Envie ao menos um campo para atualizar." });
  }

  const errors = validateProduct(req.body, { partial: true });
  if (errors.length > 0) {
    return res.status(400).json({ message: "Dados inválidos.", errors });
  }

  products[index] = { ...products[index], ...req.body, id };

  return res.status(200).json(products[index]);
}

function remove(req, res) {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Produto com id ${id} não encontrado.` });
  }

  products.splice(index, 1);

  return res.status(204).send();
}

module.exports = { findAll, findById, create, replace, update, remove };