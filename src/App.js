import './App.css';
import CircleComponent from './Components/Circle/circle'
import ImageComponent from './Components/Image/image'
import axios from "axios";
import { useState, useEffect } from "react";  
import Select from 'react-select';

function App() {
  const [arrimagesStories, setArrImagesStories] = useState([]);
  const [arrimages, setArrImages] = useState([]);
  const [arrtempimages, setArrTempImages] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDataStories() {
    await axios.get('https://api.thecatapi.com/v1/images/search/?limit=6').then((response) => {
      setArrImagesStories(response.data)
    });
  }
  async function fetchData() {
    await axios.get('https://api.thecatapi.com/v1/images/search/?limit=12&has_breeds=true').then((response) => {
      setArrImages(arrimages => [...arrimages, ...response.data])
      setArrTempImages(arrimages => [...arrimages, ...response.data])
    });
  }
  const filter = (value) => {
    const images = arrtempimages.filter((image) => (image?.breeds[0]?.name === value) );
    setArrImages(images, 'imagenes')
  }

  
  useEffect(() => {
    fetchData();
    fetchDataStories();
    window.addEventListener('scroll', function() {
      if ((window.innerHeight + window.scrollY) === document.body.offsetHeight) {
        fetchData();
      }
    });
  }, []);

  if (arrimages.length !== 0 && loading){
    let arr =  []
    for (let i = 0; i < arrimages?.length; i++) {
      if (arrimages[i]?.breeds[0]?.name){
        let object = {
          label: arrimages[i]?.breeds[0]?.name,
          value: arrimages[i]?.breeds[0]?.name
        }
        arr.push(object)
      }
    }
    setBreeds(arr);
    setLoading(false)
  }

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-orange-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg width="54" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M6.623 18.244l-2.285.728c-.63.194-.936-.751-.303-.954l2.284-.727c.635-.198.931.753.304.953zm-.291-1.718l-3.47-1c-.641-.183-.352-1.15.277-.961l3.471 1c.642.185.351 1.147-.278.961zm13.331 2.446l-2.285-.728c-.63-.201-.329-1.15.303-.953l2.284.727c.633.203.326 1.151-.302.954zm1.476-3.446l-3.471 1c-.632.185-.915-.777-.277-.961l3.471-1c.635-.185.913.779.277.961zm-4.639-3.526c-.551 0-1-.448-1-1s.449-1 1-1c.552 0 1 .448 1 1s-.448 1-1 1zm2-1c0-1.105-.896-2-2-2-1.103 0-2 .895-2 2 0 1.104.897 2 2 2 1.104 0 2-.896 2-2zm-11 1c-.551 0-1-.448-1-1s.449-1 1-1c.552 0 1 .448 1 1s-.448 1-1 1zm2-1c0-1.105-.896-2-2-2s-2 .895-2 2c0 1.104.896 2 2 2s2-.896 2-2zm5.956 7.35c-.547 1.215-2.47 1.831-3.456.543-.987 1.289-2.91.671-3.456-.543-.271-.6.64-1.014.912-.41.336.746 2.034 1.301 2.044-.797v-.504c-.615-.218-1.061-.798-1.061-1.313 0-.646.699-.936 1.561-.936.863 0 1.562.29 1.562.936 0 .515-.446 1.095-1.062 1.313v.504c.009 2.12 1.713 1.533 2.044.797.271-.602 1.184-.192.912.41zm-3.456 4.65c-7.093 0-11-3.351-11-9.435 0-3.774 1.563-8.027 4.419-12.072 1.746 1.658 2.505 2.723 3.958 4.91 2.418-.609 3.786-.361 5.251-.004 1.431-2.167 2.219-3.304 3.944-4.914 2.825 4.032 4.428 8.385 4.428 12.08 0 6.084-3.906 9.435-11 9.435zm6.728-23c-2.082 1.814-3.081 3.044-4.546 5.261-1.289-.316-3.281-.274-4.363 0-1.402-2.11-2.405-3.344-4.546-5.261-3.069 4.042-5.273 8.939-5.273 13.565 0 5.759 3.397 10.435 12 10.435 8.604 0 12-4.676 12-10.435 0-4.578-2.207-9.502-5.272-13.565z"/></svg>
          <span className="font-semibold text-xl tracking-tight">InstaCAT</span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
          </div>
          <div>
          <Select
            placeholder='Select breed'
            options={breeds}
            // eslint-disable-next-line no-sequences
            onChange={(e) => filter(e.value)}
          />
          </div>
        </div>
      </nav>
      <div className="grid grid-cols-2 sm:ml-1 sm:mr-1 sm:grid-cols-2 lg:grid-cols-6 md:grid-cols-6 gap-4 mt-4 md:mr-24 md:ml-24 lg:mr-64 lg:ml-64">
        {arrimagesStories.map((object, i) => <div className="grid place-items-center" key={i + 'a'} ><CircleComponent key={i + 'b'} item={object}/>Lorem Ipsum</div>)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ml-4 mr-4">
        {arrimages.map((object, i) => <div className="grid place-items-center" key={i + 'padre'}><ImageComponent item={object} key={i}/></div>)}
      </div>
    </>
  );
}

export default App;
