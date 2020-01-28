export class GameLoop {
  currentFrame = new Date().getTime();
  lastFrame = new Date().getTime();
  elapsed;
  timer = 500;
  public start(callback, fps = 30) {
    this.timer = 1000 / fps;
    const fn = () => {
      this.currentFrame = new Date().getTime();
      this.elapsed = this.currentFrame - this.lastFrame;
      callback(this.elapsed);
      this.lastFrame = this.currentFrame;
      let diff = this.elapsed - this.timer;
      diff = diff > 0 ? diff : 0;
      setTimeout(fn, this.timer - diff);
    };
    setTimeout(fn, this.timer);
  }
}
