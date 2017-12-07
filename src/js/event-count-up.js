let countTrasition = function (id, start, end) {
  let options = {
    useEasing: true,
    useGrouping: true,
    separator: '',
  };

  let decimal = 0;
  let transitionDuration = 3;
  let transition = new CountUp(
    id,
    start,
    end,
    decimal,
    transitionDuration,
    options
  );

  transition.start();
};