window.addEventListener('load', () => {
    
    let lat;
    let long;

    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureSection = document.querySelector('.temperature')
    let temperatureSpan = document.querySelector('.temperature span')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/5e3a501bf93d7fe96dafc3ffdca4875d/${lat},${long}`
            
            fetch(api)
                .then(reponse => reponse.json())
                .then(data => {
                
                    console.log(data)
                    const {temperature,  summary , icon} = data.currently

                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    
                    setIcons(icon, document.querySelector('.icon'))

                    //change temperature
                    let celsius = (temperature - 32) * (5 / 9)
                    temperatureSection.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent === 'F'){
                            temperatureSpan.textContent = 'C'
                            temperatureDegree.textContent = Math.floor(celsius);
                        }
                        else {
                            temperatureSpan.textContent = 'F'
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
            
        });
       
    }

    function setIcons(icon, iconID){

        const skycons = new Skycons({ color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase()
        skycons.play()
        return skycons.set(iconID,Skycons[currentIcon])
    }
});