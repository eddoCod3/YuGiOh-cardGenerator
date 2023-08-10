import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import starTemplate from "./startYu.png";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [numberStars, setNumberStars] = useState(0);
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [colorBG, setColorBG] = useState("");
  const [starsDivs, setStarsDivs] = useState([]);
  const [cardType, setCartType] = useState("");

  useEffect(() => {
    const newStarDivs = [];
    for (let i = 0; i < numberStars; i++) {
      newStarDivs.push(<div key={i} className="start-dummy">
        <img src={starTemplate} alt="Yu-gi-oH-star" />
      </div>);
    }
    setStarsDivs(newStarDivs);
  }, [numberStars]);

  const handleNumberOfStars = (e) => {
    setNumberStars(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleAttack = (e) => {
    setAttack(e.target.value);
  };
  const handleDefense = (e) => {
    setDefense(e.target.value);
  };

  const handleColor = (e) => {
    console.log(e.target.value);
    setColorBG(e.target.value);
  };

  const handleSetCardType = (e) => {
    setCartType(e.target.value);
  }

  const handleExportImage = () => {
    html2canvas(document.querySelector("#main-card")).then(canvas => {
      let img = canvas.toDataURL("image/jpeg");
      let link = document.createElement('a');
      link.download = 'card.jpg'; // Change the file extension to .jpg
      link.href = img;
      link.click();
  });
  }
  return (
    <>
      <main className="container">
        <div className="container-data">
          <input
            type="text"
            onChange={handleTitle}
            placeholder="Enter new title"
          />
          <textarea
            onChange={handleDescription}
            placeholder="Enter new description"
          />
          <input
          min={0}
            type="number"
            onChange={handleNumberOfStars}
            placeholder="set number of stars"
            max={10}
          />
          <input type="file" onChange={onImageChange} id="image-file" />
          <input
            type="number"
            placeholder="Enter  attack number"
            onChange={handleAttack}
            min={0}
          />
          <input
            min={0}
            type="number"
            placeholder="Enter  defense number"
            onChange={handleDefense}
          />

          <input type="text" onChange={handleSetCardType} />
          <input type="color" onChange={handleColor} />

          <button onClick={handleExportImage}>Export</button>
        </div>

        <section
        id="main-card"
          className="container-card"
          style={{ backgroundColor: colorBG, border: "10px solid black" }}
        >
          <div className="container-card-background">
          <h2 className="title">{title}</h2>
          

          <div className="container-stars">{starsDivs}</div>

          <img src={image} alt="" id="main-Image" className="image-display" />
          <div className="container-description">
            <p>[{cardType}]</p>
            <p className="description">{description}</p>
            <hr className="line" />
            <div className="number-stats">
              <span>ATK/{attack}</span>  <span>DEF/{defense}</span>
            </div>
          </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
