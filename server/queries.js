import Vessel from "/models/vesselModel";

const findOneVessel = () => {
    return new Promise((res, rej) => {
        /*
          Find the document that contains data corresponding to the school name,
          then pass the returned data into the res function.
         */
        Vessel.findOne( 'vessels' , function (err, vessel) {
            if (err) rej(err);
            res(vessel);
        });

    });
};

module.exports = {
    findOneVessel,
};