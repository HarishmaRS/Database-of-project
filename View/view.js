const express = require('express');
const router = express.Router();

const locationController = require('../Controller/location');
const mealController = require('../Controller/meals');
const restaurantController = require('../Controller/restaurant');
const menuItemController = require('../Controller/menuitems');

router.get('/locations',locationController.getAllLocations);
// router.get('/locations/:location_id', locationController.getLocationById);
// router.get('/locations/id', locationController.getLocationByIdQuery);
router.get('/meals', mealController.getAllMeals);
router.post('/filter', restaurantController.filter);
router.get('/restaurants/locality', restaurantController.getAllRestaurantsByLocality);
router.get('/restaurants/:id', restaurantController.getRestaurantById);
router.get('/restaurant/:location_id', restaurantController.getAllRestaurantsByLocationId);
router.get('/restaurants', restaurantController.getAllRestaurants)
router.get('/menuitems/:id', menuItemController.getMenuItemsById);
router.get('/menuitem/:restaurant_id', menuItemController.getMenuItemsByRestaurantId);
router.get('/menuitems',menuItemController.getAllMenuitems);

module.exports = router;  