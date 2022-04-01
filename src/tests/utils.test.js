import * as utils from '../utils';

describe('differenceInMinutes', () => {
  it('should correctly calculate the difference between two dates in minutes', () => {
    const date = new Date(2018, 5, 27, 12);
    const date2 = new Date(2018, 5, 27, 10);
    expect(utils.differenceInMinutes(date, date2)).toBe(120);
  });

  it('should correctly calculate the negative difference between two dates in minutes', () => {
    const date = new Date(2018, 5, 27, 12);
    const date2 = new Date(2018, 5, 27, 10);
    expect(utils.differenceInMinutes(date2, date)).toBe(-120);
  });

  it('should still work if a string is given instead of a date object', () => {
    const date = '2018-05-28T15:43:48+00:00';
    const date2 = '2018-05-27T05:43:48+00:00';
    expect(utils.differenceInMinutes(date, date2)).toBe(2040);
  });

  it(`should work with two slightly different dates`, () => {
    const date = new Date(2018, 0, 1, 0, 1, 0);
    const date2 = new Date(2018, 0, 1, 0, 0, 0);
    expect(utils.differenceInMinutes(date, date2)).toBe(1);
  });

  it(`should work with two dates that are the same`, () => {
    const date = new Date(2018, 0, 1, 0, 1, 0);
    const date2 = new Date(2018, 0, 1, 0, 1, 0);
    expect(utils.differenceInMinutes(date, date2)).toBe(0);
  });
});

describe('convertMinsToHrsMins', () => {
  it(`should work with a single digit number`, () => {
    expect(utils.convertMinsToHrsMins(1)).toEqual({ hours: 0, minutes: 1 });
  });

  it(`should work with zero`, () => {
    expect(utils.convertMinsToHrsMins(0)).toEqual({ hours: 0, minutes: 0 });
  });

  it(`should throw error when given a negative value`, () => {
    function negativeValue() {
      utils.convertMinsToHrsMins(-10);
    }
    expect(negativeValue).toThrow();
  });

  it('should return 1 hour 0 mins not 60mins', () => {
    expect(utils.convertMinsToHrsMins(60)).toEqual({ hours: 1, minutes: 0 });
  });

  it('should work with larger numbers', () => {
    expect(utils.convertMinsToHrsMins(1248)).toEqual({
      hours: 20,
      minutes: 48
    });
  });
});
