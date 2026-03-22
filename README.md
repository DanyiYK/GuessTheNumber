# Exercise: Develop a game named "Guess the Number"

## Game rules
1. When loading the page, the program has to secretely generate a random integer that's between **1 and 100**.
2. The user should be able to insert a number in a field of text (input) and click a button to send it.
3. The game should provide a quick visual feedback after each attempt.
   * If the inserted number is **greater** than the secret number, show the message *"Number is too high! Retry."*
   * If the inserted number is **lower**, show the message: *"Number is too low!, Retry."*
   * If the number is **correct**, show the victory message: *"Congratulations! You guessed the number!"*

## Technical requirements
* **Vanilla JavaScript:** You should only stick with Vanilla JS.
* **Number generation:** Use `Math` object to generate a secret number when the script is ran.
* **DOM integration**
  * Use selection methods to read the value of the user's input.
  * Use `addEventListener` to intercept button clicks.
  * Update the text content of an HTML element (for instance, a `<p>`) to show feedback messages using `.textContent` or `.innerHTML`.

## Bonus (For the brave souls) (like me :3)
If you complete the base exercise, try implementing these following features:
1. **Attempt counter:** Show the user an attempt count.
2. **Limited attempts:** The user should only have **10 attempts**. If they don't guess the number on the 10th attempt, show a "Game Over" message and disable the input field and the button.
3. **Retry button:** Whenever the game ends, add a retry button to restart a new game without having to reload the page (reset the attempt count, generate a new number and clear the messages).
4. **Input validation:** Check that the user inserted a valid number between 1 and 100. If they insert a text or numbers out of this range show an error message (it should also not count the attempt).

## Disclaimer
The exercise text was originally written in italian, I translated it myself to keep english a consistent language among my repositories, because of this there could be some grammatical/spelling mistakes, if so, forgive me. :)