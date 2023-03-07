const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
<<<<<<< HEAD
  console.clear()
=======
  console.clear();
>>>>>>> 84b94ce727b56fb071cb58a910eefa9ca2881005
  console.log(`Server listening on http://localhost:${PORT}`);
});
