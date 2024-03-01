export const getName = (name: string): string => {
  return (name.match(/[a-zA-Z0-9]+/g) || [])
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join("");
};

export const getNameLower = (name: string): string => {
  return getName(name)[0].toLowerCase().concat(getName(name).slice(1));
};
