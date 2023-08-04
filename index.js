const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI ="mongodb+srv://hector:12345@cluster0.nhp3iwl.mongodb.net/MyFirstDataBase";

mongoose.connect(MONGODB_URI)

  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })

  .then(() => {

    Recipe.create({
      title: "Delicious Pancakes",
      level: "Easy Peasy",
      ingredients: ["flour", "milk", "eggs", "sugar", "baking powder"],
      cuisine: "American",
      dishType: "breakfast",
      image: "https://images.media-allrecipes.com/images/12345.jpg",
      duration: 30,
      creator: "John Doe",
      created: new Date("2023-08-04"),
    });
    // Run your code here, after you have insured that the connection was made
     // For example, you can add the new recipe and insert data from the data.json file here
  })

  .then(async()=>{
    await Recipe.insertMany(data)
    .then((dataRecipe)=>{
      dataRecipe.forEach((element)=>{
        console.log(element.title);
      })
    })
    .catch((err)=>{
      console.log('not working', err);

    })
   


  })

  const recipeIdToUpdate = '64cd1e4165b36616473c6e76';
  const newDuration = 100;
  
  Recipe.findOneAndUpdate(
    { _id: recipeIdToUpdate }, 
    { duration: newDuration },
    { new: true } 
  )

    .then((updatedRecipe) => {
      if (updatedRecipe) {
        console.log('Recipe updated successfully:');
        console.log(updatedRecipe);
      } else {
        console.log('Recipe not found.');
      }
    })
    .catch((error) => {
      console.log('Error updating recipe:', error);
    });

