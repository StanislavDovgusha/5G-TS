import {
  Directive, ElementRef, Input,
  AfterViewInit, OnDestroy
} from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit, OnDestroy {

  @Input() appAutoFocus = false;

  constructor(private _elementRef: ElementRef) { }

  public ngAfterViewInit() {
    this.checkFocus();
  }

  public ngOnDestroy() { }

  private checkFocus() {
    setTimeout(() => {
      if (this.appAutoFocus && this._elementRef.nativeElement) {
        if (this._elementRef.nativeElement.tagName === 'INPUT') {
          this.setFocuse(this._elementRef.nativeElement);
        } else {
          const listInput = this._elementRef.nativeElement.getElementsByTagName('input');
          if (listInput.length > 0) {
            this.setFocuse(listInput[0]);
          } else {
            if (this._elementRef.nativeElement.onfocus) {
              this._elementRef.nativeElement.onfocus();
            }
          }
        }
      }
    }, 0);
  }

  private setFocuse(element) {
    element.focus();
    element.setAttribute('autofocus', true);
  }

}
