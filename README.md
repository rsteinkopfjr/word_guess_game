# word_guess_game

# Pseudo Code

1. Generate a "random" word on the screen

2. Display length of word to User

3. Prompt User to guess a letter

4. User chooses a letter

5. We determine if the letter picked is in the solution
    * if User picks a correct letter, the letter gets filled in the solution
    * if not -
        * number of attempts goes down by one
        * incorrect letter appears in "Letters Guessed" area
    * continues until either the solution is completed or all attempts are used

6. If User wins -
    * "homerun" sound plays
    * new solution appears and the game starts over

7. If User loses -
    * "you're out" sound plays
    * new solution appears and the game starts over
