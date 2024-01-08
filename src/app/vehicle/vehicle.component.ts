import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {
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

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
  onset() {
    const obj = {
      "VehicleType":this.resno,
       "DeviceType":this.devicetype,
       "DeviceId":this.deviceID,
       "userId":this.username,
       "password":this.password,
       "MobileNo":this.mobile,
  }
 
    if (this.editingUserIndex === -1) {
      // Adding a new user
      this.users.push({
        userId: this.username,
        password: this.password,
        MobileNo: this.mobile,
        VehicleType: this.resno,
        DeviceId: this.deviceID,
        DeviceType: this.devicetype,
      });
    } else {
      // Editing an existing user
      this.users[this.editingUserIndex] = {
        username: this.username,
        password: this.password,
        mobile: this.mobile,
        resno: this.resno,
        deviceID: this.deviceID,
        devicetype: this.devicetype,
      };
      this.editingUserIndex = -1; // Reset editing state after saving changes
    }


    // Clear form fields
    
  }
  devices: string[] = ['Device1', 'Device2', 'Device3']; // Initial devices
  selectedDevice: string = ''; // Selected device
  showDropdown: boolean = false; // Flag to show/hide dropdown

  addDevice() {
    if (this.selectedDevice.trim() !== '' && !this.devices.includes(this.selectedDevice)) {
      this.devices.push(this.selectedDevice);
      this.selectedDevice = '';
    }
    this.showDropdown = false; // Hide dropdown after adding a device
  }

  selectDevice(device: string) {
    this.selectedDevice = device;
    this.showDropdown = false; // Hide dropdown after selecting a device
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  private excelFilePath = 'path/to/excel-sheet.xlsx';

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

  
}

