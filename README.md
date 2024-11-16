# Aqua Buddy Agent 💧

Aqua Buddy is your friendly and intelligent hydration coach designed to keep you refreshed and healthy. Powered by advanced AI, Aqua Buddy tracks your water intake, sends timely reminders to hydrate, and shares fun and educational water facts to motivate you throughout the day. Whether you're striving to meet a daily water goal or need a nudge to drink more often, Aqua Buddy has your back!

## Project Description

In today's fast-paced world, staying hydrated is often overlooked. Aqua Buddy aims to solve this by integrating into your daily routine as a supportive and engaging hydration assistant. Using AI, Aqua Buddy tracks your water consumption, helps you set achievable daily goals, and reminds you to drink water at regular intervals. With additional features like drinking history tracking and friendly encouragement, Aqua Buddy transforms hydration into a fun and rewarding habit.

## Selected Idea

Aqua Buddy embodies the idea of creating a personal hydration assistant that combines task management with user engagement to promote healthier hydration habits. Its functionalities are designed to address common challenges, such as forgetting to drink water, underestimating hydration needs, or lacking motivation. Aqua Buddy not only reminds you but also educates and encourages you to prioritize hydration.

## Key Features

### Core Functionalities

- **Track Water Intake**
  - Log the amount of water you drink, and Aqua Buddy keeps a running total for the day.

- **Set and Track Daily Goals**
  - Set a daily water intake goal in milliliters, liters, or ounces, and Aqua Buddy calculates your remaining target throughout the day.

- **Hourly Hydration Reminders**
  - Aqua Buddy sends automatic reminders every hour to encourage consistent hydration.

- **Drinking History**
  - View detailed logs of your water consumption, including timestamps, amounts, and remaining goals.

- **Last Drink Information**
  - Ask Aqua Buddy when you last drank water, and it provides the time and amount.

- **Midnight Reset**
  - At midnight, Aqua Buddy resets your daily water intake and history, preparing you for a fresh start.

- **Educational and Fun Water Facts**
  - Aqua Buddy shares motivational messages and interesting water facts to keep you engaged.

- **Encouragement During Long Breaks**
  - If you mention not drinking water in a long time, Aqua Buddy responds with reminders of the health benefits of staying hydrated.

### APIs and External Tools Integrated

#### APIs and Tools
- **React-Agents Library**
  - Powers the conversational capabilities and agent management, enabling Aqua Buddy's intelligent interactions.

- **ElevenLabs Text-to-Speech (TTS) API**
  - Provides voice-based responses using the TTS integration, making Aqua Buddy more interactive and engaging.

- **Chrono Node**
  - Assists with natural language processing for parsing time-based user inputs, such as determining when the user last drank water.

## Installation

1. **Clone the Repository**
```bash
git clone https://github.com/ali-shahbazz/AquaBuddyAiAgent.git
cd aqua-buddy-agent
```

2. **Install Dependencies**
Ensure you have Node.js installed, then run:
```bash
npm install usdk
```

3. **Run the Agent**
Start Aqua Buddy in your terminal:
```bash
usdk chat <AGENT PATH>
```

## Usage

### Log Water Intake
Log your water consumption by typing messages like:
- "I drank 500 ml of water."
- "Just had 16 ounces."
- "Consumed 2 liters."

### Set a Daily Goal
Customize your goal by saying:
- "Set daily goal to 2.5 liters."
- "Set daily goal to 2500 ml."
- "Set daily goal to 100 ounces."

### Check Progress
Ask Aqua Buddy to track your hydration progress:
- "How much water do I need to drink?"
- "When was the last time I drank?"
- "Show my drinking history."

### Stay Motivated
Aqua Buddy sends hourly reminders and shares fun water facts to keep you engaged. You can also let it know if you haven't had water in a while, and it will respond with encouraging advice.

## File Structure

```plaintext
.
├── agent.tsx         # The main Aqua Buddy Agent code
├── package.json      # Project dependencies and scripts
├── README.md         # Documentation
└── node_modules/     # Installed dependencies
├── agent.tsx         # The main Aqua Buddy Agent code
├── package-lock.json      
└── packages/ 
└── jest-config.mjs 
└── jest-setup.mjs     
```

## Example Conversations

### Setting a Daily Goal
```
User: Set daily goal to 2.5 liters.
Aqua Buddy: Your daily water intake goal is set to 2500 ml. Let's stay hydrated together! 💧
```

### Logging Water Intake
```
User: I drank 500 ml of water.
Aqua Buddy: Great job! You've just added 500 ml to your daily water intake. Your total today is 500 ml.
Aqua Buddy: You're 1500 ml away from your daily goal of 2000 ml. Keep it up! 💪
Aqua Buddy: 💧 Did you know that water makes up about 60% of your body weight?
```

### Asking About Last Time You Drank
```
User: When was the last time I drank?
Aqua Buddy: The last time you drank water was at 3:45 PM, and you drank 500 ml. You have 1500 ml remaining to reach your daily goal.
```

### Viewing Drinking History
```
User: Show my drinking history.
Aqua Buddy:
Here are the times you drank water today:

At 2:30 PM, you drank 250 ml, with 1750 ml remaining to reach your goal.
At 3:45 PM, you drank 500 ml, with 1500 ml remaining to reach your goal.
```

## Author

Created by Your Ali Shahbaz.
For inquiries or suggestions, feel free to reach out or submit an issue on the repository.

Enjoy staying hydrated with Aqua Buddy! 💧