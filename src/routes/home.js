import train from "../images/train.svg";
import tram from "../images/tram.svg";

const Home = () => {
  return (
    <div className="App">
      <div className="banner">
        <h2 className="title">Ippon PTV TV App</h2>
      </div>
      <div className="selector-container">
        <div className="selector">
          <a href="/trains">
            <img src={train} alt="Trains" height="200px" />
          </a>
          <br />
          Trains
        </div>
        <div className="selector">
          <a href="/trams">
            <img src={tram} alt="Trams" height="200px" />
          </a>
          <br />
          Trams
        </div>
      </div>
    </div>
  );
};

export default Home;
