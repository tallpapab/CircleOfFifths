Depicts a musical circle of fifths.
One can set a musical key and the circle will highlight the chords in that key.

To use it include a canvas element in your HTML

```html
<canvas id="OurCircle" height="253" width="253">
</canvas>
```

You will then need to create,
when the page is ready,
a circle referring to your canvas.

```javascript
    ELB.namespace("Music");
    var ourCirc = new ELB.Music.aCircleOfFifths({
        widget: "OurCircle",
        majorBackground: "CircleOfFifthsMajor.png",
        minorBackground: "CircleOfFifthsMinor.png",
        foreground: "CircleOfFifthsChords.png"
    });
```

Eric Blossom January 2014
http://BlossomAssociates.net/Music/CircleOfFifths.html
