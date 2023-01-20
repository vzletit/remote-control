
# Websocket Remote control (via nut.js)
(RS School NodeJS course project)

Node js application allows to move the mouse around the screen using the keyboard arrows, draw simple shapes (circle, rectangle, square) and take a screenshot of the part of the screen around the cursor. The interaction between the server and the client takes place via WebSockets.

**Limitations of underlying nut.js library**: 
- if there are several monitors, screenshot can be taken only on the main one.
- Correct operation under Linux is not guaranteed



## Installation

After project is cloned and switched to "dev" branch, install dependencies:

```bash
  npm install
```
    
## Usage
**Development**

`npm run start:dev`

* App served @ `http://localhost:8181` with nodemon

**Production**

`npm run start`

* App served @ `http://localhost:8181` without nodemon

**Frontend**

Open http://localhost:8181 (default) and follow the on screen hints.