export const gameLevelsData = [
  {
    level: 1,
    algo: [12, 100],
    title: "Case 1",
    name: "Bad encounter on holidays",
    instructions: {
      txt: [
        "Policy needs our help !",
        "A woman was found dead at her apartment in a nearby state and our colleagues believe she met her killer in our state last year.",
        "We try to find the motel in which she would have stayed, but the task is colossal !",
        "Could you use your gift to identify the month during she would have visited our region ?",
      ],
      toFind: "A month in the last year, from january to december",
    },
    preclues: "Take time to meditate",
    clues: {
      more: "It was later in the year...",
      less: "It was earlier in the year...",
      lastChance: "LAST CHANCE !",
    },
    success: [
      "Great job Seer !",
      "Thanks to your intuition, we found the motel where our victim stayed in in just a few hours !",
      "It's official, you are now part of our team of investigators...",
    ],
    fail: [
      "You failed the mission !",
      "Our team followed your intuition, but none of the motels opened at that period could find the trace of this woman during that month...",
      "We've lost a lot of time, but it's not too late...",
      "Focus yourself and I'm sure the next one will be the right track !",
    ],
    inputs: {
      type: "text",
      placeholder: ["Ex : april, May, march..."],
      unique: true,
      attributes: [{ min: "", max: "", step: "" }],
      unit: "",
    },
  },
  {
    level: 2,
    algo: [30, 100],
    title: "Case 2",
    name: "The cursed floor",
    instructions: {
      txt: [
        "It's time for your second mission !",
        "We now know that the victim met his murderer at Luxor, the hotel in which she stayed last year.",
        "Unfortunately, this is one of the largest hotels in our state ! 30 floors... Can you imagine the number of people who stayed there at the same time as her ?!",
        "It would help us to reduce suspects list if you could guide us to the floor where the killer had his room...",
      ],
      toFind: "A floor, between 1 to 30",
    },
    preclues: "Take time to meditate",
    clues: {
      more: "It was higher...",
      less: "It was lower...",
      lastChance: "LAST CHANCE !",
    },
    success: [
      "You did it !",
      "Thanks to you, we were able to quickly find the identities of all the hotel guests who stayed on that floor while our victim was there.",
      "We showed their photos to the Luxor staff, and our wife chatted with several of them according to their testimonies.",
    ],
    fail: [
      "Hum...",
      "It looks like you're a little tired, no ?",
      "The floor you indicated was under construction during that period.",
      "Come back to your senses! We've already lost a lot of time. Our murderer may have already done it again !",
    ],
    inputs: {
      type: "number",
      placeholder: ["Floor number, from 1 to 30"],
      unique: true,
      attributes: [{ min: "1", max: "30", step: "1" }],
      unit: "",
    },
  },
  {
    level: 3,
    algo: [24, 50],
    title: "Case 3",
    name: "Find the hour",
    instructions: {
      txt: [
        "Help us Seer !",
        "We were able to question the Louxor customers and we now only have a few suspects left, but their custody is about to end while our colleagues have not yet been able to find the autopsy report...",
        "If we can't verify the alibis, we have to release them all !",
        "I know we take you by surprise... But if you can give us the approximate time of the crime, that would prevent us from letting the killer escape !",
      ],
      toFind:
        "A schedule in a day, rounded to half an hour (Time system 24 hours)",
    },
    preclues: "Take time to meditate",
    clues: {
      more: "It was later in the day...",
      less: "It was earlier in the day...",
      lastChance: "LAST CHANCE !",
    },
    success: [
      "Amazing work Seer ! ",
      "We choosed the right guy and he's now in jail ! Medical report confirmed your prediction.",
      "We resolved the case thanks to you ! Please Seer, don't use your gift to bad actions... City needs an heros like you.",
    ],
    fail: [
      "That's impossible, Seer...",
      "At the time you told us, all of our suspects had solid alibi. However, we are sure that the culprit is hiding among them.",
      "Time is running out and only you can preserve our state of a killer on the loose !",
      "Please, try again !!",
    ],
    inputs: {
      type: "number",
      placeholder: ["Hours, max 23", "Minutes, 00 or 30"],
      unique: false,
      attributes: [
        { min: "0", max: "23", step: "1" },
        { min: "0", max: "59", step: "30" },
      ],
      unit: "H",
    },
  },
];
