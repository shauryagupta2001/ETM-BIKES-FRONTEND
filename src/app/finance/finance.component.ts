import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../httpservices';

import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css'
})
export class FinanceComponent implements OnInit{
  constructor(private http:HttpService,private r:Router){}

  public isNavOpen = false;
  username: any = "";
  password: any = "";
  mobile: any = "";
  resno: any = "";
  deviceID = "";
  devicetype = "";
  users: any;
  private excelFilePath = 'path/to/excel-sheet.xlsx';
  i=0
  editingUserIndex=-1
ngOnInit(): void {
  this.http.getfinanceData().subscribe((data:any)=>{
         this.users=data
         console.log(this.users);
         
         
  })
}
  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
  onset() {
    const obj = {
      
       "vin":this.resno,
       "ridername":this.devicetype,
       "tlname":this.password,
       "mobile":this.mobile,
       "etmid":this.username,
       "dues":this.deviceID
  }
  this.http.onpostfinance(obj).subscribe(res=>console.log(res));

    this.r.navigate(['fi'])


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
  
      const xlsxData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers:any = xlsxData.shift() || [];
  
      // Map XLSX data to post data
      const postDataArray: { [key: string]: any }[] = xlsxData.map((row:any) => {
        const postData: { [key: string]: any } = {};
        headers.forEach((header :any, index:any) => {
          postData[header] = row[index];
        });
        return postData;
      });
      // Assuming post data structure looks like this
      const postArray = postDataArray.map((data) => ({
        "etmid": data["ETM ID"],
        "vin": data["VIN"],
        "ridername": data["Rider Name"],
        "tlname": data["TL Name"], // Adjust this according to your actual post data structure
        "mobile": data["Mob. No."],
        "dues": data["Hub Name"],
      
      }));
      console.log('Parsed Data:', postArray);
      // Assuming you want to post each row individually
      postArray.forEach((postData) => {
        this.http.onpostfinance(postData).subscribe(
          (res) => console.log('Success:', res),
          (error) => console.error('Error:', error)
        );
              });
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

}
