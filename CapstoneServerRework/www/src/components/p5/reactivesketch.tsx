import Sketch from 'react-p5';
import p5Types from 'p5'; //Import this for typechecking and intellisense

// interface ComponentProps {
//     //Your component props
// }

export const ReactiveP5Sketch: React.FC = () => {
    let x = 0;

    let parent = document.getElementById('sketch-container');
    //See annotations in JS for more information
    const setup = async (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(500, 500).parent(canvasParentRef);
        if (parent) p5.resizeCanvas(parent.clientWidth, parent.clientHeight);
    };

    const draw = (p5: p5Types) => {
        parent = document.getElementById('sketch-container');
        if (parent != null) p5.resizeCanvas(parent.clientWidth, parent.clientHeight);
        p5.background(0);
        p5.ellipse(p5.width / 2, p5.height / 2, (p5.width / 4) * Math.sin(x));
        x += 0.01;
    };

    return <Sketch setup={setup} draw={draw} />;
};
