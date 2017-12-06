let countTrasition = function (id, start, end) {
  let decimal = 0;
  let transitionDuration = 3;
  let transition = new CountUp(
    id,
    start,
    end,
    decimal,
    transitionDuration
  );

  transition.start();
};