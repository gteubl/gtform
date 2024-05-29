import { CastDataPipe } from 'app/library/form-grid/pipes/cast-data.pipe';

describe('CastDataPipe', () => {
  it('create an instance', () => {
    const pipe = new CastDataPipe();
    expect(pipe).toBeTruthy();
  });
});
