import React, { useEffect } from 'react';
import flowplayer from 'flowplayer';
import engine from 'flowplayer-hlsjs';

engine(flowplayer);

function VideoPlayer() {
   useEffect(() => {
      flowplayer('#flowplayer', {
         clip: {
            sources: [
               {
                  type: 'application/x-mpegurl',
                  src: 'https://hdbo.opstream5.com/20230114/29212_3f0af17e/index.m3u8',
                  autoplay: true,
               },
            ],
         },
      });
   }, []);

   return (
      <div id="flowplayer">
         <video></video>
      </div>
   );
}

export default VideoPlayer;
