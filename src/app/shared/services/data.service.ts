import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Match } from '../interfaces/match';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dbPath = '/matches';

  matchsRef: AngularFirestoreCollection<Match>;

  constructor(private db: AngularFirestore) {
    this.matchsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Match> {
    return this.matchsRef;
  }

  create(match: Match): any {
    return this.matchsRef.add({ ...match });
  }

  update(id: string, data: any): Promise<void> {
    return this.matchsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.matchsRef.doc(id).delete();
  }
}
