## こんにちは！

This is a small javascript powered site that takes in `.json` data of kanji and outputs a selection box. By selecting these kanji you can make your own kanji worksheets tailored to your practicing needs.

### Changelog by Alexei Vasilkov:

- Added Hiragana and Katakana characters
- Modifiable number of gray characters to trace - from 0 to all cells with tracable characters.


## Features
Below are some screenshots of basic usage, along with a screenshot of the WaniKani.com API integration.

### Kanji Selection:
The Kanji are divided into different categories. As of right now I have JLPT N1-N5, and WaniKani integration. It's very simple to add more categories and kanji by just extending the `kanji.json` file. 
![Screenshot](http://i.imgur.com/1Taf26N.png)

### Stroke Orders
Two font files are loaded in so a user has the option to turn on and off stroke orders. 
![Screenshot](http://i.imgur.com/zEO6Q3I.png)

### Search
There is a search option which only takes a unicode kanji character. If that character is found in any of the categories on the app, it will autmatically add the kanji to the top of your worksheet.
![Screenshot](http://i.imgur.com/Td5Ue5j.png)

### Formatted Sheet When Printed:
This is a shot of a formatted worksheet when you attempt to print from the website! You can select as many kanji as you want and it will always look shiny.
![Screenshot](http://i.imgur.com/DIlLX36.png)


### Syncing w/ WaniKani.com
WaniKani.com is an amazing resource for learning the Japanese kanji system. These feature allows a user to pull down the kanji they have unlocked through the site so they are available for printing.
![Screenshot](http://i.imgur.com/1uazMNF.png)
![Screenshot](http://i.imgur.com/dcv77xH.png)

## Contribution
As of right now, I'm not looking to maintain this project, I just wanted
to add Kana so I will be able to practice it myself, same for number of
tracable characters.
