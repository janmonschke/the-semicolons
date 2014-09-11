var oscillators = [],
    number_of_oscillators = 30,
    sound_length = 26;

var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createOscillators = function () {
    for (var i = 0; i < number_of_oscillators; i++) {
        var oscillator = tsw.oscillator(300, 'sawtooth');
        oscillator.frequency(getRandomInt(200, 400));
        oscillators.push(oscillator);
    }
    oscillators.sort();
};

var addWobble = function (osc) {
    var currentFrequency = osc.frequency(),
        total_wobbles = getRandomInt(0, 4),
        stop_wobbling_time = 0;

    osc.frequency(currentFrequency, tsw.now() - 5);

    for (var i = 0; i < total_wobbles; i++) {
        //osc.frequency.linearRampToValueAtTime(currentFrequency + getRandomInt(-100, 100), tsw.now() + sound_length - getRandomInt(1, 8));
    }
};

var makeFilter = function (osc) {
    var lowpass = tsw.filter('lowpass', 1000);

    if (osc.frequency() > 300) {
        lowpass.frequency(300, tsw.now());
        lowpass.frequency(500, tsw.now() + (sound_length / 2), 'linear');
        lowpass.frequency(20000, tsw.now() + 1.5 *(sound_length / 3), 'linear');
    }

    return lowpass;
};

var detune = function (osc) {
    osc.detune(getRandomInt(-20, 20));
};

var playOscillators = function () {
    var volume = tsw.gain(1);

    oscillators.forEach(function (osc, index) {
        var panner = tsw.panner(getRandomInt(-0.5, 5)),
            fundamental = 20.02357939482212,
            lowpass,
            oscVolume = tsw.gain();

        addWobble(osc);
        osc.detune(getRandomInt(-10, 10));

        if (index % 2 === 0) {
            osc.frequency(fundamental * 2, tsw.now() + (2 * (sound_length /3) + 0.01), 'linear');
            oscVolume.gain(1);
        } else if (index % 3 === 0) {
            osc.frequency(fundamental * 4, tsw.now() + (2 * (sound_length /3) + 0.02), 'linear');
            oscVolume.gain(0.9);
        } else if (index % 4 === 0) {
            osc.frequency(fundamental* 8, tsw.now() + (2 * (sound_length /3) + 0.022), 'linear');
            oscVolume.gain.value(0.8);
        } else if (index % 5 === 0) {
            osc.frequency(fundamental * 16, tsw.now() + (2 * (sound_length /3)) - 0.022, 'linear');
            oscVolume.gain(0.7);
        } else if (index % 6 === 0) {
            osc.frequency(fundamental * 32, tsw.now() + (2 * (sound_length /3)) - 0.01, 'linear');
            oscVolume.gain(0.6);
        } else {
            osc.frequency(fundamental * 64, tsw.now() + (2 * (sound_length /3)), 'linear');
            oscVolume.gain(0.3);
        }

        lowpass = makeFilter(osc);

        tsw.connect(osc, panner, lowpass, oscVolume, master_gain);
        master_gain.gain(1 / number_of_oscillators);

        osc.start(0);
        osc.stop(tsw.now() + sound_length);
    });

    // Volume start level = 0
    master_gain.gain(0);

    master_gain.gain(1 / (number_of_oscillators * 4), tsw.now() + (sound_length / 3), 'linear');
    master_gain.gain(1 / (number_of_oscillators * 4), tsw.now() + (sound_length /3));
    master_gain.gain(1 / (number_of_oscillators * 4), tsw.now() + (sound_length /2));

    // Ramp to max value.
    master_gain.gain(1 / number_of_oscillators, tsw.now() + (2 * sound_length / 3), 'linear');

    // Set max value before fade.
    master_gain.gain(1 / number_of_oscillators, tsw.now() + sound_length - 5);

    // Fade out.
    master_gain.gain(0, tsw.now() + sound_length - 4, 'linear');

    tsw.connect(master_gain, volume, tsw.speakers)
};


window.thx = function () {
    master_gain = tsw.gain(0.2),
    createOscillators(30);
    playOscillators(0);
    setTimeout(function() {
      $('#logo').addClass('large');
    }, 15000);
    setTimeout(function() {
      $('#logo-wrapper').hide();
    }, 24000);
    return "Reject.JS is listening."
};

window.start = window.thx;