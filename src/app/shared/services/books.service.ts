import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { query, startAfter, remove } from '@angular/fire/database';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  itemsRef: AngularFireList<Book> | undefined;
  userId: string | undefined;
  databasePath: string | undefined;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private http: HttpClient
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.databasePath = `books/${this.userId}`;
        this.itemsRef = this.db.list(this.databasePath);
      }
    });
  }

  searchBooks(
    q: String,
    startIndex = 0
  ): Observable<{ totalItems: number; items: Book[] }> {
    return this.http
      .get<{ totalItems: number; items: Book[] }>(
        `${environment.booksApi}/volumes?q=${q}&key=${environment.googleApiKey}&startIndex=${startIndex}&projection=lite&fields=totalItems,items(id,volumeInfo)&maxResults=40`
      )
      .pipe(
        map((response) => ({
          totalItems: response.totalItems,
          items: response.items.map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title,
            subTitle: item.volumeInfo?.subtitle || '',
            authors: item.volumeInfo?.authors || [],
            publishedDate: item.volumeInfo?.publishedDate || null,
            description: item.volumeInfo?.description || '',
            thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
          })),
        }))
      );
  }

  addBook(book: Book) {
    console.log('dddd');
    if (!this.itemsRef) return;
    this.itemsRef.push({ ...book });
  }

  getBook(id: string) {
    // if(!this.databasePath) return;
    // this.itemRef = this.db.object(`${this.databasePath}/id`);
    // return this.itemRef;
  }

  async deleteBook(id: any) {
    if (!this.databasePath) return;
    // this.itemsRef.
    // // console.log(`${this.databasePath}/id`);
    // // const t = query(startAfter(10)).ref
    // // this.itemsRef?.remove(t)
    // // return new Promise(async (resolve, reject) => {
    // //   const itemRef = this.db.object(`${this.databasePath}`);
    // //   try {
    // //     const d = await itemRef.remove()
    // //     console.log(d,'====delete');
    // //     resolve({});
    // //   } catch (e) {
    // //     reject(e);
    // //   }
    // // });
  }

  getBooksList(startKey = ''): AngularFireList<Book> {
    return this.db.list(`books/${this.userId}`, (ref) =>
      ref.orderByChild('id').startAfter(startKey).limitToFirst(20)
    );
  }

  //
  // //
  // getAll(): AngularFirestoreCollection<any> {
  //   return this.booksRef!;
  // }
  //
  // create(item: any): any {
  //   return this.booksRef.add({...item});
  // }
  //
  // update(id: string, data: any): Promise<void> {
  //   return this.booksRef.doc(id).update(data);
  // }
  //
  // delete(id: string): Promise<void> {
  //   return this.booksRef.doc(id).delete();
  // }
}
