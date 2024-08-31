import * as SQLite from 'expo-sqlite';

async function initializeDatabase() {
  const db = await SQLite.openDatabaseAsync('databaseName');

  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS inventory (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        uom INTEGER NOT NULL,
        isFavourite INTEGER NOT NULL,
        defaultExpiry INTEGER NOT NULL
      );

      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('1', 'Milk', '1 gallon of whole milk', 'Dairy', 1, 1, 7);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('2', 'Cheddar Cheese', 'Block of aged cheddar cheese', 'Dairy', 1, 0, 30);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('3', 'Chicken Breast', 'Boneless, skinless chicken breast', 'Poultry', 2, 1, 3);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('4', 'Eggs', 'Carton of a dozen large eggs', 'Poultry', 12, 0, 21);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('5', 'Lettuce', 'Fresh romaine lettuce', 'Produce', 1, 0, 5);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('6', 'Apples', 'Bag of organic Fuji apples', 'Produce', 6, 1, 30);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('7', 'Frozen Peas', 'Bag of frozen green peas', 'Frozen', 1, 0, 365);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('8', 'Ice Cream', 'Vanilla ice cream, 1 quart', 'Frozen', 1, 1, 180);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('9', 'Orange Juice', '64 oz bottle of orange juice', 'Beverages', 1, 0, 10);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('10', 'Coca-Cola', '12-pack of Coca-Cola cans', 'Beverages', 12, 1, 365);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('11', 'Canned Tomatoes', 'Can of diced tomatoes', 'Canned', 1, 0, 730);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('12', 'Canned Beans', 'Can of black beans', 'Canned', 1, 0, 730);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('13', 'Bread', 'Loaf of whole wheat bread', 'Bakery', 1, 1, 7);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('14', 'Muffins', 'Pack of blueberry muffins', 'Bakery', 4, 0, 5);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('15', 'Pasta', 'Box of spaghetti pasta', 'Pantry', 1, 0, 730);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('16', 'Rice', '5 lb bag of jasmine rice', 'Pantry', 1, 1, 1095);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('17', 'Chips', 'Bag of potato chips', 'Snacks', 1, 0, 60);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('18', 'Chocolate Bar', 'Dark chocolate bar, 70% cocoa', 'Snacks', 1, 1, 365);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('19', 'Paper Towels', '6-pack of paper towels', 'Household', 6, 0, 0);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('20', 'Laundry Detergent', 'Bottle of liquid laundry detergent', 'Household', 1, 0, 0);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('21', 'Shampoo', 'Bottle of moisturising shampoo', 'Personal Care', 1, 0, 365);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('22', 'Toothpaste', 'Tube of whitening toothpaste', 'Personal Care', 1, 1, 730);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('23', 'Batteries', 'Pack of AA batteries', 'Misc', 4, 0, 3650);
      INSERT OR IGNORE INTO inventory (id, name, description, category, uom, isFavourite, defaultExpiry) 
      VALUES ('24', 'Light Bulbs', '4-pack of LED light bulbs', 'Misc', 4, 0, 3650);
    `);
  } catch (error) {
    // Handle the error here
    console.error('An error occurred:', error);
  }
}

// Call the function to initialize the database
initializeDatabase();


