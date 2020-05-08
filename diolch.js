function arlunioEnfys(ongl, canol, r, lled, context) {
    for (var i = 0 ; i < 7 ; i++) {
        const rLliw = r - (i*lled*2);
        const h = i*(360/7);
        context.beginPath();
        context.strokeStyle = `hsl(${h},100%,50%)`;
        context.lineWidth = (lled*2) - 4;
        context.lineCap = 'round';
        context.arc(canol.x, canol.y, rLliw, -Math.PI, ongl);
        context.stroke();
    }
}

function arlunio(context) {
    const canvas = context.canvas;
    const r2 = 10;
    const canol = { x: canvas.width/2, y: canvas.height/2 };
    const cam = (Math.PI*2) / 360;
    const r = Math.min(canvas.width/2,canvas.height/2)-(r2*2);

    const cyflymder = Math.PI / 500; // Enfys (h.y. hanner cylch) mewn hanner eiliad
    const onglOffset = -Math.PI;

    const testun = "DIOLCH";


    function diweddaru (amserCychwyn, amser) {
        let ongl = ((amser - amserCychwyn) * cyflymder) + onglOffset;
        let gorffen = false;
        if (ongl >= Math.PI + onglOffset) {
            ongl = Math.PI + onglOffset;
            gorffen = true;
        }

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        arlunioEnfys(ongl, canol, r, r2, context);

        if (gorffen) {
            // Nid yw'r font-face yn gweithio o'r CSS (mae'n colli o ar ôl i'r dudalen llwytho)
            const fontFace = new FontFace("Comic Neue", "url('fonts/ComicNeue-Bold.ttf')", { weight: 'bold' });
            fontFace.load().then(function () {
                document.fonts.add(fontFace);
                context.beginPath();
                context.fillStyle = "#FFF";

                // Creu testun gyda uchder o 100px, mesur y lle ac wedyn hwnnw efo'r diamedr yr enfys i cyfrifo'r uchder rydym ei angen
                context.font = `bold 100px 'Comic Neue'`;
                const lledTestun100px = context.measureText(testun).width;
                const uchderTestun = Math.round(100*((r*2)/lledTestun100px));

                context.beginPath();
                context.fillStyle = "#FFF";
                context.font = `bold ${uchderTestun}px 'Comic Neue'`;
                const lledTestun = context.measureText(testun).width;
                context.fillText(testun, canol.x-(lledTestun/2), canol.y+2+uchderTestun);
                context.stroke();                    
            });
        }

        if (!gorffen) {
            window.requestAnimationFrame( (amserNewydd) => {
                diweddaru(amserCychwyn, amserNewydd);
            });
        }
    }

    window.requestAnimationFrame( (amserNewydd) => {
        diweddaru(amserNewydd, amserNewydd);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    arlunio(context);

    window.addEventListener("resize", () => {
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;
        arlunio(context);
    });
});