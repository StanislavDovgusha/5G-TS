import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { SearchEvent } from './interfaces/search-event';
import { fromEvent, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('input', { static: true, read: ElementRef }) elementInput: ElementRef;
  @Input() auto: boolean = true;
  @Input() delay: number = 1000;
  @Output() onSearch = new EventEmitter<SearchEvent>()

  private _subscriptions = new Subscription();
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.auto) {
      this.listenerAutoSearch();
    }
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  search(event: Event) {
    event.preventDefault();
    const element = this.elementInput.nativeElement;
    const value = this.prepareValue(element.value);
    this.notifyOnSearch(value);
    element.value = '';
  }

  // ======================== Helpers ========================
  private listenerAutoSearch() {
    const subscribe = fromEvent(this.elementInput.nativeElement, 'input')
      .pipe(
        map((e: any) => this.prepareValue(e.target.value)),
        debounceTime(this.delay),
        distinctUntilChanged(),
        map((search: string) => search.trim()),
      ).subscribe((value) => { this.notifyOnSearch(value); })
    this._subscriptions.add(subscribe);
  }

  private prepareValue(value: string): string {
    return value.trim();
  }

  private notifyOnSearch(value: string) {
    this.onSearch.emit({ value });
  }

}
