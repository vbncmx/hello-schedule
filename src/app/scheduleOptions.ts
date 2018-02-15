export class ScheduleOptions {

  private static _current: ScheduleOptions;

  dayHeightPx: number;
  eventHeightPx: number;
  stepMinutes: number;
  stepPx: number;
  scheduleStartMinutes: number;
  scheduleEndMinutes: number;
  gridLineThicknessPx: number;
  hourWidthPx: number;
  stepScaleHeightPx: number;
  dayScaleWidthPx: number;
  timeMarksPanelHeightPx: number;

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
      hourWidthPx: stepPx * 60 / stepMinutes,
      stepScaleHeightPx: 10,
      scheduleEndMinutes: 22 * 60,
      dayScaleWidthPx: 30,
      timeMarksPanelHeightPx: 20
    });
  }
}
