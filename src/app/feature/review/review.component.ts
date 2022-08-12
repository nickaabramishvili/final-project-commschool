import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from 'src/app/shared/services/books.service';
import {
  BehaviorSubject,
  debounceTime,
  filter,
  Subject,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { Book } from 'src/app/shared/models/book';
import { appCheckInstanceFactory } from '@angular/fire/app-check/app-check.module';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent implements OnInit {
  private subscription = new Subscription();
  typeahead$: Subject<string> = new Subject();
  searchKeyword: string = '';
  selectLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  saved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  selectPageInformation = {
    startIndex: 0,
    totalItems: 0,
  };

  items: Book[] = [];
  selectedBook: Book | undefined = undefined;
  lastSearchedKeywords: string[] = [];
  form: FormGroup = this.fb.group({
    rate: [0, Validators.required],
    review: ['', Validators.required],
  });

  constructor(
    private cdr: ChangeDetectorRef,
    private booksService: BooksService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const savedKeywords = localStorage.getItem('searchedKeywords') || '[]';
    this.lastSearchedKeywords = JSON.parse(savedKeywords);
    this.booksService.itemsRef?.stateChanges().subscribe((change) => {
      if (this.selectedBook && change.type === 'child_added') {
        this.saved$.next(true);
      }
    });

    this.typeahead$
      .pipe(
        debounceTime(600),
        filter((input) => !!input)
      )
      .pipe(
        tap((input) => {
          if (this.searchKeyword !== input) {
            this.clear();
          }
          this.searchKeyword = input;
          this.selectLoading$.next(true);
          this.keyWordChanged();
        }),
        switchMap((input) =>
          this.booksService.searchBooks(
            input,
            this.selectPageInformation.startIndex
          )
        )
      )
      .subscribe((response: any) => {
        this.selectPageInformation.totalItems = response.totalItems;
        this.items = [...this.items, ...response.items];
        this.selectLoading$.next(false);
      });
    this.cdr.markForCheck();
  }

  scrollEnd() {
    if (this.items.length === this.selectPageInformation.totalItems) {
      return;
    }
    this.selectPageInformation.startIndex = this.items.length - 1;
    this.typeahead$.next(this.searchKeyword);
  }

  clear() {
    this.items = [];
    this.selectPageInformation.startIndex = 0;
    this.cdr.markForCheck();
  }

  selectCleared() {
    this.clear();
  }

  // selectChanged($event: any) {
  //   this.booksService.addBook($event);
  // }

  submit() {
    console.log(this.selectedBook);

    const data: Book = { ...this.form.value, ...this.selectedBook };
    this.booksService.addBook(data);
  }

  keyWordChanged() {
    let clonedKeywords: string[] = [...this.lastSearchedKeywords];

    if (clonedKeywords.length === 3) {
      clonedKeywords.pop();
    }
    clonedKeywords.unshift(this.searchKeyword);

    this.lastSearchedKeywords = clonedKeywords;

    // console.log(clonedKeywords);
    localStorage.setItem('searchedKeywords', JSON.stringify(clonedKeywords));
    this.cdr.markForCheck();
  }
}
