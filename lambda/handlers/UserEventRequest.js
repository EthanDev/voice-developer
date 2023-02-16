const data = require("../data");
const helper = require("../helper");
const OfficeHoursPlay = require("./OfficeHoursPlay");

async function UserEventRequest(handlerInput) {
    return OfficeHoursPlay(handlerInput);
}

module.exports = UserEventRequest;
