import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import 'bootstrap';
declare var $: any;

interface User {
  vehicleNo: string;
  deviceNo: string;
  subscription: Date;
  remainingTime: string;
  sale: string;
  install: string;
  deviceType: string;
  Sim: string;
  VehicleID: string;
  plan: string;
  status: string;
}
@Component({
  selector: 'app-subsc',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './subsc.component.html',
  styleUrl: './subsc.component.css'
})
export class SubscComponent implements OnInit, OnDestroy {

  
    
  private subscription: any;
  installationDate!: Date;
  deviceType!: string;
  subscriptionEndDate!: Date;
  remainingTime!: string;
  private excelFilePath = 'path/to/excel-sheet.xlsx';
  subscriptionStatus: string = '';
  users: User[] = [];
  newUser: User = {
    vehicleNo: '',
    deviceNo: '',
    subscription: new Date(),
    remainingTime: '',
    deviceType: '',
    VehicleID: '',
    Sim: '',
    sale: '',
    plan: '',
    install: '',
    status: 'Active',
  };
  selectedUserIndex: number | null = null;

  constructor(private datePipe: DatePipe, private ngZone: NgZone) {}

  ngOnInit() {
    // For demonstration purposes, set dummy data for the installation date and device type
    // this.installationDate = new Date('2023-12-29');
    // this.deviceType = 'IoT Device';

    // Calculate subscription end date
    // this.subscriptionService.getSubscriptionStatus().subscribe((subscriptionData) => {
    //   console.log('Subscription started:', subscriptionData);
    //   this.subscriptionEndDate = subscriptionData.expirationDate;

    //   // Start countdown timer
    //   this.subscription = this.subscriptionService.simulateSubscriptionEndNotification().subscribe(
    //     () => {
    //       this.calculateRemainingTime();
    //     },
    //     null,
    //     () => {
    //       console.log('Subscription ended. Showing alert.');
    //       this.showAlert();
    //     }
    //   );
    // });
    this.startCountdown();
    this.planOptions = [
      { value: '1-month', label: '1 Month' },
      { value: '3-month', label: '3 Months' },
      { value: '6-month', label: '6 Months' },
      { value: '12-month', label: '12 Months' }
      // Add more options as needed
    ];
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showAlert(): void {
    alert('Your subscription has ended. Please renew your plan.');
  }
  planOptions = [
    { value: '1-month', label: '1 Month' },
    { value: '3-month', label: '3 Months' },
    { value: '6-month', label: '6 Months' },
    { value: '12-month', label: '12 Months' },
    { value: '5-min', label: '5 Minutes Demo' }
    // Add more options as needed
  ];
  
  startCountdown() {
    setInterval(() => {
      this.ngZone.run(() => {
        // Check if subscriptionEndDate is defined
        if (this.subscriptionEndDate) {
          // Calculate remaining time
          const now = new Date();
          const timeDifference = this.subscriptionEndDate.getTime() - now.getTime();
  
          if (timeDifference > 0) {
            this.remainingTime = this.formatTimeDifference(timeDifference);
  
            // Update status based on remaining time
            if (timeDifference < 24 * 60 * 60 * 1000) {
              this.subscriptionStatus = 'Expiring Soon';
            } else {
              this.subscriptionStatus = 'Active';
            }
          } else {
            this.remainingTime = 'Expired';
            this.subscriptionStatus = 'Expired';
            this.showAlert();
          }
  
          // Check for outdated dates and show alert
          if (this.isDateOutdated(this.subscriptionEndDate)) {
            this.showAlert();
          }
  
          // Log countdown in console
          console.log('Remaining time:', this.remainingTime);
        }
      });
    }, 1000);
  }
  

  isDateOutdated(date: Date): boolean {
    const now = new Date();
    return date < now;
  }

  editUser(index: number) {
    // Populate the form with the values of the selected user
    this.newUser = { ...this.users[index] };

    // Set the index of the selected user
    this.selectedUserIndex = index;

    // Open the modal for editing
    this.openAddUserModal();
  }

  deleteUser(index: number) {
    // Remove the user from the list
    this.users.splice(index, 1);
  }

  private formatTimeDifference(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return `${days} days`;
  }

  openAddUserModal() {
    // Clear the form when opening the modal
    this.newUser = {
      vehicleNo: '',
      deviceNo: '',
      subscription: new Date(),
      remainingTime: '',
      deviceType: '',
      VehicleID: '',
      Sim: '',
      sale: '',
      plan: '',
      install: '',
      status: 'Active',
    };
    $('#addUserModal').modal('show');
  }

  addUser(form: any) {
    if (form.valid) {
      // Calculate remaining time based on the subscription input
      this.calculateRemainingTime();
  
      if (this.selectedUserIndex !== null) {
        // If editing, replace the existing user
        this.users[this.selectedUserIndex] = { ...this.newUser };
        this.selectedUserIndex = null; // Reset selected index after editing
      } else {
        // If adding a new user
        this.users.push({ ...this.newUser });
      }
  
      // Clear the form
      this.newUser = {
        vehicleNo: '',
        deviceNo: '',
        subscription: new Date(),
        remainingTime: '',
        deviceType: '',
        VehicleID: '',
        Sim: '',
        sale: '',
        plan: '',
        install: '',
        status: 'Active', // Set default status to 'Active'
      };
  
      // Hide the modal
      $('#addUserModal').modal('hide');
    }
  }
  

  calculateRemainingTime() {
    const currentDate = new Date();
    const expirationDate = new Date(this.newUser.subscription);
  
    // Calculate remaining time
    const timeDifference = expirationDate.getTime() - currentDate.getTime();
  
    if (timeDifference > 0) {
      this.newUser.remainingTime = this.formatTimeDifference(timeDifference);
  
      // Update status based on remaining time
      if (timeDifference < 24 * 60 * 60 * 1000) {
        this.newUser.status = 'Expiring Soon';
      } else {
        this.newUser.status = 'Active';
      }
    } else {
      this.newUser.remainingTime = 'Expired';
      this.newUser.status = 'Expired';
  
      // Show alert for expired subscription
      this.showAlert();
    }
  }
  
  updateNextSubscriptionDate() {
    const selectedPlan = this.newUser.plan;
    const saleDate = new Date(this.newUser.sale);
  
    // Calculate expiration date based on the selected plan
    switch (selectedPlan) {
      case '1-month':
        saleDate.setMonth(saleDate.getMonth() + 1);
        break;
      case '3-month':
        saleDate.setMonth(saleDate.getMonth() + 3);
        break;
      case '6-month':
        saleDate.setMonth(saleDate.getMonth() + 6);
        break;
      case '12-month':
        saleDate.setFullYear(saleDate.getFullYear() + 1);
        break;
      // Add more cases for other plan options as needed
      
    }
   
    // Set the calculated date to the subscription input
    this.newUser.subscription = saleDate;
  
    // Calculate and display the remaining time
    this.calculateRemainingTime();
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

}
