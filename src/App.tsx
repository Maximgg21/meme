import {useState} from "react"
import audioFile from "./assets/eddie-cayer-it-2017-pennywise-laugh.mp3"
import imageFile from "./assets/HD-wallpaper-it-2017-clown-clowns-horror-king-movie-scary-thumbnail.jpg"

function App() {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [show, setShow] = useState(false);
  const [imageNotChosen, setImageNotChosen] = useState(false);
  const [redColor, setRedColor] = useState("hsl(0, 100%, 90%)")
  const [sosal, setSosal] = useState(false);

  const audio = new Audio(audioFile);
  audio.preload = "auto";

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

  function startPerfomace() {
    setImageNotChosen(true);

    if (preview) {
      setImageNotChosen(false);
      setShow(true);

      setTimeout(() => {
        audio.play();
        changeLightness();
      }, 4000);

      setTimeout(() => {
        setSosal(true);
      }, 9000) 
    }
  }

  return (
    <div className="min-h-full py-10 flex flex-col items-center" style={{backgroundColor: redColor}}>
      <div className="flex flex-col items-start">
        <div className={`${sosal ? "text-5xl tracking-[30px] pl-7 text-red-900" : "text-2xl text-[#2C0B0B]"}`}>{sosal ? "Сосал?" : "Выбери свою фотографию :"}</div>
        {!sosal ? <input className="py-3 file:py-3 file:px-4 file:rounded-full file:bg-[#41C227] file:mr-4 " onChange={handleFileChange} type="file" accept="image/png, image/jpeg" /> : ""}
        {!sosal ? <button className="text-2xl bg-fuchsia-900 py-3 px-5 rounded-full" onClick={startPerfomace}>Начать представление!!!</button> : ""}
      </div>
      {imageNotChosen && <div className="text-2xl text-[#2C0B0B]">Фотку сначала выбери 🤡</div>}
      {show && 
      <div className="mt-5 relative w-[338px] h-[601px]">
        <img className="absolute animate-[spin_0.8s_linear_5]" src={preview}/>
        <img className="absolute animate-appear opacity-0" src={imageFile}/>
      </div>
      }
    </div>
  )
}

export default App
