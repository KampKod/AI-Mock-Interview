export const cx = (...classes) => {
    const newClasses = [];
    for (const c of classes) {
      if (typeof c === "string") {
        newClasses.push(c.trim());
      }
    }
    return newClasses.join(" ");
  };
  