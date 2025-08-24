AFRAME.registerComponent('piano-keyboard', {
    init: function() {
        const piano = this.el;

        const KEY_TO_ANIMATION = {
            'C': 'animation-C',
            'C#': 'animation-C#',
            'D': 'animation-D',
            'D#': 'animation-D#',
            'E': 'animation-F2',
            'F': 'animation-F',
            'F#': 'animation-F#',
            'G': 'animation-G',
            'G#': 'animation-G#',
            'A': 'animation-A',
            'A#': 'animation-A#',
            'B': 'animation-B'
        };

        const NOTE_FILE = {
        'C':'C4.mp3','C#':'Cs4.mp3','D':'D4.mp3','D#':'Ds4.mp3',
        'E':'E4.mp3','F':'F4.mp3','F#':'Fs4.mp3','G':'G4.mp3',
        'G#':'Gs4.mp3','A':'A4.mp3','A#':'As4.mp3','B':'B4.mp3'
        };
        
        piano.addEventListener('model-loaded', () => {
            const mixerComponent = piano.components['animation-mixer'];
            const model = piano.getObject3D('mesh');

            document.addEventListener('keydown', (event) => {
                let key = event.key.toUpperCase();

                if (event.shiftKey && ['C', 'D', 'F', 'G', 'A'].includes(key)) {
                    key += '#';
                }

                const clipName = KEY_TO_ANIMATION[key];
                if (!clipName || !mixerComponent || !model) return;

                const action = mixerComponent.mixer.clipAction(clipName, model);
                if (action) {
                    action.setLoop(THREE.LoopOnce);
                    action.clampWhenFinished = true;
                    action.reset().play();
                    console.log(`Playing: ${clipName}`);

                    window.dispatchEvent(new CustomEvent("note-played", { detail: { note: key } }));
        
                    
                    const file = NOTE_FILE[key];
                    if (file) new Audio(`sounds/${file}`).play().catch(console.warn);

                } else {
                    console.warn(`No animation found for clip: ${clipName}`);
                }
            });
        });
    }
});