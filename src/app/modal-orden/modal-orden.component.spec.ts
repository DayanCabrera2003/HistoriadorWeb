import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrdenComponent } from './modal-orden.component';

describe('ModalOrdenComponent', () => {
  let component: ModalOrdenComponent;
  let fixture: ComponentFixture<ModalOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOrdenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
