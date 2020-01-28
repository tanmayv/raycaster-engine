import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appGameContainer]'
})
export class GameContainerDirective {

  constructor(public ref: ViewContainerRef) { }

}
