import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaDetalleComponent } from './grafica-detalle.component';

describe('GraficaDetalleComponent', () => {
  let component: GraficaDetalleComponent;
  let fixture: ComponentFixture<GraficaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
