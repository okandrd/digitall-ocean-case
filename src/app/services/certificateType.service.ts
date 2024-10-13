import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import dummyData from '../datas/certificateTypesDummy.json';
import { CertificateType } from '../models/certificateType.model';

@Injectable({
  providedIn: 'root',
})
export class CertificateTypeService {
  private certificateTypesSubject: BehaviorSubject<CertificateType[]> =
    new BehaviorSubject<CertificateType[]>(dummyData);

  public certificateTypes$: Observable<CertificateType[]> =
    this.certificateTypesSubject.asObservable();

  private currentId = dummyData.length + 1;

  constructor() {
    const storedCertificateTypes = localStorage.getItem('certificateTypes');
    if (storedCertificateTypes) {
      const certificateTypes: CertificateType[] = JSON.parse(
        storedCertificateTypes
      );
      this.certificateTypesSubject.next(certificateTypes);
      this.currentId =
        certificateTypes.length > 0
          ? certificateTypes[certificateTypes.length - 1].id + 1
          : dummyData.length;
    }
  }

  getCertificateTypes(): Observable<CertificateType[]> {
    return this.certificateTypes$;
  }

  getCertificateType(id: number): CertificateType | undefined {
    const currentCertificateTypes = this.certificateTypesSubject.getValue();
    const findedCertificateType = currentCertificateTypes.find(
      (certificateType) => certificateType.id === id
    );
    return findedCertificateType;
  }

  addCertificateType(certificateType: Omit<CertificateType, 'id'>): void {
    const currentCertificateTypes = this.certificateTypesSubject.getValue();
    const newCertificateType: CertificateType = {
      id: this.currentId++,
      ...certificateType,
    };
    const updatedCertificateTypes = [
      ...currentCertificateTypes,
      newCertificateType,
    ];
    this.certificateTypesSubject.next(updatedCertificateTypes);
    this.saveToLocalStorage(updatedCertificateTypes);
  }

  deleteCertificateType(id: number): void {
    const currentCertificateTypes = this.certificateTypesSubject.getValue();
    const updatedCertificateTypes = currentCertificateTypes.filter(
      (certificateType) => certificateType.id !== id
    );
    this.certificateTypesSubject.next(updatedCertificateTypes);
    this.saveToLocalStorage(updatedCertificateTypes);
  }

  updateCertificateType(updatedCertificateType: CertificateType): void {
    const currentCertificateTypes = this.certificateTypesSubject.getValue();
    const index = currentCertificateTypes.findIndex(
      (certificateType) => certificateType.id === updatedCertificateType.id
    );
    if (index > -1) {
      currentCertificateTypes[index] = updatedCertificateType;
      this.certificateTypesSubject.next(currentCertificateTypes);
      this.saveToLocalStorage(currentCertificateTypes);
    }
  }

  private saveToLocalStorage(certificateTypes: CertificateType[]): void {
    localStorage.setItem('certificateTypes', JSON.stringify(certificateTypes));
  }
}
