import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { DataService } from './shared/data.service';

describe('AppComponent', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should use the user name from the service`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const appSrv = fixture.debugElement.injector.get(AppService);
    fixture.detectChanges();
    expect(appSrv.user.name).toEqual(app.user.name);
  });

  it(`shouldn\'t display the user name if user is not Logged in `, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(app.user.name);
  });

  it(`should display the user name if user is Logged in `, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isLoggedIn = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(app.user.name);
  });

  // INYECCIÓN Y ASINCRONÍAS

  it(`should fetch data sucessfully if called asynchronously`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);
    // Retornar nuestros propios datos y no el resultante de una tarea asíncrona
    // aunque se resuelva istantáneamente seguimos tratando bajo la asincronía
    const spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();

    // Reaccionar a todas las tareas asíncronas que hayan finalizado
    fixture.whenStable().then(() => {
      expect(app.data).toBe('Data');
    });
  }));

  it(`should fetch data sucessfully if called fake-async`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);
    // Retornar nuestros propios datos y no el resultante de una tarea asíncrona
    // aunque se resuelva istantáneamente seguimos tratando bajo la asincronía
    const spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();

    // Utilizar un tick para continuar
    tick();
    expect(app.data).toBe('Data');
  }));
});
