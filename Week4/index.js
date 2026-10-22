const mongoose = require('mongoose');

const MONGO_URI ='mongodb+srv://mehtaneel84_db_user:Neel2304@cluster0.ejrzw9w.mongodb.net/'
const PersonSchema = new mongoose.Schema({ 
    name: { 
        type: String, 
        required: true 
    }, 
    age: Number, 
    gender: String, 
    salary: Number 
}); 
 
const Person = mongoose.model( 
    'modelname', 
    PersonSchema, 
    'personCollection' 
);
const doc1 = new Person({ 
        name: 'NHQ', 
        age: 32, 
        gender: 'Male', 
        salary: 1234 
    }); 
    async function insertOne() {
    const savedDoc = await doc1.save();

    console.log('One document inserted');
    console.log(savedDoc);
}
 

async function main() { 
 
    try { 
 
        await mongoose.connect(MONGO_URI); 
        console.log(`Connected to ${MONGO_URI}`); 
 
        await insertOne(); 
 
        } catch (err) { 
 
        console.error('Error:', err); 
 
    } finally { 
 
        await mongoose.connection.close(); 
        console.log('Connection closed'); 
 
    } 
} 
 
main(); 
