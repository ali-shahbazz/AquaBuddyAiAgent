import React from 'react';
import { Agent, Prompt, Perception, Task, TTS, useAgent } from 'react-agents';
import * as chrono from 'chrono-node';

const AquaBuddyAgent = () => {
  const agent = useAgent();

  // Default daily goal in milliliters
  const DEFAULT_DAILY_GOAL = 2000;

  // Water facts
  const waterFacts = [
    "💧 Did you know that water makes up about 60% of your body weight?",
    "🚰 Drinking water can help improve your mood and cognitive performance!",
    "🌊 Staying hydrated is essential for maintaining healthy skin.",
    "🥤 Water aids in digestion and prevents constipation.",
    "💦 Proper hydration can improve physical performance.",
    "🧠 Your brain is strongly influenced by hydration levels.",
    "🏃 Drinking water can help with weight loss by boosting metabolism.",
    "☕ Sometimes thirst can be mistaken for hunger—drink water first!",
    "🌱 Drinking enough water can reduce the risk of kidney stones.",
    "🌞 Staying hydrated helps regulate body temperature."
  ];

  // Function to get a random water fact
  const getRandomWaterFact = () => {
    const index = Math.floor(Math.random() * waterFacts.length);
    return waterFacts[index];
  };

  // Functions for daily intake
  const getDailyIntake = async () => {
    const intake = await agent.memory.get('dailyIntake');
    return intake ? parseFloat(intake) : 0;
  };

  const updateDailyIntake = async (amount) => {
    const currentIntake = await getDailyIntake();
    const newIntake = currentIntake + amount;
    await agent.memory.set('dailyIntake', newIntake.toString());
    return newIntake;
  };

  const resetDailyIntake = async () => {
    await agent.memory.set('dailyIntake', '0');
  };

  // Functions for daily goal
  const getDailyGoal = async () => {
    const goal = await agent.memory.get('dailyGoal');
    return goal ? parseFloat(goal) : DEFAULT_DAILY_GOAL;
  };

  const setDailyGoal = async (goal) => {
    await agent.memory.set('dailyGoal', goal.toString());
  };

  // Functions for drinking history
  const getDrinkingHistory = async () => {
    const history = await agent.memory.get('drinkingHistory');
    return history ? JSON.parse(history) : [];
  };

  const addDrinkingEvent = async (amount, remaining) => {
    const history = await getDrinkingHistory();
    const event = {
      timestamp: new Date().toISOString(),
      amount: amount,
      remaining: remaining,
    };
    history.push(event);
    await agent.memory.set('drinkingHistory', JSON.stringify(history));
  };

  const resetDrinkingHistory = async () => {
    await agent.memory.set('drinkingHistory', JSON.stringify([]));
  };

  return (
    <Agent>
      <TTS voiceEndpoint="elevenlabs:uni:PSAakCTPE63lB4tP9iNQ" />
      <Prompt>
        You are Aqua Buddy, a friendly AI hydration coach. Your role is to:

        1. Track water intake when users mention drinking water.
        2. Send reminders to drink water every hour.
        3. Share interesting water facts to keep users engaged.
        4. Use a friendly, encouraging tone.
        5. Keep a running total of daily water intake.
        6. Reset the total at midnight.
        7. Allow the user to set a daily water intake goal.
        8. Inform the user of how much more they need to drink to reach their daily goal.
        9. Store the details like date and amount whenever the user drinks water.
        10. When the user asks "When was the last time I drank?", provide details of the previous times they drank, including date, amount, and remaining amount.
        11. If the user mentions they haven't drunk water in a long time, remind them it's important to stay hydrated and encourage them to drink water.

        Always be friendly and encouraging in your responses.
      </Prompt>

      {/* Perception to handle user messages */}
      <Perception
        type="message"
        handler={async (e) => {
          const message = e.data.message.content.toLowerCase();

          // Check for setting daily goal
          if (message.includes('set daily goal')) {
            const goalRegex = /set daily goal to (\d+(\.\d+)?)\s*(ml|liters|litres|ounces|oz)/i;
            const goalMatch = message.match(goalRegex);
            if (goalMatch) {
              let goalAmount = parseFloat(goalMatch[1]);
              const unit = goalMatch[3].toLowerCase();
              if (unit === 'ml') {
                // already in ml
              } else if (unit === 'liters' || unit === 'litres') {
                goalAmount *= 1000;
              } else if (unit === 'ounces' || unit === 'oz') {
                goalAmount *= 29.5735; // Convert ounces to ml
              }
              await setDailyGoal(goalAmount);
              e.data.agent.say(`Your daily water intake goal is set to ${goalAmount.toFixed(0)} ml. Let's stay hydrated together! 💧`);
            } else {
              e.data.agent.say("Please specify the amount when setting your daily goal, like 'Set daily goal to 2500 ml'.");
            }
            await e.commit();
            return;
          }

          // Check for user asking about last time they drank
          if (message.includes('when was the last time i drank')) {
            const history = await getDrinkingHistory();
            if (history.length === 0) {
              e.data.agent.say("It looks like you haven't logged any water intake yet today. Let's get started by drinking some water! 💧");
            } else {
              const lastEvent = history[history.length - 1];
              const lastTime = new Date(lastEvent.timestamp);
              const formattedTime = lastTime.toLocaleTimeString();
              e.data.agent.say(`The last time you drank water was at ${formattedTime}, and you drank ${lastEvent.amount.toFixed(0)} ml. You have ${lastEvent.remaining.toFixed(0)} ml remaining to reach your daily goal.`);
            }
            await e.commit();
            return;
          }

          // Check for user requesting full drinking history
          if (message.includes('show my drinking history') || message.includes('give me the details of all previous times i drank')) {
            const history = await getDrinkingHistory();
            if (history.length === 0) {
              e.data.agent.say("You haven't logged any water intake yet today. Start by drinking some water! 💧");
            } else {
              let response = "Here are the times you drank water today:\n";
              history.forEach((event, index) => {
                const time = new Date(event.timestamp).toLocaleTimeString();
                response += `${index + 1}. At ${time}, you drank ${event.amount.toFixed(0)} ml, with ${event.remaining.toFixed(0)} ml remaining to reach your goal.\n`;
              });
              e.data.agent.say(response);
            }
            await e.commit();
            return;
          }

          // Check if user mentions they haven't drunk water in a long time
          if (message.includes("haven't drank") || message.includes("haven't had water") || message.includes("it's been a while since i drank water")) {
            e.data.agent.say("Oh no! Staying hydrated is super important for your health. Please drink some water soon! 💧");
            e.data.agent.say(getRandomWaterFact());
            await e.commit();
            return;
          }

          // Check for water intake mentions
          const intakeRegex = /(\d+(\.\d+)?)\s*(ml|liters|litres|ounces|oz)/i;
          const intakeMatch = message.match(intakeRegex);
          let intake = 0;
          if (intakeMatch) {
            const amount = parseFloat(intakeMatch[1]);
            const unit = intakeMatch[3].toLowerCase();
            if (unit === 'ml') {
              intake = amount;
            } else if (unit === 'liters' || unit === 'litres') {
              intake = amount * 1000;
            } else if (unit === 'ounces' || unit === 'oz') {
              intake = amount * 29.5735; // Convert ounces to ml
            }

            // Update daily intake
            const newIntake = await updateDailyIntake(intake);
            const dailyGoal = await getDailyGoal();
            const remaining = dailyGoal - newIntake;

            // Add drinking event to history
            await addDrinkingEvent(intake, remaining);

            // Send a friendly, encouraging message
            e.data.agent.say(`Great job! You've just added ${intake.toFixed(0)} ml to your daily water intake. Your total today is ${newIntake.toFixed(0)} ml.`);

            if (remaining > 0) {
              e.data.agent.say(`You're ${remaining.toFixed(0)} ml away from your daily goal of ${dailyGoal.toFixed(0)} ml. Keep it up! 💪`);
            } else {
              e.data.agent.say(`Congratulations! You've reached your daily goal of ${dailyGoal.toFixed(0)} ml. Stay awesome! 🎉`);
            }

            // Share a water fact
            e.data.agent.say(getRandomWaterFact());
            await e.commit();
            return;
          }

          await e.commit();
        }}
      />

      {/* Task to send reminders every hour */}
      <Task
        schedule="0 * * * *" // Every hour at minute 0
        handler={async (e) => {
          e.data.agent.say("⏰ Just a friendly reminder to drink some water! Stay hydrated! 💧");
          // Share a water fact
          e.data.agent.say(getRandomWaterFact());
          await e.commit();
        }}
      />

      {/* Task to reset the total and history at midnight */}
      <Task
        schedule="0 0 * * *"
        handler={async (e) => {
          await resetDailyIntake();
          await resetDrinkingHistory();
          e.data.agent.say("🌙 Midnight reset! A new day to stay hydrated together. Let's make it great! 💙");
          await e.commit();
        }}
      />

    </Agent>
  );
};

export default AquaBuddyAgent;
