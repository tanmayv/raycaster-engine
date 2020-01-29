import { AfterViewInit, Component, ComponentFactoryResolver, Injector } from '@angular/core';
import { GameComponent } from '../game-engine/game/game.component';
import { RendererService } from '../game-engine/renderer.service';
import { MapManagerService } from '../game-engine/map-manager.service';
import { Camera } from '../game-engine/camera';
import { TextureService } from '../game-engine/texture.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {

}
