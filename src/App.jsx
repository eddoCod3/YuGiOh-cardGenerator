import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import starTemplate from "./startYu.png";
import "./App.css";
import FetchApi from "./components/FetchApi";
import wordArray from "./components/wordArray";
import horribleDescriptions from "./components/horribleDescriptions";

function App() {
  const [theme, setTheme] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [numberStars, setNumberStars] = useState(0);
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [colorBG, setColorBG] = useState("");
  const [starsDivs, setStarsDivs] = useState([]);
  const [cardType, setCartType] = useState("");


  useEffect(()=>{
    if(window.matchMedia("(prefers-color-scheme: dark)").matches){
      setTheme("dark");
    }else{
      setTheme("light");
    }
  },[])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleSwitchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const newStarDivs = [];
    for (let i = 0; i < numberStars; i++) {
      newStarDivs.push(
        <div key={i} className="start-dummy">
          <img src={starTemplate} alt="Yu-gi-oH-star" />
        </div>
      );
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
  };

  const handleExportImage = () => {
    html2canvas(document.querySelector("#main-card")).then((canvas) => {
      let img = canvas.toDataURL("image/jpeg");
      let link = document.createElement("a");
      link.download = "card.jpg"; // Change the file extension to .jpg
      link.href = img;
      link.click();
    });
  };

  const generateRandomCard = () => {
    let imageCard = document.getElementById("main-Image");
    let cardTitle = document.getElementById("main-title");
    let cardDescritption = document.getElementById("main-description");
    let attackStat = document.getElementById("main-attack").value;
    let defenseStat = document.getElementById("main-defense").value;

    attackStat, (defenseStat = Math.floor(Math.random() * 10));
    imageCard.src = "https://baconmockup.com/350/350/";
    cardTitle.textContent =
      wordArray[Math.floor(Math.random() * wordArray.length)];
    cardDescritption.textContent =
      horribleDescriptions[
        Math.floor(Math.random() * horribleDescriptions.length)
      ];
  };

  return (
    <>
      <main className="container " > {/* h-screen w-screen   bg-gray-500 dark:bg-slate-800 */}
        <div className="container-data">
          <button
            // onClick={handleSwitchTheme}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            dark mode
          </button>
          <input
            type="text"
            onChange={handleTitle}
            placeholder="Enter new title"
            className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <textarea
            onChange={handleDescription}
            placeholder="Enter new description"
            className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            min={0}
            max={10}
            type="number"
            onChange={handleNumberOfStars}
            placeholder="set number of stars"
            className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            type="file"
            onChange={onImageChange}
            id="image-file"
            className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            id="main-attack"
            type="number"
            placeholder="Enter  attack number"
            onChange={handleAttack}
            min={0}
            className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            id="main-defense"
            min={0}
            type="number"
            placeholder="Enter  defense number"
            onChange={handleDefense}
            className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <input
            type="text"
            onChange={handleSetCardType}
            className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            type="color"
            onChange={handleColor}
            className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <button
            onClick={handleExportImage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Export
          </button>
          <button
            onClick={generateRandomCard}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate
          </button>
          <FetchApi />
        </div>

        <section
          id="main-card"
          className="container-card"
          style={{ backgroundColor: colorBG, border: "10px solid black" }}
        >
          <div className="container-card-background">
            <h2 className="title  uppercase font-bold text-2xl" id="main-title">
              {title}
            </h2>

            <div className="container-stars">{starsDivs}</div>

            <img src={image} alt="" id="main-Image" className="image-display" />
            <div className="container-description">
              <p>[{cardType}]</p>
              <p id="main-description" className="description">
                {description}
              </p>
              <hr className="line" />
              <div className="number-stats">
                <span>ATK/{attack}</span> <span>DEF/{defense}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
