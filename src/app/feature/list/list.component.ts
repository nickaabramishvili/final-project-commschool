import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription, map } from 'rxjs';
import { Book } from 'src/app/shared/models/book';
import { BooksService } from '../../shared/services/books.service';

interface PageInformation {
  key: string;
  lastPage: boolean;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  userBooks: Book[] = [];
  pageInformation: PageInformation = {
    key: '',
    lastPage: false,
  };
  constructor(
    private afAuth: AngularFireAuth,
    private booksService: BooksService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.loadData();
      }
    });
  }

  loadData() {
    this.subscription.add(
      this.booksService
        .getBooksList(this.pageInformation.key)
        .snapshotChanges()
        .pipe(
          map((changes: any) =>
            changes.map((c: any) => ({
              key: c.payload.key,
              ...c.payload.val(),
            }))
          )
        )
        .subscribe((data) => {
          if (!data.length) {
            this.pageInformation.lastPage = true;
          }

          this.userBooks = [...this.userBooks, ...data];
          this.pageInformation.key =
            this.userBooks[this.userBooks.length - 1].id;
          this.cdr.markForCheck();
        })
    );
  }

  loadMore() {
    console.log('load more');
    if (this.pageInformation.lastPage) {
      return;
    }
    this.loadData();
  }
}
