import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscComponent } from './subsc.component';

describe('SubscComponent', () => {
  let component: SubscComponent;
  let fixture: ComponentFixture<SubscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
