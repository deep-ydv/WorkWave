import React from 'react'

const getDayWithSuffix = (day) => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
};

const DateFixing = ({ date }) => {
  const d = new Date(date);
  const dayWithSuffix = getDayWithSuffix(d.getDate());
  const month = d.toLocaleString("en-GB", { month: 'short' });
  const year = d.getFullYear();

  return (
    <div className='font-semibold'>{`${dayWithSuffix} ${month} ${year}`}</div>
  );
};

export default DateFixing;
