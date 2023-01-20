
# Websocket Remote control (via nut.js)
(RS School NodeJS course project)

This NodeJS application allows to move the mouse around the screen using the keyboard arrows, draw simple shapes (circle, rectangle, square), get current mouse coordinates and take a screenshot of the part of the screen around the cursor. Communication between the server and the client implemented using WebSockets.

**Limitations of underlying nut.js library**: 
- if there are several monitors connected, screenshot will be taken only on the main one.
- Correct operation under Linux is not guaranteed


## Installation

After project is cloned, install dependencies:

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

Open http://localhost:8181 (default) and follow the on-screen hints.