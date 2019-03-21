function getMinutes(time) {
  return +time.slice(0, -3) * 60 + +time.slice(-2);
}

export function getDaySlots(duration, shedule) {
  const slots = [];
  const busySlots = [{ Start: '8:00', End: '8:00' }].concat(shedule, [
    { Start: '22:00', End: '22:00' },
  ]);
  for (let i = 0; i < busySlots.length - 1; i += 1) {
    const freeWindow = [
      getMinutes(busySlots[i].End),
      getMinutes(busySlots[i + 1].Start),
    ];
    while (freeWindow[1] - freeWindow[0] >= duration) {
      slots.push(freeWindow[0]);
      freeWindow[0] += +duration;
    }
  }
  return slots;
}

// console.log(getDaySlots(60, data.Monday));
// [ 660, 900, 1080, 1140 ] minutes
