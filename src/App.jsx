import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "weather-icons/css/weather-icons.css"
import Weather from './components/layout/Weather'
import Search from './components/layout/Seacrh'

const API_KEY = "33ce53fdc7f487e48f74035dd67eeb33"


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      city: null,
      country: null,
      temp: null,
      temp_max: null,
      temp_min: null,
      icon: null,
      main: null,
      description: "",
      dt: null,
      humidity: null,
      speed: "",
      clouds: ""
    }

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  convCelcius(temp){
    const cell = Math.floor(temp - 273.15)
    return cell
  }

  convHour(hora, type){
    var day = new Date(hora * 1000);
    if (type == "long") {
        let options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return day.toLocaleString("pt-br", options); // Friday, January 15, 2021
    } else {
        return(
          <p className="captilize">
            {
              day.toLocaleString("pt-br", { weekday: "long" }) // Friday
            }
          </p>
        )
    }
  }


get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  getWeather = async (e) =>{

    e.preventDefault()
    const city = e.target.elements.city.value

    if(city){
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&appid=${API_KEY}`)

      const response = await api_call.json()
  
      this.setState({
        city: `${response.name} - ${response.sys.country}`,
        temp: this.convCelcius(response.main.temp),
        temp_min: this.convCelcius(response.main.temp_min),
        temp_max: this.convCelcius(response.main.temp_max),
        description: response.weather[0].description, 
        dt: this.convHour(response.dt),
        humidity: response.main.humidity,
        speed: response.wind.speed,
        clouds: response.clouds.all
      })
  
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id)
      console.log(response)
    }else{
      this.setState({error:true})
    }
    
  }

  render() {
    return (
      <div>
        <Search
        loadWeather={this.getWeather}
        />
        <Weather
        city={this.state.city}
        country={this.state.country}
        temp={this.state.temp}
        tempMin={this.state.temp_min}
        tempMax={this.state.temp_max}
        description={this.state.description}
        weatherIcon={this.state.icon}
        dt={this.state.dt}
        humidity={this.state.humidity}
        speed={this.state.speed}
        clouds={this.state.clouds}
        />
      </div>
     )
  }
}

export default App
