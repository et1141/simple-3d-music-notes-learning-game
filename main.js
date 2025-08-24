import './style.css'
import 'aframe'
import 'aframe-extras'
import 'aframe-physics-system'
import "spatial-design-system/primitives/ar-button.js";
import "spatial-design-system/components/position.js";
import "./components/close-dialog";
import "./components/show-dialog";
import "./components/mic-note-detector";
import "./components/game-settings-panel";
import "./components/piano-keyboard";
import "./components/start-game";
import "./components/end-game";



document.querySelector('#app').innerHTML = `
<a-scene background="color: #87CEEB">
  <a-entity mic-note-detector></a-entity>

    <a-entity id="mouseRaycaster" raycaster="objects: .clickable" cursor="rayOrigin: mouse; fuse: false;"></a-entity> 

<a-box 
  position="4.8 -0.3 20"
  width="7" 
  height="2" 
  depth="10" 
  color="#6D8F44">
</a-box>

<a-box 
  position="20.8 -0.3 20"
  rotation="0 20 0"
  width="20" 
  height="2" 
  depth="500" 
  color="#4f738c">
</a-box>

    <a-entity position = "-32 -14 4" rotation = "0 30 0" gltf-model = "/waterfall.glb" scale = "0.31 0.31 0.31 "></a-entity>

        <a-entity position="8.89062 1.541 20.17101" rotation="0 -75 0" gltf-model="/apartment.glb" scale ="0.5 0.5 0.5">
  <a-camera
    position="2.5 2.2 0"
    rotation="-15 90 0"
    look-controls="enabled: false"
    wasd-controls-enabled="false">
  </a-camera>
            <a-ar-button
                id="start-game-button"
                start-game
                scale = "1.5 1.5 1.5"
                position="-1.6 2.6 2.05"
                rotation ="0 115 0"
                content="start game"
                primary="#018A6C"
                textcolor="white"
                size="big"
            ></a-ar-button>

            <a-ar-button
            id="settings-button"
            scale="1.5 1.5 1.5"
            position="-1.6 2.6 -2"
            rotation="0 75 0"
            content=" settings  "
            primary="#444"
            textcolor="white"
            size="big">
            </a-ar-button>


            
            <a-plane 
                id = "information-dialog"
                color = "black" 
                position="-3 1.7 -0.05"
                rotation="-2 90 0"   
                width="3.1" height="2.9"
                scale = "0 0 0">
                
                    <a-text  value="" color="white"  
                        width="4" 
                        align="center" 
                        position="0 0.8 0">
                    </a-text>
                
                    <a-text value="" color="white" 
                        id="information-dialog-score"
                        width="3" 
                        align="center" 
                        position="0 -0.2 0">
                    </a-text>
                        
                    <a-text value="" color="white" 
                        width="3" 
                        align="center" 
                        position="0 -0.5 0">
                    </a-text>

                    <a-ar-button content="End Game"
                        id="end-game-button"
                        end-game
                        position="0 -1 0.01">
                    </a-ar-button>

                    <a-image id="information-dialog-noteimg"
                            src=""
                            width="1.2" height="1.2"
                            position="0 0.65 0.01"
                            visible="false">
                    </a-image>

            </a-plane>

            <a-plane 
                id="settings-dialog"
                color="black"
                position="-3 1.6 -0.05"
                rotation="0 90 0"
                width="3.1" height="2.9"
                scale="0 0 0"
                game-settings-panel>

                <a-text value="Initial time (s)" color="white" width="3.5" align="center" position="0 1.05 0.01"></a-text>
                <a-text id="val-initial-time" value="15" color="white" width="3.5" align="center" position="0 0.68 0.01"></a-text>

                <a-ar-button id="btn-init-minus" content="-" position="-0.5 0.68 0.02" scale="0.8 0.8 0.8" primary="#444" textcolor="white" size="small"></a-ar-button>
                <a-ar-button id="btn-init-plus"  content="+" position="0.5  0.68 0.02" scale="0.8 0.8 0.8" primary="#444" textcolor="white" size="small"></a-ar-button>

                <a-text value="Time bonus (s)" color="white" width="3.5" align="center" position="0 0.15 0.01"></a-text>
                <a-text id="val-time-bonus" value="5" color="white" width="3.5" align="center" position="0 -0.22 0.01"></a-text>

                <a-ar-button id="btn-bonus-minus" content="-" position="-0.5 -0.22  0.02" scale="0.8 0.8 0.8" primary="#444" textcolor="white" size="small"></a-ar-button>
                <a-ar-button id="btn-bonus-plus"  content="+" position="0.5  -0.22  0.02" scale="0.8 0.8 0.8" primary="#444" textcolor="white" size="small"></a-ar-button>

                <a-ar-button id="btn-settings-save"   content="Save"   position="-0.5 -0.95 0.02" scale="0.9 0.9 0.9" primary="#018A6C" textcolor="white" big="small"></a-ar-button>
                <a-ar-button id="btn-settings-cancel" content="Cancel" position="0.5  -0.95 0.02" scale="0.9 0.9 0.9" primary="#444"    textcolor="white" big="small"></a-ar-button>
            </a-plane>



            <a-entity id="piano"
                    gltf-model="/164-piano.glb"
                    animation-mixer="clip: none"
                    piano-keyboard
                    position="-1 0.3 -0.1"
                    rotation="0 0 0">
            </a-entity>

        </a-entity>
    </a-entity>

</a-scene>

`
