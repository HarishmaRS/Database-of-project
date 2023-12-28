const menuitems = require('../Model/menuitem');

exports.getAllMenuitems = async(req, res) => {
    try{
        const menu = await menuitems.find();
        res.status(200).json({
            message : "menuitems Fetched Successfully",
            menuitems : menu
        });
    }
    catch(err){
        res.status(500).json({error:"Internal server error"});
    }
}

exports.getMenuItemsById = async(req, res) => {    
    const item = await menuitems.findById(req.params.id);
    try {
      res.status(200).json({
          message : `menuitems fetched Successfully`,
          Menuitems : item
      })
    } 
  catch (err) {
  
    res.status(500).json({ error: 'DB Internal Server Error occured' });
  }
}
exports.getMenuItemsByRestaurantId = async(req, res) => {    
  const {restaurant_id} = req.params;
  const item = await menuitems.find({restaurant_id});
  try {
    res.status(200).json(item)
  } 
catch (err) {

  res.status(500).json({ error: 'DB Internal Server Error occured' });
}
}