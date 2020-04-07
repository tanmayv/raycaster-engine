import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/overlay';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.s.scrolled().subscribe(x => {
      const percentage = (window.scrollY / window.innerHeight);
      (this.backgroundContainer.nativeElement as HTMLElement).style.filter
        = `grayscale(${Math.max(0, 100 - 100 * percentage)}%) blur(${Math.max(0, 2 - 2 * percentage)}px)`;
    });
  }

  @ViewChild('background')
  backgroundContainer: ElementRef;
  constructor(private s: ScrollDispatcher) {

  }

  ngOnInit(): void {
    const percentage = (window.scrollY / window.innerHeight);
    (this.backgroundContainer.nativeElement as HTMLElement).style.filter
      = `grayscale(${Math.max(0, 100 - 100 * percentage)}%) blur(${Math.max(0, 2 - 2 * percentage)}px)`;
  }

  scrollTo(i) {
    window.scrollTo({ top: i * window.innerHeight, behavior: 'smooth' });
  }


}
