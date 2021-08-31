import { fetch } from "./util/fetch";

RegisterCommand(
  "calltow",
  (source, args) => {
    CancelEvent();

    const name = GetPlayerName(source);
    const description = args;

    setImmediate(() => {
      emitNet("sn:towCall", -1, { source, name, description });
    });
  },
  false,
);

onNet("sn:towCallUpdate", ({ street, name, description }) => {
  fetch("/api/calls/tow", {
    caller: name,
    location: street,
    description: description.join(" "),
  }).catch(console.error);

  CancelEvent();
});

RegisterCommand(
  "calltaxi",
  (source, args) => {
    CancelEvent();

    const name = GetPlayerName(source);
    const description = args;

    setImmediate(() => {
      emitNet("sn:taxiCall", -1, { source, name, description });
    });
  },
  false,
);

onNet("sn:taxiCallUpdate", ({ street, name, description }) => {
  console.log(street);

  fetch("/api/calls/taxi", {
    caller: name,
    location: street,
    description: description.join(" "),
  }).catch(console.error);

  CancelEvent();
});

RegisterCommand(
  "call911",
  (source, args) => {
    CancelEvent();

    const name = GetPlayerName(source);
    const description = args;

    setImmediate(() => {
      emitNet("sn:911Call", -1, { source, name, description });
    });
  },
  false,
);

onNet("sn:911CallUpdate", ({ street, name, description }) => {
  fetch("/api/calls/911", {
    caller: name,
    location: street,
    description: description.join(" "),
  }).catch(console.error);

  CancelEvent();
});
