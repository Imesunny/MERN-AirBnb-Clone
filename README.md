# MERN-AirBnb-Clone

06/12/2023
--hero icons for icons

--outlet from react-router-dom to move all routes inside it In the context of React Router, when you use the <Outlet /> component within a component, it indicates that this component is a layout or a parent route. The child routes specified in the route configuration will be rendered within the <Outlet /> location.

--@apply for <input></input>
input[type='text'], input[type='password'], input[type='email'] {
  @apply w-full border my-2 py-2 px-3 rounded-full;
}
here @apply will give the css properties to all the input type

Axios 
---The line axios.defaults.baseURL = 'http://localhost:8000' sets a default base URL for Axios requests. Axios is a popular JavaScript library for making HTTP requests, and setting a default base URL allows you to provide a consistent base URL for all requests made with Axios in your application.
In your case, if you include this line in your App.jsx file, it will set the base URL for Axios to 'http://localhost:8000'. Now, whenever you make a request using Axios without specifying a full URL, it will prepend this base URL to the relative URL provided in the request.


--res.cookie()
const express = require('express');
const app = express();

app.get('/set-cookie', (req, res) => {
  // Set a cookie named 'myCookie' with the value 'Hello, World!'
  res.cookie('myCookie', 'Hello, World!');

  // Send a response
  res.send('Cookie set!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
In this example, when a user accesses the '/set-cookie' route, the server sets a cookie named 'myCookie' with the value 'Hello, World!' in the HTTP response. The cookie will then be stored in the user's browser and sent back with subsequent requests to the server.

Keep in mind that this is a simplified example, and the actual use of res.cookie() may involve additional options such as setting expiration times, domain, path, and other cookie attributes.

--!! (double negation)
what does this mean

!!user
The expression !!user is a concise way to convert the value of the variable user into a boolean. It essentially performs a double negation.

Here's how it works:
The first ! (logical NOT) negates the truthiness of the value. If user is a falsy value (like null, undefined, 0, false, or an empty string), !user will be true. If user is a truthy value, !user will be false.

The second ! negates again. So, if !!user started as a truthy value, it remains true. If !!user started as a falsy value, it becomes false.

axios.defaults.withCredentials = true; //to enable cookies


--to read cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());


--- <button className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photos</button>

in this example if we use Add Photos normally then it would break and get into the next Line or we can say Add & button comes one below the other

but as we use Add&nbsp;Photos 
there is no breaking between the words and it gets to line 
(called as no breaking space): nbsp;

---npm install image-downloader
With the help of this library in react if we want to upload an image by any link, the link of that image gets stored in our upload directory in the backend.

---console.log({__dirname});

this way we will get the full path to the directory