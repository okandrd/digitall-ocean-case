import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import dummyData from '../datas/certificateDummy.json';
import { Certificate } from '../models/certificate.model';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private certificateSubject: BehaviorSubject<Certificate[]> =
    new BehaviorSubject<Certificate[]>(dummyData);

  public certificate$: Observable<Certificate[]> =
    this.certificateSubject.asObservable();

  private currentId = dummyData.length + 1;

  constructor() {
    const storedCertificate = localStorage.getItem('certificate');
    if (storedCertificate) {
      const certificate: Certificate[] = JSON.parse(storedCertificate);
      this.certificateSubject.next(certificate);
      this.currentId =
        certificate.length > 0
          ? certificate[certificate.length - 1].id + 1
          : dummyData.length;
    }
  }

  getCertificates(): Observable<Certificate[]> {
    return this.certificate$;
  }

  getCertificatesByCrewId(crewId: number): Certificate[] {
    const allCertificates = this.certificateSubject.getValue();
    const findedCertidicates = allCertificates.filter(
      (certificate) => certificate.crewId === crewId
    );
    return findedCertidicates;
  }

  getCertificate(id: number): Certificate | undefined {
    const currentCertificate = this.certificateSubject.getValue();
    const findedCertificate = currentCertificate.find(
      (certificate) => certificate.id === id
    );
    return findedCertificate;
  }

  addCertificate(certificate: Omit<Certificate, 'id'>): void {
    const currentCertificate = this.certificateSubject.getValue();
    const newCertificate: Certificate = {
      id: this.currentId++,
      ...certificate,
    };
    const updatedCertificate = [...currentCertificate, newCertificate];
    this.certificateSubject.next(updatedCertificate);
    this.saveToLocalStorage(updatedCertificate);
  }

  deleteCertificate(id: number): void {
    const currentCertificate = this.certificateSubject.getValue();
    const updatedCertificate = currentCertificate.filter(
      (certificate) => certificate.id !== id
    );
    this.certificateSubject.next(updatedCertificate);
    this.saveToLocalStorage(updatedCertificate);
  }

  updateCertificate(updatedCertificate: Certificate): void {
    const currentCertificate = this.certificateSubject.getValue();
    const index = currentCertificate.findIndex(
      (certificate) => certificate.id === updatedCertificate.id
    );
    if (index > -1) {
      currentCertificate[index] = updatedCertificate;
      this.certificateSubject.next(currentCertificate);
      this.saveToLocalStorage(currentCertificate);
    }
  }

  private saveToLocalStorage(certificate: Certificate[]): void {
    localStorage.setItem('certificate', JSON.stringify(certificate));
  }
}
