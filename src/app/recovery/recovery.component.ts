import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpService } from '../httpservices';
import * as XLSX from 'xlsx';
import { HttpService } from '../httpservices';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';

// import { StudentService } from '../sheet';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css'
})
export class RecoveryComponent implements OnInit {
  imageUrl!: string | ArrayBuffer;
  StudentForm!: FormGroup;
  private formSubscription: Subscription | undefined;
  selectedAvatar: File | null = null;
   constructor(private http:HttpService,private r:Router,   private fb: FormBuilder){ this.imageUrl = 'http://placehold.it/180';
   this.StudentForm = this.fb.group({
     // Define form controls here
     image: [''], // Make sure to include the 'image' control in your form
   });}
  public isNavOpen = false;
  username: any = "";
  password: any = "";
  mobile: any = "";
  resno: any = "";
  deviceID = "";
  devicetype = "";
  users: any[] = [];
  i=0
  editingUserIndex=-1
  private excelFilePath = 'path/to/excel-sheet.xlsx';

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
   uploadImage1(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target!.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    }
  }

   

  // Other methods for your component

  // Function to handle the file input
  onFileSelected(event: any) {
    this.selectedAvatar = event.target.files[0] as File;
  }
  imageUrls: string[][] = [];
  // Function to upload the selected avatar
  // uploadAvatar() {
  //   if (this.selectedAvatar) {
  //     this.http.uploadAvatar(this.selectedAvatar).subscribe(
  //       (response) => {
  //         console.log('Response from the server:', response);
  //       },
  //       (error) => {
  //         console.error('Error uploading avatar:', error);
  //       }
  //     );
  //   } else {
  //     console.warn('No avatar selected');
  //   }
  // }
  ngOnInit(): void {
    this.http.getmainData().subscribe((data: any) => {
      this.users = data;
  
      // Extract image URLs and store them in the imageUrls array
      this.imageUrls = data.map((user: any) => [
        user.avatar,
        user.coverImage,
        user.backImage,
        user.frontImage
      ]);
  
      console.log(this.users);
    });
  }
  onset() {
    
  //   const obj = {
  //     "vin":this.mobile,
  //   "tlname":this.password,
  //   "ridername":this.deviceID,
  //   "hub":this.devicetype,
  //   "totaldamage":this.resno,
  //   "createdone":this.username,
  //   "dispatch":this.resno,
  //   "status":this.username
  // }
  const formData = new FormData();
    formData.append('avatar', this.avatar || '');
    formData.append('coverImage', this.coverImage || '');
    formData.append('backImage', this.backImage || '');
    formData.append('frontImage', this.frontImage || '');

    formData.append('vin', this.mobile);
    formData.append('tlname', this.password);
    formData.append('ridername', this.deviceID);
    formData.append('hub', this.devicetype);
    formData.append('totaldamage', this.resno);
    formData.append('createdone', this.username);
    formData.append('dispatch', this.resno);
    formData.append('status', this.username);
  this.http.postmaintData(formData).subscribe(res=>console.log(res));



    // Clear form fields
    
  }
  
  openExcelSheet() {
    window.open(this.excelFilePath, '_blank');
  }

  data: any[][] = [];
  headers: string[] = [];

  selectedFile: File | undefined;

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  displayData() {
    if (this.selectedFile) {
      this.readFile(this.selectedFile);
    }
  }

  private readFile(file: File) {
    const fileReader: FileReader = new FileReader();

    fileReader.onload = (e) => {
      const arrayBuffer: any = fileReader.result;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.headers = this.data.shift() || [];
    };

    fileReader.readAsArrayBuffer(file);
  }
   downloadSheet() {
    const spreadsheetId = '14-bal83MJpCe_HEdizG25opgwB03aoHKFTqHtlGo4zo';
    const sheetId = '10341254';

    // Build the URL for the sheet data in CSV format
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&id=${spreadsheetId}&gid=${sheetId}&single=true`;

    // Trigger the download
    this.downloadFile(sheetUrl, 'sheet_data.csv');
  }

  private downloadFile(url: string, fileName: string) {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        // Create a Blob from the data and trigger a download
        const blob = new Blob([data], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      })
      .catch((error) => console.error('Error downloading file:', error));
  }

  avatar: File | undefined;
  coverImage: File | undefined;
  backImage: File | undefined;
  frontImage: File | undefined;

  onFileChanged(event: any, imageType: string): void {
    const file = event.target.files[0];

    if (file) {
      switch (imageType) {
        case 'avatar':
          this.avatar = file;
          break;
        case 'coverImage':
          this.coverImage = file;
          break;
        case 'backImage':
          this.backImage = file;
          break;
        case 'frontImage':
          this.frontImage = file;
          break;
      }
    }
  }
  uploadFiles(): void {
    const formData = new FormData();

    if (this.avatar) {
      formData.append('avatar', this.avatar);
    }

    if (this.coverImage) {
      formData.append('coverImage', this.coverImage);
    }

    if (this.backImage) {
      formData.append('backImage', this.backImage);
    }

    if (this.frontImage) {
      formData.append('frontImage', this.frontImage);
    }

    this.http.uploadAvatar(formData).subscribe(
      (response) => {
        console.log('Files uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading files:', error);
      }
    );
  }

 

  uploadImage(event: any, rowIndex: number, imageIndex: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Ensure that the imageUrls array is initialized for this row
        this.imageUrls[rowIndex] = this.imageUrls[rowIndex] || [];
        // Update the imageUrl array for the specified index
        this.imageUrls[rowIndex][imageIndex] = e.target!.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImages(rowIndex: number): void {
    // Reset all imageUrls for the specified index
    this.imageUrls[rowIndex] = Array(4).fill('http://placehold.it/180');
  }
}
