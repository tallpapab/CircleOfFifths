/*jslint browser: true, devel: true, white: true, regexp: true, sloppy: true */
/*global ELB, jQuery */

/**
 * For creating a circle of fifths.
 * In the background is shading to indicate the chords for a particular key.
 * The background can shift to the appropriate key.
 * Note that there are Major and Minor patterns, so we require two backgrounds.
 */

//; /* to protect from other possibly incomplete libraries that may have been included. */

ELB.namespace("Music");

/**
 * @param theSpecification.widget id of a canvas on the page.
 * @param theSpecification.majorBackground image.
 * @param theSpecification.minorBackground image.
 * @param theSpecification.foreground image of letter keys.
 * SOMEDAY: Handle an image widget (Replace with canvas and get imgage from img.source.).
 * SOMEDAY: Handle size from widget.
 */
ELB.Music.aCircleOfFifths = function (theSpecification) {

    var privato, pubblico, /* Use Italian to avoid using the reserved words private and public. */
        delta = Math.PI/6,
        widget, self;

    /* Private Variables and Functions */
    privato = {
        /** angle to rotate (in radians) for each key. */
        keyAngle: {
            'C':   0,       'a':  0,
            'G':   delta,   'e':  delta,
            'D':   2*delta, 'b':  2*delta,
            'A':   3*delta, 'f#': 3*delta,
            'E':   4*delta, 'c#': 4*delta,
            'B':   5*delta, 'g#': 5*delta,
            'F#':  6*delta, 'd#': 6*delta,
            'Db':  7*delta, 'bb': 7*delta,
            'Ab':  8*delta, 'f':  8*delta,
            'Eb':  9*delta, 'c':  9*delta,
            'Bb': 10*delta, 'g': 10*delta,
            'F':  11*delta, 'd': 11*delta
        },
        isMinor: function (theKey) {
              if (theKey.match(/^[a-g].*/)) {
                  return true;
              }
              if (theKey.match(/m$/)) {
                  return true;
              }
              return false;
        }
    };

    self = this;
    /* Public Variables and Functions */
    pubblico = {

        setKey: function (theKey) {
            self.key = theKey;
            self.draw();
        }

    };

    widget = document.getElementById(theSpecification.widget);
    self.identifier = "=" + theSpecification.widget;
    self.graphicsContext = widget.getContext("2d");
    self.graphicsContext.translate(128, 128); // move drawing context to the center.
    self.majorBackground = new Image();
    self.minorBackground = new Image();
    self.background = self.majorBackground;
    self.foreground = new Image();
    self.key = theSpecification.key || widget.getAttribute('data-key') || undefined;

    self.draw = function() {
        var theContext, theta;

        theContext = self.graphicsContext;

        /* Start with a blank slate. */
        theContext.clearRect(-128, -128, 256, 256);
        /* Save state. */
        theContext.save();

        if (self.key) { // then a key has been set.
            /* Find the correct angle for the key. */
            theta = privato.keyAngle[self.key];
            if (!theta && 0 !== theta) {
                alert("Don't know the key of: '" + self.key + "'");
            }
            /* Rotate the context. */
            theContext.rotate(theta);
            /* Major or Minor key? */
            if (privato.isMinor(self.key)) {
                self.background = self.minorBackground;
            }
            else {
                self.background = self.majorBackground;
            }
            /* Highlight the key. */
            theContext.drawImage(self.background, -128, -128);
        }

        /* Restore the context. */
        theContext.restore();
        /* Draw the circle of fifths. */
        theContext.drawImage(self.foreground, -128, -128);
    };

    self.majorBackground.onload = function () {
        self.foreground.onload = self.draw;
    };
    self.foreground.onload = function () {
        self.background.onload = self.draw;
    };
    self.majorBackground.src = theSpecification.majorBackground;
    self.minorBackground.src = theSpecification.minorBackground;
    self.foreground.src = theSpecification.foreground;
    /* Enharmonics and Unicode Characters */
    privato.keyAngle['A#'] = privato.keyAngle['A♯'] = privato.keyAngle['B♭'] = privato.keyAngle.Bb;
    privato.keyAngle['D#'] = privato.keyAngle['D♯'] = privato.keyAngle['E♭'] = privato.keyAngle.Eb;
    privato.keyAngle['G#'] = privato.keyAngle['G♯'] = privato.keyAngle['A♭'] = privato.keyAngle.Ab;
    privato.keyAngle['C#'] = privato.keyAngle['C♯'] = privato.keyAngle['D♭'] = privato.keyAngle.Db;
    privato.keyAngle.Gb    = privato.keyAngle['G♭'] = privato.keyAngle['F♯'] = privato.keyAngle['F#'];
    privato.keyAngle.Cb    = privato.keyAngle['C♭'] = privato.keyAngle.B;
    privato.keyAngle['B#'] = privato.keyAngle['B♯'] = privato.keyAngle.C;
    privato.keyAngle.Fb    = privato.keyAngle['F♭'] = privato.keyAngle.E;
    privato.keyAngle['E#'] = privato.keyAngle['E♯'] = privato.keyAngle.F;
    /* Same for Minor Keys */
    privato.keyAngle['a#'] = privato.keyAngle['a♯'] = privato.keyAngle['b♭'] = privato.keyAngle.bb;
    privato.keyAngle.eb    = privato.keyAngle['e♭'] = privato.keyAngle['d♯'] = privato.keyAngle['d#'];
    privato.keyAngle.ab    = privato.keyAngle['a♭'] = privato.keyAngle['g♯'] = privato.keyAngle['g#'];
    privato.keyAngle.db    = privato.keyAngle['d♭'] = privato.keyAngle['c♯'] = privato.keyAngle['c#'];
    privato.keyAngle.gb    = privato.keyAngle['g♭'] = privato.keyAngle['f♯'] = privato.keyAngle['f#'];
    privato.keyAngle.cb    = privato.keyAngle['c♭'] = privato.keyAngle.b;
    privato.keyAngle['b#'] = privato.keyAngle['b♯'] = privato.keyAngle.c;
    privato.keyAngle.fb    = privato.keyAngle['f♭'] = privato.keyAngle.e;
    privato.keyAngle['e#'] = privato.keyAngle['e♯'] = privato.keyAngle.f;
    /* Km = k */
    privato.keyAngle.Am     = privato.keyAngle.a;
    privato.keyAngle.Abm    = privato.keyAngle.ab;
    privato.keyAngle['A♭m'] = privato.keyAngle.ab;
    privato.keyAngle['A#m'] = privato.keyAngle['a#'];
    privato.keyAngle['A♯m'] = privato.keyAngle['a#'];
    privato.keyAngle.Bm     = privato.keyAngle.b;
    privato.keyAngle.Bbm    = privato.keyAngle.bb;
    privato.keyAngle['B♭m'] = privato.keyAngle.bb;
    privato.keyAngle['B#m'] = privato.keyAngle['b#'];
    privato.keyAngle['B♯m'] = privato.keyAngle['b#'];
    privato.keyAngle.Cm     = privato.keyAngle.c;
    privato.keyAngle.Cbm    = privato.keyAngle.cb;
    privato.keyAngle['C♭m'] = privato.keyAngle.cb;
    privato.keyAngle['C#m'] = privato.keyAngle['c#'];
    privato.keyAngle['C♯m'] = privato.keyAngle['c#'];
    privato.keyAngle.Dm     = privato.keyAngle.d;
    privato.keyAngle.Dbm    = privato.keyAngle.db;
    privato.keyAngle['D♭m'] = privato.keyAngle.db;
    privato.keyAngle['D#m'] = privato.keyAngle['d#'];
    privato.keyAngle['D♯m'] = privato.keyAngle['d#'];
    privato.keyAngle.Em     = privato.keyAngle.e;
    privato.keyAngle.Ebm    = privato.keyAngle.eb;
    privato.keyAngle['E♭m'] = privato.keyAngle.eb;
    privato.keyAngle['E#m'] = privato.keyAngle['e#'];
    privato.keyAngle['E♯m'] = privato.keyAngle['e#'];
    privato.keyAngle.Fm     = privato.keyAngle.f;
    privato.keyAngle.Fbm    = privato.keyAngle.fb;
    privato.keyAngle['F♭m'] = privato.keyAngle.fb;
    privato.keyAngle['F#m'] = privato.keyAngle['f#'];
    privato.keyAngle['F♯m'] = privato.keyAngle['f#'];
    privato.keyAngle.Gm     = privato.keyAngle.g;
    privato.keyAngle.Gbm    = privato.keyAngle.gb;
    privato.keyAngle['G♭m'] = privato.keyAngle.gb;
    privato.keyAngle['G#m'] = privato.keyAngle['g#'];
    privato.keyAngle['G♯m'] = privato.keyAngle['g#'];

    return pubblico;

};
