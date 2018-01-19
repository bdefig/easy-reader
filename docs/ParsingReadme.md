# Parsing README

- Get text file and put it in `../src/assets/texts`
- Remove header and footer information
- Do a regex find and replace and replace the string `\n(?!\n)` with empty space (this gets rid of the newlines in the middle of paragraphs)
- Open `../src/server/utils/TextParser.js` and change the path, title, and author near the top of the file
- Run `node TextParser.js`