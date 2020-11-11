import Vessel from "./models/vesselModel.js";

const findOneVessel = () => {
    return new Promise((res, rej) => {
        Vessel.findOne( 'vessels' , function (err, vessel) {
            if (err) rej(err);
            res(vessel);
        });

    });
};

export {
    findOneVessel,
};