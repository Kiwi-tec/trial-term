const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.sqlite');

//  Product quereis  //
function getAllProducts() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM products", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getProductById(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}
// Cart queries
function addToCart(userId, productId, quantity = 1) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO cart_items (user_id, product_id, quantity)
       VALUES (?, ?, ?)`,
      [userId, productId, quantity],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
}

function getCartByUserId(userId) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT products.*, cart_items.quantity
       FROM cart_items
       JOIN products ON cart_items.product_id = products.id
       WHERE cart_items.user_id = ?`,
      [userId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

function clearCart(userId) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM cart_items WHERE user_id = ?`, [userId], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
}

// User queries //
function createUser(name, email, hashedPassword) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
}

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// Export togethr
module.exports = {
 getAllProducts,
  getProductById,
  createUser,
  getUserByEmail,
  addToCart,
  getCartByUserId,
  clearCart
};
