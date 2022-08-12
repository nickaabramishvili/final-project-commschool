import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Book } from 'src/app/shared/models/book';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  bookId: string | undefined;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  book: Book | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public afAuth: AngularFireAuth,
    private bookService: BooksService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.loading$.next(true);
        this.bookService
          .getBook(this.bookId!)
          .snapshotChanges()
          .subscribe((snapshot) => {
            this.loading$.next(false);
            this.book = snapshot.payload.val();
            this.cdr.markForCheck();
          });
      }
    });
    this.route.params.subscribe((params: any) => {
      if (!params.id) {
        return;
      }
      this.bookId = params?.id;
      if (!this.bookId) {
        return;
      }
    });
  }

  async delete() {
    const deleteResult = await this.bookService.deleteBook();
    this.router.navigate(['/feature/list']);
  }
}
