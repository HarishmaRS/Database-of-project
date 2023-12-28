const Location = require('../Model/location');

exports.getAllLocations = async (req, res) => {
    try {
        const location = await Location.find();
        res.status(200).json({
            message: 'Locations fetched successfully',
            Locations: location
        });
    }

    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
// Fetching a particular location_id Using params
exports.getLocationById = async (req, res) => {
    try {
        const { location_id } = req.params;
        if (!location_id) {
            return res.status(404).json({ error: "Location not found for the given location_id" });
        }
        const location = await Location.find({ location_id });
        res.json({
            message: 'Locations fetched successfully',
            Locations: location
        })
    }
    catch(err) {
            res.status(500).json({error : "Internal server error"});
    }
}

// Fetching a particular location_id Using query:-
// exports.getLocationByIdQuery = async (req, res) => {
//     const { location_id } = req.query;
//     if (!location_id) {
//         return res.status(400).json({ Error: "Location_id parameter is required" })
//     }
//     try {
//         const location = await Location.find({ location_id });
//         if (!location || location.length === 0) {
//             return res.status(404).json({ error: "Location not found for the given id" })
//         }
//         res.json({
//             message: "Locations Fetched Successfully",
//             Locations: location
//         })
//     }
//     catch (err) {
//         res.status(500).json({
//             error: "DB not found"
//         })
//     }
// }
