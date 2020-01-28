import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  width = 100;
  height = 100;

  @ViewChild('canvasElement')
  el;
  constructor() { }

  ngOnInit() {
  }

  getContext(context): CanvasRenderingContext2D {
    return (this.el.nativeElement as HTMLCanvasElement).getContext(context);
  }

}
