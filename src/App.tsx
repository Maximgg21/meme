import {useState} from "react"

function App() {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [show, setShow] = useState(false);
  const [imageNotChosen, setImageNotChosen] = useState(false);
  const [redColor, setRedColor] = useState("hsl(0, 100%, 90%)")
  const [sosal, setSosal] = useState(false);

  function changeLightness() {
    let lightness = 90;
    
    const interval = setInterval(() => {
      if (lightness > 5) {
        lightness -= 2;
        setRedColor(`hsl(0, 100%, ${lightness}%)`);
      } else {
        clearInterval(interval);
      }
    }, 100)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(undefined);
    }
  };

  function playAudio() {
    const audio = new Audio("src/assets/eddie-cayer-it-2017-pennywise-laugh.mp3");
    audio.play();
  }

  function startPerfomace() {
    setImageNotChosen(true);

    if (preview) {
      setImageNotChosen(false);
      setShow(true);

      setTimeout(() => {
        playAudio();
        changeLightness();
      }, 3500);

      setTimeout(() => {
        setSosal(true);
      }, 9000) 
    }
  }

  return (
    <div className="min-h-full py-10" style={{backgroundColor: redColor}}>
      <div className="w-4/5 mx-auto">
        <div className="flex flex-col items-start">
          <div className={`text-red-800 ${sosal ? "text-5xl tracking-[30px]" : "text-2xl"}`}>{sosal ? "Сосал?" : "Выбери свою фотку:"}</div>
          {!sosal ? <input className="py-3 file:py-3 file:px-4 file:rounded-full file:bg-amber-100 file:mr-4 " onChange={handleFileChange} type="file" accept="image/png, image/jpeg" /> : ""}
          {!sosal ? <button className="text-2xl bg-fuchsia-600 py-3 px-5 rounded-full" onClick={startPerfomace}>Начать представление!!!</button> : ""}
        </div>
        <div className="mt-5">
          {imageNotChosen && <div className="text-2xl text-red-800">Фотку сначала выбери!!!</div>}
          {show && 
          <div className="relative h-[570px] w-full">
            <img className="absolute animate-[spin_0.8s_linear_5]" src={preview}/>
            <img className="absolute animate-appear opacity-0" src="src\assets\HD-wallpaper-it-2017-clown-clowns-horror-king-movie-scary-thumbnail.jpg"/>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App
