const Restaurant = require('../Model/restaurant');

exports.getAllRestaurants = async(req, res) => {
    try{
        const restaurants = await Restaurant.find();
        res.status(200).json({
            message : "Restaurants Fetched Successfully",
            Restaurants : restaurants
        });
    }
    catch(err){
        res.status(500).json({error:"Internal server error"});
    }
}

exports.getAllRestaurantsByLocationId = async(req, res) => {
    try{
        const { location_id } = req.params;
        const locationId = await Restaurant.find({location_id});
        res.json({
            message : `Restaurants fetched for location_id ${location_id}`,
            Restaurants : locationId 
        })
    }
    catch(err){
        res.status(500).json({error:"Internal server error found"});
    }
}

exports.getRestaurantById = async(req, res) => {
    
    
      const restaurant = await Restaurant.findById(req.params.id);
  
      try {
        res.status(200).json({
            message : `Restaurants fetched Successfully`,
            Restaurants : restaurant 
        })
      } 
    catch (err) {
    
      res.status(500).json({ error: 'DB Internal Server Error occured' });
    }
  };

exports.getAllRestaurantsByLocality = async(req, res) =>{
    const { locality } = req.query;
    if(!locality){
        return res.status(400).json({error: "Locality parameter is required"});
    }
    try{
        const restaurants = await Restaurant.find({ locality });
        if(!restaurants || restaurants.length === 0 ){
            return res.status(404).json({error:`Locality not found for ${locality}`})
        }
        res.json({
            message : `Restaurants fetched successfully for Locality ${locality}`,
            Restaurants : restaurants
        });
        
    }
    catch(err){
        res.status(500).json({
            error : "DB server error"
        });
    }
}


exports.filter = async (req, res) => {
    const mealtype_id = req.body.mealtype_id;
    const location_id = req.body.location_id;
    const cuisine_id = req.body.cuisine_id;
    const hcost = req.body.hcost;
    const lcost = req.body.lcost;
    const sort = req.body.sort ? req.body.sort : 1;
    const page = req.body.page ? req.body.page : 1;
   
    let itemPerPage = 2;
    let startIndex = (page * itemPerPage) - itemPerPage;
    let endIndex = (page * itemPerPage);

    let payload = {};

    if(mealtype_id){
        payload = {mealtype_id: {$elemMatch: { mealtype: mealtype_id}}};
    }
    if(mealtype_id && location_id){
        payload = {
            mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
            location_id : location_id
        }
    }
    if(mealtype_id && cuisine_id ){
        payload = {
            mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
            cuisine_id: {$elemMatch: { cuisine: cuisine_id}},
        }
    }
    if(mealtype_id && hcost && lcost){
        payload = {
            mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
            cost : {$lte: hcost, $gte : lcost}
        }
    }
    if(mealtype_id && cuisine_id && hcost && lcost){
        payload = {
            mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
            cost : {$lte: hcost, $gte : lcost},
            cuisine_id: {$elemMatch: { cuisine: cuisine_id}},
        }
    }
    if(mealtype_id && location_id && cuisine_id){
        payload = {
            mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
            location_id : location_id,
            cuisine_id: {$elemMatch: { cuisine: cuisine_id}}
        }
    }
    if(mealtype_id && location_id && hcost && lcost){
        payload = {
            mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
            location_id : location_id,
            cost : {$lte: hcost, $gte : lcost}
        }
    }
    if(mealtype_id && location_id && cuisine_id && hcost && lcost){
        payload = {
            mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
            location_id : location_id,
            cost : {$lte: hcost, $gte : lcost},
            cuisine_id: {$elemMatch: { cuisine: cuisine_id}}
        }
    }


    let list = await Restaurant.find(payload).sort({cost : sort});
        try{
            const pagination = list.slice(startIndex, endIndex);
            let arr = [];
            for(let i = 1; i <= Math.ceil(list.length/itemPerPage); i++)
            {
                arr.push(i);
            }
            res.status(200).json({
            message : "Restaurants fetched successfully",
            restaurants : pagination,
            pageCount : arr,
            currentPage : page
        });
    }catch(err){
        res.status(500).send(err);
    }
}

// Restaurant.find(payload).sort({cost : sort})
//         .then(res => {
//             const pagination = res.slice(startIndex, endIndex);

//         res.status(200).json({
//             message : "Restaurants fetched successfully",
//             restaurants : pagination,
//             pageCount : Math.ceil(res.length / itemPerPage),
//             currentPage : page
//         })}
//         ).catch(err => {
//         res.status(500).send(err);
//     })
