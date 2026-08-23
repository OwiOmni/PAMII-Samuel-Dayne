let products = [
  { id: 1, name: "Teclado Mecânico", price: 349.9, stock: 12 },
  { id: 2, name: "Mouse Gamer", price: 129.9, stock: 30 },
  { id: 3, name: "Monitor 27''", price: 1299.0, stock: 5 },
];

let nextId = 4;

function getNextId() {
  return nextId++;
}

module.exports = { products, getNextId };