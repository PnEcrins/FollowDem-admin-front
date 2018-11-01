import { TypeDeviceModule } from './type-devices.module';

describe('TypeDeviceModule', () => {
  let typeDeviceModule: TypeDeviceModule;

  beforeEach(() => {
    typeDeviceModule = new TypeDeviceModule();
  });

  it('should create an instance', () => {
    expect(typeDeviceModule).toBeTruthy();
  });
});
