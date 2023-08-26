import { useState, useEffect } from "react";

function Prompt() {
  const defaultPlayerStatus = {
    hunger: true,
    thirst: true,
    hurt: true,
  };

  const defaultBackpack = [];

  const locations = {
    forest: {
      id: "forest",
      name: "The Dark Forest",
      baseMessage: "You are in the Dark Forest.",
      objects: [
        { id: "crashedAirplane", name: "Crashed Airplane", obtainable: false },
        {
          id: "waterBottle",
          name: "Water Bottle",
          obtainable: true,
          obtained: false,
        },
        {
          id: "fishingPole",
          name: "Fishing Pole",
          obtainable: true,
          obtained: false,
        },
      ],
    },
  };

  const startMessage =
    "Hello, welcome to game.\n\nAfter an airplane crash, you've been lost for days and can't find a way out.\n";

  const [message, setMessage] = useState(
    `${startMessage} \n ${locations.forest.baseMessage}`
  );
  const [userInput, setUserInput] = useState("");
  const [location, setLocation] = useState(locations.forest);

  const [playerStatus, setPlayerStatus] = useState(defaultPlayerStatus);
  const [backpack, setBackpack] = useState(defaultBackpack);

  const showThings = (objects) => {
    return objects.map((object) => `\n${object.name}`);
  };

  const thingIsGettable = (thing) => {
    for (const object of location.objects) {
      if (object.name.toLowerCase() === thing && object.obtainable) {
        return true;
      }
    }
    return false;
  };

  const processUserInput = (event) => {
    if (event.key === "Enter") {
      switch (userInput) {
        case "help":
          setMessage(
            `You can type the following things:\n"look"\n"backpack"\n"get <thing>"`
          );
          break;
        case "look":
          if (location.objects.length > 0) {
            setMessage(
              `\n${location.baseMessage}\n
              You see the following things nearby:\n${showThings(
                location.objects
              )}`
            );
          }
          break;
        case "backpack":
          setMessage(
            backpack.length > 0
              ? `You have the following things in your backpack:\n${showThings(
                  backpack
                )}`
              : "There is nothing in your backpack."
          );
          break;
        default:
          // get something
          const userCommand = userInput.split(" ");

          switch (userCommand[0]) {
            case "get":
              const thingToGet = userInput
                .substring(3, userInput.length)
                .trim();
              if (thingIsGettable(thingToGet)) {
                for (const locationObject of location.objects) {
                  if (
                    locationObject.name.toLowerCase() ===
                    thingToGet.toLowerCase().trim()
                  ) {
                    // set location object as obtained

                    // put copy of object in inventory
                    let backpackContents = backpack;
                    backpackContents.push(locationObject);
                    setBackpack(backpackContents);
                  }
                }
                setMessage(`You have picked up the ${thingToGet}`);
              } else {
                setMessage(`That's not possible.`);
              }
              break;
            case "drop":
              const thingToDrop = userInput
                .substring(4, userInput.length)
                .trim();

              for (const backpackItem of backpack) {
                if (
                  backpackItem.name.toLowerCase() ===
                  thingToDrop.toLowerCase().trim()
                ) {
                  let newBackpack = backpack.filter(
                    (item) =>
                      item.name.toLowerCase() !==
                      thingToDrop.toLowerCase().trim()
                  );
                  setBackpack(newBackpack);

                  // put the object in the location objects
                }
              }
              setMessage(`You have dropped the ${thingToDrop}`);
              break;
            case "use":
              setMessage(`Using thing`);
              break;
            default:
              setMessage(`I don't understand what you mean, please try again.`);
              break;
          }
      }

      setUserInput("");
    }
  };

  const watchUserInput = (event) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {});

  return (
    <>
      <p style={({ "margin-top": 50 }, { whiteSpace: "pre-line" })}>
        {message || null}
      </p>
      <p>{playerStatus.hunger ? "You are hungry." : null}</p>
      <p>{playerStatus.thirst ? "You are thirsty." : null}</p>
      <p>{playerStatus.hurt ? "You are hurt." : null}</p>
      <input
        type="text"
        value={userInput}
        onChange={watchUserInput}
        onKeyDown={processUserInput}
      />
    </>
  );
}

export default Prompt;
