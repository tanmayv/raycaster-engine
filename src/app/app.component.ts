import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, HostListener, Injector, OnInit, ViewChild } from '@angular/core';
import { GameComponent } from '../game-engine/game/game.component';
import { RendererService } from '../game-engine/renderer.service';
import { MapManagerService } from '../game-engine/map-manager.service';
import { Camera } from '../game-engine/camera';
import { TextureService } from '../game-engine/texture.service';
import { ScrollDispatcher } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.s.scrolled().subscribe(x => {
      (this.backgroundContainer.nativeElement as HTMLElement).style.filter
        = `grayscale(${Math.max(0, 100 - 100 * (window.scrollY / window.innerHeight))}%)`;
    });
  }

  @ViewChild('background')
  backgroundContainer: ElementRef;
  constructor(private s: ScrollDispatcher) {

  }

  ngOnInit(): void {
    (this.backgroundContainer.nativeElement as HTMLElement).style.filter = `grayscale(100%)`;

  }
}
