# Parsing README

- Get text file and put it in `../src/assets/texts`
- Open the file in VS Code and change the end of line sequence from CRLF to LF (there's a button on the bottom ribbon)
- Change encoding to UTF-8 without BOM (on the bottom ribbon, go to UTF-8 with BOM or similar, click, then at the top, click Save with Encoding, and change to UTF-8)
- Remove header and footer information
- Find and replace `-\n` with `-`
- Do a regex find and replace and replace the string `\n(?!\n)` with a space (' ') (this gets rid of the newlines in the middle of paragraphs)
- Find and replace the extra spaces (replace ` ` with ``)
- Find and replace the extra new lines (`\n\n` with `\n`)
- Run node AdminCLI.js and follow the prompts