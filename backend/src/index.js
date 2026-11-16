require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
const app = require('./server');

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
