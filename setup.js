const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.sqlite');

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS products");

  db.run(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      image TEXT,
      description TEXT
    )
  `);

  const products = [
    ["Rain Jacket", 89.99, "Jackets & Sweaters", "images/rain-jacket.jpg", "Waterproof and lightweight. Great for storms and hikes."],
    ["Windbreaker Jacket", 69.99, "Jackets & Sweaters", "images/windbreaker-jacket.jpg", "Classic windbreaker with breathable fabric and zip pockets."],
    ["Puffer Jacket", 119.99, "Jackets & Sweaters", "images/puffer-jacket.jpg", "Insulated puffer for maximum warmth on cold days."],
    ["Wool Sweater", 64.99, "Jackets & Sweaters", "images/wool-sweater.jpg", "Soft wool sweater, great for layering or casual wear."],

    ["Hiking Boots", 110.00, "Boots & Shoes", "images/hiking-boots.jpg", "Durable boots with great ankle support and traction."],
    ["Running Shoes", 85.50, "Boots & Shoes", "images/running-shoes.jpg", "Lightweight running shoes for everyday use."],
    ["Snow Boots", 129.95, "Boots & Shoes", "images/snow-boots.jpg", "Waterproof snow boots with thermal lining."],
    ["Trail Shoes", 59.99, "Boots & Shoes", "images/trail-shoes.jpg", "Trail-ready shoes built for rocky and muddy paths."],

    ["Hiking Backpack", 74.95, "Backpacks", "images/hiking-backpack.jpg", "Spacious hiking pack with water bottle holders."],
    ["Travel Backpack", 82.00, "Backpacks", "images/travel-backpack.jpg", "Carry-on friendly with multiple compartments."],
    ["Camera Backpack", 89.50, "Backpacks", "images/camera-backpack.jpg", "Padded interior for DSLR and gear. Weather resistant."],
    ["Daypack", 49.99, "Backpacks", "images/daypack.jpg", "Simple daypack for quick hikes or commuting."],

    ["Wool Beanie", 22.00, "Hats & Beanies", "images/wool-beanie.jpg", "Warm knit beanie made from soft wool."],
    ["Sun Hat", 25.00, "Hats & Beanies", "images/sun-hat.jpg", "Wide-brimmed hat with UV protection."],
    ["Headband", 18.50, "Hats & Beanies", "images/headband.jpg", "Stretchy headband for running or lounging."],
    ["Fleece Cap", 19.50, "Hats & Beanies", "images/fleece-cap.jpg", "Fleece-lined cap for extra warmth on cold days."]
  ];

  db.run("DROP TABLE IF EXISTS cart_items");
  db.run(`
    CREATE TABLE cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  const stmt = db.prepare(`
    INSERT INTO products (name, price, category, image, description)
    VALUES (?, ?, ?, ?, ?)
  `);

  products.forEach(product => {
    stmt.run(...product);
  });

  stmt.finalize();
  console.log("Database reset");
});

db.close();
