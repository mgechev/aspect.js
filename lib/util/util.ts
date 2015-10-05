export function extend(target:any, ...args) {
  args.forEach(obj => {
    for (let prop in obj) {
      target[prop] = obj[prop];
    }
  });
  return target;
}

