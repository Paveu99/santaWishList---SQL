class ValidationError extends Error {}
const handleError = (err, req, res, next) => {
  // jeżeli w kodzie byłaby możliwość że wchodzimy do elementu, który nie istnieje to przydałby się taki kod:
/*
if (err instanceofNotFoundError {
res.
  status(404)
  render('error', {
    message: 'Nie można znaleźć elementu o tym ID'
   }
   return
  }
 */
  console.log(err);
  res
    .status(err instanceof ValidationError ? 400 : 500)
    .render('error', {
      message: err instanceof ValidationError ? err.message : 'Przepraszamy spróbuje za parę minut ponownie',
    });
};

module.exports = {
  handleError,
  ValidationError,
};
