export const renderCards = (size, array) => {
  if (array) {
    if (size > 1270) {
      return (array.length > 16)
        ? array.slice(0, 16)
        : array;
    } else if (size > 984) {
      return (array.length > 12)
      ? array.slice(0, 12)
      : array;
    } else if (size > 568) {
      return (array.length > 8)
      ? array.slice(0, 8)
      : array;
    } else if (size <= 568) {
      return (array.length > 5)
      ? array.slice(0, 5)
      : array;
    }
}
}

export const optionalCards = (size, array) => {
  if (array) {
    if (size > 1270) return array.slice(16, -1);
    else if (size > 984) return array.slice(12, -1);
    else if (size > 568) return array.slice(8, -1);
    else if (size <= 568) return array.slice(5, -1);
  }
}

export const renderOptional = (size, array) => {
  if (size > 1270) {
    return (array.length >= 4)
      ? array.slice(0, 4)
      : array;
  } else if (size > 984) {
    return (array.length >= 3)
    ? array.slice(0, 3)
    : array;
  } else if (size > 568) {
    return (array.length >= 2)
    ? array.slice(0, 2)
    : array;
  } else if (size <= 568) {
    return (array.length >= 1)
    ? array.slice(0, 1)
    : array;
  }
}

export const changeOptional = (size, array) => {
  if (size > 1270) {
    return (array.length >= 4)
      ? array.slice(4, -1)
      : array;
  } else if (size > 984) {
    return (array.length >= 3)
    ? array.slice(3, -1)
    : array;
  } else if (size > 568) {
    return (array.length >= 2)
    ? array.slice(2, -1)
    : array;
  } else if (size <= 568) {
    return (array.length >= 1)
    ? array.slice(1, -1)
    : array;
  }
}

