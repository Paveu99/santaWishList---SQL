const express = require('express');
require('express-async-errors');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const { handleError } = require('./utils/error');
const { homeRouter } = require('./routers/home');
const { childRouter } = require('./routers/child');
const { giftRouter } = require('./routers/gift');
require('./utils/db');
const { handlebarsHelpers } = require('./utils/handlebars-helpers'); // aby od razu się łączyło z bazą?

const app = express();

app.use(methodOverride('_method')); // pole gdzie będziemy prezsyłać informacje na temat http
app.use(express.urlencoded({ // pozwala na rozszyfrowywanie/parsowanie dane przesłane za pomocą formularzy
  extended: true,
}));
app.use(express.static('public')); // korzystanie z plików statycznych z folderu static
// app.use(express.json); // jakby przyszedł Content-type: application/json to by ładnie odczytało do postaci obiektu
app.engine('.hbs', engine({
  extname: '.hbs', // rozszerzenie
  helpers: handlebarsHelpers, // dodatkowe funkcjonalonści któe chcielibyśmy dodać do obiektu
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/child', childRouter);
app.use('/gift', giftRouter);

app.use(handleError);

app.listen(3000, 'localhost', () => {
  console.log('Listening on http://localhost:3000');
});
