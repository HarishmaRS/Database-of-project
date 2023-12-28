const Meals = require('../Model/meals');

// exports.getAllMeals = async(req, res) => {
//     try{
//         const meal = await Meals.find();
//         res.json({
//             message : "MealTypes Fetched Successfully",
//             MealTypes : meal
//         });
//     }
//     catch(err){
//         res.status(500).json({error:"Internal server error"});
//     }
// }

//without using async await
exports.getAllMeals = (req, res) => {
    Meals.find()
    .then(meals =>{
        res.json({
            message: 'Meals fetched successfully',
            MealTypes : meals
        });
    })
    .catch(error => {
        res.status(500).json({error:"internal server error"});
    })
}