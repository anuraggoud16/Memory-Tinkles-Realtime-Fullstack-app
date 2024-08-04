const mongoose =require('mongoose');

const connectDB = async () => {
 try {
    const conn = await mongoose.connect(
        'mongodb+srv://kanuraggoud16:5wmZ660l3aY1zX8e@mt.3syxzwz.mongodb.net/memorytinkles?retryWrites=true&w=majority&appName=MT'
        );
    console.log(`MongoDB Conected: ${conn.connection.host}`);
 } catch (error) {
  console.log(error);
  process.exit(1);
 }
};

module.exports = connectDB;