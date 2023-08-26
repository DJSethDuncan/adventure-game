import { useState, useEffect } from "react";

function Prompt() {
  const defaultPlayerStatus = {
    hunger: true,
    thirst: true,
    hurt: true,
  };

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
  const [inventory, setInventory] = useState([]);

  const showThings = (objects) => {
    return objects.map((object) => `\n${object.name}`);
  };

  const processUserInput = (event) => {
    if (event.key === "Enter") {
      console.log("ENTER");

      switch (userInput) {
        case "help":
          setMessage("look, inventory, get <thing>");
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
        default:
          setMessage(`I don't understand what you mean, please try again.`);
          break;
      }

      setUserInput("");
    }
  };

  const watchUserInput = (event) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    console.log(userInput);
  });

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
