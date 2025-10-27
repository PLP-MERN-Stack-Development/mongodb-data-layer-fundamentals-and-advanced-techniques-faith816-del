// Load environment variables and MongoDB driver
require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // 1️⃣ Find all books in a specific genre
const genre = "Science Fiction"; // change as needed
const genreBooks = await books.find({ genre }).toArray();
console.log(`📚 Books in genre '${genre}':`, genreBooks);

// 2️⃣ Find books published after a certain year
const year = 2015;
const recentBooks = await books.find({ published_year: { $gt: year } }).toArray();
console.log(`📖 Books published after ${year}:`, recentBooks);

// 3️⃣ Find books by a specific author
const author = "Faith Hosea"; // or any author in your data
const authorBooks = await books.find({ author }).toArray();
console.log(`✍️ Books by ${author}:`, authorBooks);

// 4️⃣ Update the price of a specific book
const bookTitle = "Intro to MongoDB"; // change to any title you have
const newPrice = 25.99;

const updateResult = await books.updateOne(
  { title: bookTitle },
  { $set: { price: newPrice } }
);

console.log(`💰 Updated ${updateResult.modifiedCount} book(s) with new price.`);

// 5️⃣ Delete a book by its title
const deleteTitle = "Intro to MongoDB"; // change to a book title you want to delete
const deleteResult = await books.deleteOne({ title: deleteTitle });

console.log(`🗑️ Deleted ${deleteResult.deletedCount} book(s) with title '${deleteTitle}'.`);

// 6️⃣ Find books that are both in stock and published after 2010
const filteredBooks = await books
  .find({ in_stock: true, published_year: { $gt: 2010 } })
  .toArray();

console.log("📗 Books in stock and published after 2010:", filteredBooks);

// 7️⃣ Projection: show only title, author, and price fields
const projectedBooks = await books
  .find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } })
  .toArray();

console.log("📋 Books (only selected fields):", projectedBooks);

// 8️⃣ Sort books by price ascending
const sortedAsc = await books.find().sort({ price: 1 }).toArray();
console.log("⬆️ Books sorted by price (ascending):", sortedAsc);

// 9️⃣ Sort books by price descending
const sortedDesc = await books.find().sort({ price: -1 }).toArray();
console.log("⬇️ Books sorted by price (descending):", sortedDesc);

// 🔟 Pagination: show 5 books per page
const page = 1; // change to 2, 3, etc. to view next pages
const limit = 5;
const skip = (page - 1) * limit;

const paginatedBooks = await books.find().skip(skip).limit(limit).toArray();
console.log(`📄 Page ${page} (showing ${limit} books):`, paginatedBooks);

// 1️⃣ Aggregation: average price by genre
const avgPriceByGenre = await books.aggregate([
  { 
    $group: { 
      _id: "$genre", 
      avgPrice: { $avg: "$price" } 
    } 
  }
]).toArray();

console.log("📊 Average price by genre:", avgPriceByGenre);

// 2️⃣ Find the author with the most books
const topAuthor = await books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]).toArray();

console.log("🏆 Author with most books:", topAuthor);

// 3️⃣ Group books by publication decade
const booksByDecade = await books.aggregate([
  {
    $group: {
      _id: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]).toArray();

console.log("📆 Books grouped by decade:", booksByDecade);

// 1️⃣ Create an index on title for faster searches
const titleIndex = await books.createIndex({ title: 1 });
console.log("🔍 Index created on title:", titleIndex);

// Optional: use explain() to see performance
const explainTitle = await books.find({ title: "Mastering Node.js" }).explain("executionStats");
console.log("📈 Explain for title search:", explainTitle.executionStats);

// 2️⃣ Create a compound index on author and published_year
const compoundIndex = await books.createIndex({ author: 1, published_year: -1 });
console.log("🔗 Compound index created on author + published_year:", compoundIndex);

// Optional: use explain() to see performance
const explainCompound = await books.find({ author: "Faith Hosea", published_year: { $gt: 2015 } })
  .explain("executionStats");
console.log("📈 Explain for compound index search:", explainCompound.executionStats);

    // All your queries will go below 👇

  } catch (err) {
    console.error("❌ Error running queries:", err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed.");
  }
}

run();