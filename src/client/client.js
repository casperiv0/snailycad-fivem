/// <reference path="../../node_modules/@citizenfx/client/natives_universal.d.ts" />

onNet("sn:towCall", ({ name, description }) => {
  const lastStreet = GetStreetNameAtCoord(x, y, z);
  const lastStreetName = GetStreetNameFromHashKey(lastStreet);

  setImmediate(() => {
    emitNet("sn:towCallUpdate", { street: lastStreetName, name, description });
  });

  createNotification(
    "CHAR_PROPERTY_TOWING_IMPOUND",
    0,
    "Your Call has been reported to any available towers!",
    "Tow Truck Service"
  );
});

onNet("sn:taxiCall", ({ name, description }) => {
  const lastStreet = GetStreetNameAtCoord(x, y, z);
  const lastStreetName = GetStreetNameFromHashKey(lastStreet);
  console.log("lastStreetName", lastStreetName);

  setImmediate(() => {
    emitNet("sn:taxiCallUpdate", { street: lastStreetName, name, description });
  });

  createNotification(
    "CHAR_TAXI",
    0,
    "Your Call has been reported to any available taxi drivers!",
    "Taxi Service"
  );
});

onNet("sn:911Call", ({ name, description }) => {
  const [x, y, z] = GetEntityCoords(GetPlayerPed(-1));

  const lastStreet = GetStreetNameAtCoord(x, y, z);
  const lastStreetName = GetStreetNameFromHashKey(lastStreet);

  setImmediate(() => {
    emitNet("sn:911CallUpdate", { street: lastStreetName, name, description, x, y, z });
  });

  createNotification(
    "CHAR_CALL911",
    0,
    "Your call has been reported to the emergency services",
    "Emergency Services"
  );
});

function createNotification(picture, icon, message, title) {
  SetNotificationTextEntry("STRING");
  AddTextComponentString(message);
  SetNotificationMessage(picture, picture, true, icon, title);
}
