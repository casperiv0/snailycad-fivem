import { IconTypes } from "./types/IconTypes";
import { TextureTypes } from "./types/TextureTypes";
import { getPostal } from "./util/getPostal";

const usePostal = GetConvar("snailycad_use_postal", "false") === "true";

console.log("usePostal", usePostal);

onNet("sn:towCall", ({ name, description }) => {
  const [x, y, z] = GetEntityCoords(GetPlayerPed(-1), true);
  const [lastStreet] = GetStreetNameAtCoord(x!, y!, z!);
  let lastStreetName = GetStreetNameFromHashKey(lastStreet);

  if (usePostal) {
    lastStreetName = `${getPostal()} ${lastStreetName}`;
  }

  setImmediate(() => {
    emitNet("sn:towCallUpdate", { street: lastStreetName, name, description });
  });

  createNotification(
    TextureTypes.CHAR_PROPERTY_TOWING_IMPOUND,
    IconTypes.ChatBox,
    "Your Call has been reported to any available towers!",
    "Tow Truck Service",
  );
});

onNet("sn:taxiCall", ({ name, description }) => {
  const [x, y, z] = GetEntityCoords(GetPlayerPed(-1), true);
  const [lastStreet] = GetStreetNameAtCoord(x!, y!, z!);
  let lastStreetName = GetStreetNameFromHashKey(lastStreet);

  if (usePostal) {
    lastStreetName = `${getPostal()} ${lastStreetName}`;
  }

  setImmediate(() => {
    emitNet("sn:taxiCallUpdate", { street: lastStreetName, name, description });
  });

  createNotification(
    TextureTypes.CHAR_TAXI,
    IconTypes.ChatBox,
    "Your Call has been reported to any available taxi drivers!",
    "Taxi Service",
  );
});

onNet("sn:911Call", ({ name, description }) => {
  const [x, y, z] = GetEntityCoords(GetPlayerPed(-1), true);
  const [lastStreet] = GetStreetNameAtCoord(x!, y!, z!);
  let lastStreetName = GetStreetNameFromHashKey(lastStreet);

  if (usePostal) {
    lastStreetName = `${getPostal()} ${lastStreetName}`;
  }

  setImmediate(() => {
    emitNet("sn:911CallUpdate", { street: lastStreetName, name, description, x, y, z });
  });

  createNotification(
    TextureTypes.CHAR_CALL911,
    IconTypes.ChatBox,
    "Your call has been reported to the emergency services",
    "Emergency Services",
  );
});

function createNotification(
  picture: TextureTypes,
  icon: IconTypes,
  message: string,
  title: string,
) {
  SetNotificationTextEntry("STRING");
  AddTextComponentString(message);
  SetNotificationMessage(picture, picture, true, icon, title, "Call Event");
}
