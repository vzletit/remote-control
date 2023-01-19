import { mouse, left, right, up, down, straightTo, Point, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';
const commandPrefix = '-> ';
mouse.config.mouseSpeed = 400;
const commandsTable = {
    mouse_position: async function ({ raw }) {
        console.log(commandPrefix, raw);
        const mPos = await mouse.getPosition();
        return `mouse_position ${mPos.x},${mPos.y}`;
    },
    mouse_up: async ({ arg1, raw }) => {
        console.log(commandPrefix, raw);
        const offset = Number(arg1);
        const pos = await mouse.getPosition();
        const target = new Point(pos.x, pos.y - offset);
        await mouse.setPosition(target);
        return `mouse_up(${arg1}px)`;
    },
    mouse_down: async ({ arg1, raw }) => {
        console.log(commandPrefix, raw);
        const offset = Number(arg1);
        const pos = await mouse.getPosition();
        const target = new Point(pos.x, pos.y + offset);
        await mouse.setPosition(target);
        return `mouse_down(${arg1}px)`;
    },
    mouse_left: async ({ arg1, raw }) => {
        console.log(commandPrefix, raw);
        const offset = Number(arg1);
        const pos = await mouse.getPosition();
        const target = new Point(pos.x - offset, pos.y);
        await mouse.setPosition(target);
        return `mouse_left(${arg1}px)`;
    },
    mouse_right: async ({ arg1, raw }) => {
        console.log(commandPrefix, raw);
        const offset = Number(arg1);
        const pos = await mouse.getPosition();
        const target = new Point(pos.x + offset, pos.y);
        await mouse.setPosition(target);
        return `mouse_right(${arg1}px)`;
    },
    draw_circle: async ({ arg1, raw }) => {
        console.log(commandPrefix, raw);
        const pos = await mouse.getPosition();
        const r = Number(arg1);
        const steps = 100;
        for (let i = 0; i < steps; i++) {
            const xVal = (pos.x + r * Math.cos(2 * Math.PI * i / steps));
            const yVal = (pos.y + r * Math.sin(2 * Math.PI * i / steps));
            await mouse.move(straightTo(new Point(xVal, yVal)));
            if (i === 0) {
                await mouse.pressButton(0);
            }
        }
        await mouse.releaseButton(0);
        return `draw_circle(r:${arg1}px)`;
    },
    draw_square: async ({ arg1, raw }) => {
        console.log(commandPrefix, raw);
        const sideLength = Number(arg1);
        await mouse.pressButton(0);
        await mouse.move(right(sideLength));
        await mouse.move(down(sideLength));
        await mouse.move(left(sideLength));
        await mouse.move(up(sideLength));
        await mouse.releaseButton(0);
        return `draw_square(${arg1}px)`;
    },
    draw_rectangle: async ({ arg1, arg2, raw }) => {
        console.log(commandPrefix, raw);
        const sideLengthX = Number(arg1);
        const sideLengthY = Number(arg2);
        await mouse.pressButton(0);
        await mouse.move(right(sideLengthX));
        await mouse.move(down(sideLengthY));
        await mouse.move(left(sideLengthX));
        await mouse.move(up(sideLengthY));
        await mouse.releaseButton(0);
        return `draw_rectangle(${arg1}x${arg2}px)`;
    },
    prnt_scrn: async ({ raw }) => {
        console.log(commandPrefix, raw);
        const image = await screen.grabRegion(new Region(100, 100, 200, 200));
        const img = new Jimp(image);
        const res = await img.getBufferAsync(Jimp.MIME_PNG);
        return `prnt_scrn ${res.toString('base64')}`;
    }
};
export default commandsTable;
