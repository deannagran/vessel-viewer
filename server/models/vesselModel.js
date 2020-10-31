const mongoose = require("mongoose");
const vesselSchema = mongoose.Schema({
    name: {type: String, required: true},
    model_link: {type: String, required: true},
    comments : [{
        content : String,
        posterID : String
    }],
    project_files : {type: Schema.Type.ObjectId},
    vesselfinder_link : {type: String, required: true},
    associated_users : [{
        role : String,
        userID : String
    }]

});

module.exports = Vessel = mongoose.model("vessel", vesselSchema);