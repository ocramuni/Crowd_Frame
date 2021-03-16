import {AfterViewInit, Directive, ElementRef, Input} from "@angular/core";
import {ActionLogger} from "../../services/userActionLogger.service";
import {fromEvent, interval} from "rxjs";
import {throttle} from "rxjs/operators";

@Directive({selector: "button"})
export class ButtonDirective {
  constructor(private actionLogger: ActionLogger, private element: ElementRef) {}

  ngAfterViewInit() {
    fromEvent(this.element.nativeElement, 'click')
      .subscribe(event => this.actionLogger.buttonClick(event))
  }
}

@Directive({selector: "app-skeleton"})
export class WindowDirective implements AfterViewInit{
  constructor(private actionLogger: ActionLogger, private element: ElementRef) {}

  ngAfterViewInit() {
    fromEvent(this.element.nativeElement, 'click')
      .subscribe(event => this.actionLogger.windowClick(event))
    fromEvent(this.element.nativeElement, 'copy')
      .subscribe(event => this.actionLogger.onCopy(event))
    fromEvent(this.element.nativeElement, 'paste')
      .subscribe(event => this.actionLogger.onPaste(event))
    fromEvent(this.element.nativeElement, 'cut')
      .subscribe(event => this.actionLogger.onCut(event))
    // fromEvent(document, 'scroll')
    //   .pipe(throttle(() => interval(100)))
    //   .subscribe(event => this.actionLogger.onScroll(event))
  }
}
