

//To properly retrieve weather data when the button is clicked, 
//the button needs to trigger a request to the / weather endpoint. 
//You can achieve this by using the fetch() API inside the React component's onClick handler.

//Create button that, when pressed, retrieves data//
//Show City: Weather

export default function RetrieveWeather({ data }) {
  return (
    <button onClick={app.get}>
      {data} {/* Render the value inside the button (either 'X', 'O', or null) */}
    </button>
  );
}


