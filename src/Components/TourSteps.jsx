import React from "react";

export const accentColor = "#ff5722";

export const HOMESTEPS = [
  {
    selector: '[data-tour = "hs5"]',
    content: () => (
      <div>
        This is your navigation icon. Click here to get to the Folders page to
        start building your folders and workouts. You can also click on the
        Stats tab to view your progress as you complete more and more workouts.
      </div>
    ),
    style: {
      margin: "45px",
    },
    // width: '160px'
    // position: [200, 50],
  },
  {
    selector: '[data-tour = "hs1"]',
    content: () => (
      <div>
        This is the beginning of your 'Recents' sections. If they're a little
        thin right now, its because we're just getting started!
      </div>
    ),
    style: {
      margin: "45px",
      // width: '160px'
    },
    // position: "top",
  },
  {
    selector: '[data-tour = "hs2"]',
    content: () => (
      <div>
        This is an example of a 'recent container'. <br></br> As you visit
        different pages, the most recent ones will be available here for you.
        Click on the page and it will take you there.
        <br />
      </div>
    ),
    style: {
      margin: "45px",
      // width: '160px'
    },
    // position: "top",
  },
  {
    selector: '[data-tour = "hs5"]',
    content: () => (
      <div>
        Alright. Lets get Activ. And keep an eye out for more tours as you go
        along!
      </div>
    ),
    style: {
      margin: "45px",
      // width: '160px'
    },
    position: "center",
  },
];

export const STAT_STEPS = [
  {
    selector: '[data-tour = "st1"]',
    content: () => (
      <div>{`This is your Exercise List.
      
      It displays all the exercises you have within the workout. Click on the Exercise Name and its attributes will appear beneath. Click on the attribute to see the average value you performed that day.  `}</div>
    ),
    position: "right",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "st2"]',
    content: () => (
      <div>{`This section shows you stats by Session Date.
      
      Click on the Session Date and the total reps for each exercise will be displayed in the graph.  `}</div>
    ),
    position: "right",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "st3"]',
    content: () => <div>{`Great. Thats it! Enjoy!`}</div>,
    position: "center",
    style: {
      margin: "45px",
    },
  },
];
export const STAT_STEPS2 = [
  {
    selector: '[data-tour = "st1"]',
    content: () => (
      <div>
        Click an exercise title to view its attributes. Click the attribute to
        see the average values you logged.
      </div>
    ),
    position: "right",
    style: {
      margin: "45px",
    },
  },
];

export const NEW_WORKOUT_STEPS1 = [
  {
    selector: '[data-tour = "nws1"]',
    content: () => (
      <div>
        This is your header. It displays your Workout's title and description
        (if available). Click on the title to rename it.
      </div>
    ),
    // position: "top",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "nws2"]',
    content: () => (
      <div>
        All Workouts are divided into 3 phases: 'Warm up', 'Body', and 'Cool
        Down'. <br />
        <br />
        You don't need to add exercises to each section if you don't feel like
        it. But its here for you if you decide to use them.
      </div>
    ),
    // position: "top",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "nws3"]',
    content: () => (
      <div>
        This icon will let open a form to add an exercise to the respective
        phase. <br />
        <br /> Give it a click.
      </div>
    ),
    position: "top",
    style: {
      margin: "45px",
    },
  },
];

export const NEW_WORKOUT_STEPS2 = [
  {
    selector: '[data-tour = "nws4"]',
    content: () => (
      <div>Sweet! You just added your first exercise. Congrats!</div>
    ),
    // position: "top",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "nws5"]',
    content: () => (
      <div>
        You can edit the Set number and exercise at any point throughout the
        app. Simply click on the Exercise Card or the Set Button to change the
        details. And make sure to save your changes!
        <br />
      </div>
    ),
    // position: "top",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "nws6"]',
    content: () => (
      <div>
        Once you've finished adding your exercises to the workouts click the
        "Save Workout" button.
      </div>
    ),
    // position: "center",
    style: {
      margin: "45px",
    },
  },
];

export const START_WORKOUT_STEPS1 = [
  {
    selector: '[data-tour = "sw1"]',
    content: () => (
      <div>
        This is where you can run your workout and track your progress. Lets
        take a look at whats available.
      </div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "sw2"]',
    content: () => (
      <div>
        This is the Sound Switch. It will turn off the bell sound you hear at
        the beginning and end of an exercise. It is set to "On" by default.
      </div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "sw3"]',
    content: () => (
      <div>
        This is the AutoRoll Switch. It will skip a section at the end of an
        exercise so you "roll" into the next exercise without a delay. It is set
        to "Off" by default.
      </div>
    ),
    position: "right",
  },
  {
    selector: '[data-tour = "sw4"]',
    content: () => (
      <div>
        This is your Info Card. It displays all the info you'll want during your
        workout. It seems a bit empty at the moment. Lets move on.
      </div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "sw5"]',
    content: () => <div>Click the button, there's more to see!</div>,
    position: "top",
  },
];

export const START_WORKOUT_STEPS2 = [
  {
    selector: '[data-tour = "sw4"]',
    content: () => (
      <div>Nice. Now that the card is filled. Lets do a quick breakdown.</div>
    ),
    position: "right",
  },
  {
    selector: '[data-tour = "sw6"]',
    content: () => (
      <div>
        This is your header. It has the name of the exercise and what Set Number
        you are out of the Total Number of Sets.
      </div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "sw7"]',
    content: () => (
      <div>
        These are your Timers. The one on the left tracks the entire time since
        the start of the workout. The one on the right tracks the time it takes
        to finish the exercise you're on.
      </div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "sw8"]',
    content: () => (
      <div>
        {`This is the Rest Period section.
          
          Click on the text to add time. You can set the unit to 'sec' or 'min'. 
  
          Press 'Enter' to save. 
          `}
      </div>
    ),
    position: "right",
  },
  {
    selector: '[data-tour = "sw9"]',
    content: () => (
      <div>
        This is your Attributes Section. It displays all the attributes and
        their target values.
      </div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "sw10"]',
    content: () => (
      <div>{`Here you can see what Phase you are in as well as the Type of exercise you're doing.`}</div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "sw16"]',
    content: () => (
      <div>{`Nice. Thats it for the Info Card.
      
      But it be really nice to know what was next in the workout... 
      
      Click this button here!
      `}</div>
    ),
    position: "right",
  },
];
export const START_WORKOUT_STEPS2B = [
  {
    selector: '[data-tour = "sw11"]',
    content: () => (
      <div>{`All the exercises you have within the workout are here. Click on the Exercise Name in the Info Card and the list will jump to your current exercise. 
      
      * You can modify any exercise by clicking the Set Button or Card Number except the current exercise. `}</div>
    ),
    position: "right",
  },
  {
    selector: '[data-tour = "sw12"]',
    content: () => (
      <div>{`Great. Now lets go on to the next section.
      
      Click "FINISHED".`}</div>
    ),
    position: "right",
  },
];

export const ATT_STEPS = [
  {
    selector: '[data-tour = "sw13"]',
    content: () => (
      <div>{`This is your Attributes Card. If you hit your target(s) for the attribute(s) you can simply click "SUBMIT". Or adjust the values and continue.`}</div>
    ),
    position: "right",
  },
];

export const REST_STEPS = [
  {
    selector: '[data-tour = "sw14"]',
    content: () => (
      <div>{`If you set a Rest Period, you will get a notification when it runs out. To add a time click the text.
          
      Note: If "AutoRoll" is set to "On" the next card will go directly to the next exercise in the workout. Otherwise, you will be prompted to start the next exercise.`}</div>
    ),
    position: "right",
  },
  {
    selector: '[data-tour = "sw15"]',
    content: () => (
      <div>{`And thats the end of that folx.     
      
      When you're ready to move on to the next exercise click the button and get active!
      `}</div>
    ),
    position: "right",
  },
];

export const EX1STEPS = [
  {
    selector: '[data-tour = "es1"]',
    content: () => (
      <div>
        This is the Tab bar. You can choose to add a single exercise or chain a
        series of exercises in a circuit.
        <br />
        Click on the tab to change the form then come back to Exercise tab and
        continue by pressing the next arrow.
      </div>
    ),
    // position: "top",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "es2"]',
    content: () => (
      <div>
        Go ahead and enter the name of the exercise. <br /> <br />
        Make sure to hit 'Enter' or click 'Save' afterwards. If you want to
        change it, just click on the text and the form will appear again!
      </div>
    ),
    // position: "top",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "es3"]',
    content: () => (
      <div>
        If you'd like, you can add or edit a description. <br /> <br />
        Click the text, then hit 'Enter' or click 'Save'.
      </div>
    ),
    // position: "top",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "es4"]',
    content: () => (
      <div>
        Here are some pre-defined attributes you can add to this exercise. *
        Reps will always have a minimum of 1 so it will always be checked!
      </div>
    ),
    // position: "top",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "es5"]',
    content: () => (
      <div>
        Click the text to add a custom attribute, <br />
        <br />
        ex. 'jumping height for box jumps' or 'strap length for gymnastic rings'{" "}
      </div>
    ),
    position: "top",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "es6"]',
    content: () => (
      <div>
        Now, if everything looks good go ahead and hit this button to get to the
        next page.
      </div>
    ),
    // position: "top",
    style: {
      margin: "45px",
    },
  },
];

export const EX2STEPS = [
  {
    selector: '[data-tour = "es7"]',
    content: () => (
      <div>
        Here you can set your target values for each of the attributes. They
        will be saved for every session, and you can change them as you level
        up.
        <br></br>
        ex. 'Reps: 12, Weight: 50 lbs, Hold Time: 20 sec, Rest Period: 2 min '
      </div>
    ),
    position: "right",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "es8"]',
    content: () => (
      <div>Sweet. If it looks good, lets go ahead and save it!</div>
    ),
    position: "bottom",
    style: {
      margin: "45px",
    },
  },
];
