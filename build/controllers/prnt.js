import { mouse, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';
const prntCommands = {
    scrn: async () => {
        const mPos = await mouse.getPosition();
        if (mPos.x < 100) {
            mPos.x = 100;
        }
        if (mPos.x > await screen.width() - 100) {
            mPos.x = await screen.width() - 100;
        }
        if (mPos.y < 100) {
            mPos.y = 100;
        }
        if (mPos.y > await screen.height() - 100) {
            mPos.y = await screen.height() - 100;
        }
        const image = await screen.grabRegion(new Region(Number(mPos.x) - 100, Number(mPos.y) - 100, 200, 200));
        const rgbImage = await image.toRGB();
        const img = new Jimp(rgbImage);
        const res = await img.getBufferAsync(Jimp.MIME_PNG);
        return `prnt_scrn ${res.toString('base64')}`;
    }
};
export default prntCommands;
