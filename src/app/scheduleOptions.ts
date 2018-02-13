export class ScheduleOptions {

  private static _current: ScheduleOptions;

  dayHeightPx: number;
  eventHeightPx: number;
  stepMinutes: number;
  stepPx: number;
  scheduleStartMinutes: number;
  gridLineThicknessPx: number;
  hourWidthPx: number;

  public static Current(): ScheduleOptions {
    const stepMinutes = 15;
    const stepPx = 20;
    return this._current || (this._current = {
      dayHeightPx: 30,
      eventHeightPx: 28,
      stepMinutes: stepMinutes,
      stepPx: stepPx,
      scheduleStartMinutes: 360,
      gridLineThicknessPx: 1,
      hourWidthPx: stepPx * 60 / stepMinutes
    });
  }
}
