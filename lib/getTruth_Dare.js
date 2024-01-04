/**
 * @module TruthOrDare
 * @description A module for generating random truth or dare prompts
 * @author DiegosonTech
 * @license MIT
 */

/**
 * @typedef {Object} TruthOrDare
 * @property {function(): string} getTruth - Get a random truth prompt
 * @property {function(): string} getDare - Get a random dare prompt
 */

/** @type {TruthOrDare} */
const TruthOrDare = {
  /**
   * Get a random truth prompt
   * @function getTruth
   * @returns {string} Random truth prompt
   */
  getTruth: () => {
    const truths = [
      "Share your biggest fear with the group.",
      "Recall a moment when you lied to your best friend and explain why.",
      "If you could time travel, which moment would you revisit and why?",
      "Describe the most embarrassing thing you've done at work or school.",
      "Have you ever stolen something?",
      "If you had to live on a deserted island with one person, who would it be?",
      "What's the most valuable piece of advice you've received?",
      "What's the weirdest dream you've ever had?",
      "If you could have any superpower, what would it be and why?",
      "What's the most adventurous thing you've ever done?",
      "What's the most unusual talent you have?",
      "If you could switch lives with someone for a day, who would it be?",
      "What's a secret you've never told anyone?",
      "What's your most embarrassing childhood memory?",
      "If you had to eat only one type of food for the rest of your life, what would it be?",
      "What's the craziest dare you've ever done?",
      "If you could meet any historical figure, who would it be and why?",
      "What's your biggest regret?",
      "What's the most outrageous thing you've done to impress someone?",
      "If you could have dinner with any three people, dead or alive, who would they be?",
      "What's the most significant lesson you've learned in life so far?",
      "If you could be any fictional character, who would you choose?",
      "What's your most unusual talent?",
      "If you could be famous for one thing, what would it be?",
      "What's the strangest food you've ever eaten?",
      "If you could master any skill instantly, what would it be?",
      "What's the most challenging thing you've ever accomplished?",
      "If you could have a conversation with your future self, what would you ask?",
      "What's your biggest pet peeve?",
      "What's the most valuable piece of advice you've received?",
            
    ];
    return truths[Math.floor(Math.random() * truths.length)];
  },

  /**
   * Get a random dare prompt
   * @function getDare
   * @returns {string} Random dare prompt
   */
  getDare: () => {
    const dares = [
      "Perform 10 jumping jacks with enthusiasm.",
      "Sing a song out loud, showcasing your vocal talents.",
      "Send a humorous meme to the fifth person in your contact list.",
      "Take a spoonful of a condiment of your choice (within reason) and share the experience.",
      "Post a silly selfie on your social media and embrace the reactions.",
      "Call a friend and tell them a joke, ensuring it's genuinely funny.",
      "Attempt a cartwheel (or your best version) if possible, showcasing your spontaneity.",
      "Write a short and amusing poem about the last person who texted you.",
      "Send a message to your crush (if applicable) saying something random.",
      "Put on a blindfold and try to draw something recognizable in 2 minutes.",
      "Speak in an accent (chosen by others) for the next three rounds.",
      "Do a dance to the next song you hear, regardless of where you are.",
      "Take a funny video of yourself doing a random task and share it.",
      "Wear socks on your hands for the next 10 minutes.",
      "Let someone else post a status on your social media account.",
      "Pretend you're a news anchor and give a dramatic report on a random object.",
      "Create a funny rap about yourself and perform it for everyone.",
      "Speak in rhymes for the next three turns.",
      "Tell a funny, made-up story about the person to your left.",
      "Do your best impression of a famous movie character.",
      "Speak in an accent for the next three rounds.",
      "Act out a scene from your favorite movie.",
      "Send a voice message to someone in your contacts saying something silly.",
      "Wear a hat for the next 10 minutes, chosen by others.",
      "Recite a tongue twister without making a mistake.",
      "Do a cartwheel (or attempt one) if you can.",
      "Write a short poem about the last person who texted you.",
      "Do your best dance move right now.",
      "Tell a joke and try to make everyone laugh.",
      "Act like a certain animal chosen by others until your next turn.",
      "Lest have sex together as Aztec l test good like God.",
      "Im pregnant and its your child.",
      
    ];
    return dares[Math.floor(Math.random() * dares.length)];
  },
};

module.exports = TruthOrDare;

