# ultimate_tic_tac_toe
recreating the intensely strategic game of x's and o's from grade school

You can find the game here: https://u3t.netlify.app/

## Rules

For the first move, it's x's turn, and x can go anywhere. x makes a move in a local game board. The square in which x plays corresponds to the section of the global board in which o must play. Likewise, o's move sends x to a new board; this continues for the rest of the game. If x or o gets three in a row in a small board, they win that square of the larger board. Three in a row in the larger board wins the game. If a smaller or larger board fills up with no one winning, that board is a draw and goes to no one. If a player is sent to a board that has been drawn or won, then the player can play wherever they choose.

Simply put, get three in a row in a small board to win the square. Get three in a row in the big board to win the game.


```
  |  |   |   |  |   |  |  |   
--+--+-- | --+--+-- |--+--+-- 
  |  |   |   |  |   |  |  |   
--+--+-- | --+--+-- |--+--+-- 
  |  |   |   |  |   |  |  |   
---------+----------+---------
  |  |   |   |  |   |  |  |   
--+--+-- | --+--+-- |--+--+-- 
  |  |   |   |  |   |  |  |   
--+--+-- | --+--+-- |--+--+-- 
  |  |   |   |  |   |  |  |   
---------+----------+---------
  |  |   |   |  |   |  |  |   
--+--+-- | --+--+-- |--+--+-- 
  |  |   |   |  |   |  |  |   
--+--+-- | --+--+-- |--+--+-- 
  |  |   |   |  |   |  |  |   
```
