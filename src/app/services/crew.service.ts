import { BehaviorSubject, Observable } from 'rxjs';
import { Crew } from '../models/crew.model';
import { Injectable } from '@angular/core';
import dummyData from './crewsDummy.json';

@Injectable({
  providedIn: 'root',
})
export class CrewService {
  private crewsSubject: BehaviorSubject<Crew[]> = new BehaviorSubject<Crew[]>(
    dummyData
  );

  public crews$: Observable<Crew[]> = this.crewsSubject.asObservable();

  private currentId = dummyData.length;

  constructor() {
    const storedCrews = localStorage.getItem('crews');
    if (storedCrews) {
      const crews: Crew[] = JSON.parse(storedCrews);
      this.crewsSubject.next(crews);
      this.currentId =
        crews.length > 0 ? crews[crews.length - 1].id + 1 : dummyData.length;
    }
  }

  getCrews(): Observable<Crew[]> {
    return this.crews$;
  }

  getCrew(id: number): Crew | undefined {
    const currentCrews = this.crewsSubject.getValue();
    const findedCrew = currentCrews.find((crew) => crew.id === id);
    return findedCrew;
  }

  addCrew(crew: Omit<Crew, 'id'>): void {
    const currentCrews = this.crewsSubject.getValue();
    const newCrew: Crew = { id: this.currentId++, ...crew };
    const updatedCrews = [...currentCrews, newCrew];
    this.crewsSubject.next(updatedCrews);
    this.saveToLocalStorage(updatedCrews);
  }

  deleteCrew(id: number): void {
    const currentCrews = this.crewsSubject.getValue();
    const updatedCrews = currentCrews.filter((crew) => crew.id !== id);
    this.crewsSubject.next(updatedCrews);
    this.saveToLocalStorage(updatedCrews);
  }

  updateCrew(updatedCrew: Crew): void {
    const currentCrews = this.crewsSubject.getValue();
    const index = currentCrews.findIndex((crew) => crew.id === updatedCrew.id);
    if (index > -1) {
      currentCrews[index] = updatedCrew;
      this.crewsSubject.next(currentCrews);
      this.saveToLocalStorage(currentCrews);
    }
  }

  private saveToLocalStorage(crews: Crew[]): void {
    localStorage.setItem('crews', JSON.stringify(crews));
  }
}
