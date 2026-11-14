/* Cendavex film script (The Awakening). Same-origin only; no network calls, no storage, no third-party code. One animation chain at a time; inactive scenes are hidden from assistive technology; the music starts only on Play, follows the film and stops with it. */
(function () {
  'use strict';
  // One animation chain at a time (a generation number retires an older chain). Inactive scenes are hidden from assistive technology; a pause also pauses the scene animations.
  document.documentElement.classList.add('js');          // the film controls are shown only when this script runs
  var box = document.getElementById('film-stage');
  if (box) {
    var scenes = box.querySelectorAll('.scene'), total = parseFloat(box.getAttribute('data-total')) || 60;
    var playBtn = document.getElementById('film-play'), restart = document.getElementById('film-restart'), range = document.getElementById('film-range'), clock = document.getElementById('film-clock');
    var audio = document.getElementById('film-audio'), mbtn = document.getElementById('film-music'), music = true;
    var t = 0, playing = false, last = 0, id = 0, gen = 0;
    // Music follows the film: it starts only on Play (a user action), is seeked to the film position when it drifts, fades out over the last three seconds, and stops with the film.
    var syncAudio = function () {
      if (!audio) return; var d = audio.duration;
      if (isFinite(d) && Math.abs(audio.currentTime - t) > 0.6) { try { audio.currentTime = Math.min(t, d); } catch (e) { /* not seekable yet */ } }
      audio.volume = Math.max(0, Math.min(1, (total - t) / 3));
    };
    var audioPlay = function () { if (audio && music) { var p = audio.play(); if (p && p.catch) p.catch(function () { /* the browser refused: the film still plays, silently */ }); } };
    var audioStop = function () { if (audio) audio.pause(); };
    var fmt = function (s) { s = Math.floor(s); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); };
    var ui = function () { if (playBtn) playBtn.textContent = playing ? 'Pause' : 'Play'; box.classList.toggle('paused', !playing); };
    var render = function () {
      for (var i = 0; i < scenes.length; i++) {
        var a = parseFloat(scenes[i].getAttribute('data-start')), b = parseFloat(scenes[i].getAttribute('data-end')), on = t >= a && (t < b || (i === scenes.length - 1 && t <= b));          // the last scene stays visible at the very end (the slider can reach it exactly)
        scenes[i].classList.toggle('on', on); scenes[i].setAttribute('aria-hidden', on ? 'false' : 'true');
      }
      syncAudio();
      if (range) range.value = String(Math.round(t * 10)); if (clock) clock.textContent = fmt(t) + ' / ' + fmt(total);
    };
    var stop = function () { playing = false; gen += 1; cancelAnimationFrame(id); audioStop(); ui(); };
    var play = function () {
      if (t >= total - 0.05) t = 0;
      cancelAnimationFrame(id); gen += 1; var mine = gen; playing = true; last = performance.now(); ui(); syncAudio(); audioPlay();
      var step = function (now) {
        if (!playing || mine !== gen) return;          // a newer chain (or a pause) retires this one
        t += Math.min((now - last) / 1000, 0.25); last = now;          // a long gap (a background tab) never jumps the film forward
        if (t >= total) { t = total - 0.01; render(); stop(); return; }
        render(); id = requestAnimationFrame(step);
      };
      id = requestAnimationFrame(step);
    };
    document.addEventListener('visibilitychange', function () { if (document.hidden && playing) stop(); });          // a hidden tab stops the film and its music together
    if (playBtn) playBtn.addEventListener('click', function () { playing ? stop() : play(); });
    if (mbtn) mbtn.addEventListener('click', function () {
      music = !music; mbtn.setAttribute('aria-pressed', music ? 'true' : 'false'); mbtn.textContent = music ? 'Music: on' : 'Music: off';
      if (!music) audioStop(); else if (playing) audioPlay();
    });
    if (restart) restart.addEventListener('click', function () { t = 0; render(); play(); });
    if (range) { range.max = String(Math.round(total * 10)); range.addEventListener('input', function () { t = parseInt(range.value, 10) / 10; render(); }); }
    render(); ui();
  }
})();
