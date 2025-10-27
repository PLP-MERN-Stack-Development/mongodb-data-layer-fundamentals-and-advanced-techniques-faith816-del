// Load environment variables from .env
require('dotenv').config();
const { MongoClient } = require("mongodb");

// Load connection string from environment
const uri = process.env.MONGO_URI;

// Safety check
if (!uri) {
  console.error("❌ MONGO_URI not found! Create a .env file with your connection string.");
  process.exit(1);
}

// Create MongoDB client
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // Insert 10 professional-looking book documents
    const result = await books.insertMany([
      {
        title: "Mastering Node.js",
        author: "John Doe",
        genre: "Technology",
        published_year: 2021,
        price: 29.99,
        in_stock: true,
        pages: 350,
        publisher: "TechPress"
      },
      {
        title: "The Art of Data Analysis",
        author: "Jane Smith",
        genre: "Data Science",
        published_year: 2019,
        price: 34.5,
        in_stock: true,
        pages: 280,
        publisher: "Insight Publications"
      },
      {
        title: "Journey Through Time",
        author: "Mark Stevenson",
        genre: "Historical Fiction",
        published_year: 2015,
        price: 22.0,
        in_stock: false,
        pages: 420,
        publisher: "Century Books"
      },
      {
        title: "Cooking Made Simple",
        author: "Lydia Mumo",
        genre: "Cooking",
        published_year: 2020,
        price: 18.75,
        in_stock: true,
        pages: 190,
        publisher: "HomeChef Media"
      },
      {
        title: "Mindset: Unlocking Potential",
        author: "Dr. Caroline K.",
        genre: "Self-Help",
        published_year: 2018,
        price: 27.5,
        in_stock: true,
        pages: 310,
        publisher: "Growth Books"
      },
      {
        title: "Wildlife Adventures",
        author: "Peter Kamau",
        genre: "Travel",
        published_year: 2022,
        price: 24.99,
        in_stock: true,
        pages: 265,
        publisher: "Safari Press"
      },
      {
        title: "Learning MongoDB",
        author: "Faith Hosea",
        genre: "Technology",
        published_year: 2025,
        price: 31.99,
        in_stock: true,
        pages: 320,
        publisher: "CodeSmart Publishing"
      },
      {
        title: "The Ocean's Whisper",
        author: "Amelia Brown",
        genre: "Romance",
        published_year: 2016,
        price: 20.0,
        in_stock: false,
        pages: 275,
        publisher: "BlueWave Books"
      },
      {
        title: "Digital Marketing 101",
        author: "Kevin Omondi",
        genre: "Business",
        published_year: 2023,
        price: 26.99,
        in_stock: true,
        pages: 230,
        publisher: "BizEdge Media"
      },
      {
        title: "Gardening for Beginners",
        author: "Ruth Njeri",
        genre: "Lifestyle",
        published_year: 2020,
        price: 15.99,
        in_stock: true,
        pages: 185,
        publisher: "GreenLeaf Publishers"
      }
    ]);

    console.log(`📚 ${result.insertedCount} books inserted successfully!`);
  } catch (err) {
    console.error("❌ Error inserting books:", err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed.");
  }
}

run();