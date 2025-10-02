// Import the MongoDB driver
const { MongoClient } = require("mongodb");

// Your Atlas connection string
const uri = "mongodb+srv://faithhosea:faith123@cluster1.sggdnwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Create a client
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    // Choose your database and collection
    const db = client.db("plp_bookstore");     // database name
    const books = db.collection("books");     // collection name

    // Insert a test book
    const result = await books.insertOne({
      title: "Intro to MongoDB",
      author: "Faith Hosea",
      year: 2025
    });
    console.log("📚 Book inserted with ID:", result.insertedId);

    // Read all books
    const allBooks = await books.find().toArray();
    console.log("📖 All books:", allBooks);

  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  } finally {
    // Close the connection
    await client.close();
    console.log("🔒 Connection closed.");
  }
}

// Run the function
run();