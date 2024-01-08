import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehComponent } from './teh.component';

describe('TehComponent', () => {
  let component: TehComponent;
  let fixture: ComponentFixture<TehComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TehComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
