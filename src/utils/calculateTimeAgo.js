const calculateTimeAgo = (time) => {
  const timeAgo = (new Date() - new Date(time)) / (1000 * 60) * 60 - 32400;
  return timeAgo > 60 ?
    (timeAgo / 60) > 60 ?
      parseInt(timeAgo / 60 / 60) > 24 ?
        parseInt(timeAgo / 60 / 60 / 24) > 30 ?
          parseInt(timeAgo / 60 / 60 / 24 / 30) > 12 ?
            parseInt(timeAgo / 60 / 60 / 24 / 30 / 12) + "년"
            : parseInt(timeAgo / 60 / 60 / 24 / 30) + "달"
          : parseInt(timeAgo / 60 / 60 / 24) + "일"
        : parseInt(timeAgo / 60 / 60) + "시간"
      : parseInt(timeAgo / 60) + "분"
    : "방금"
}

export default calculateTimeAgo;