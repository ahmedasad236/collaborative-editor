import { Liveblocks } from '@liveblocks/node';

export const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_DEV_SECRET_KEY as string
});
