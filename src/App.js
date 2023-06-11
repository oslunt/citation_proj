import './App.css';
import { useEffect, useState } from 'react';

const BASE_URL = 'https://scriptures.byu.edu/citation_index/citation_ajax/Any/1830/2023/all/s/f';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL + '?verses');
      // const jsonData = await response.json();
      const html = await response.text();
      setData(html);
    } catch(error) {
      console.error("Error fetching data", error);
    }
  };

  window.getSci = async (book, chapter, verse) => {
    try {
      if(book !== undefined && book !== '0') {
        let url = BASE_URL + `/${book}`;
        if (chapter !== undefined) {
          url += `/${chapter}`;
        }
        url += `?verses=`;
        if(verse !== undefined) {
          url += verse;
        }
        const response = await fetch(url);
        const html = await response.text();
        setData(html);
      } else {
        fetchData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  window.getFilter = async (book, chapter, verse) => {
    try {
      let url = BASE_URL + book;
      if (chapter !== undefined) {
        url += `/${chapter}`;
      }
      url += `?verses=`;
      if(verse !== undefined) {
        url += verse;
      }
      const response = await fetch(
        url
      );
      const html = await response.text();
      setData(html);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  window.getContents = async () => { fetchData() };
  window.getSpeaker = async () => { fetchData() };
  window.getSearch = async () => { fetchData() };

  window.watchTalk = (number, link) => {
    window.open(link, '_blank');
  }
  window.listenTalk = (number, link) => {
    window.open(link, '_blank');
  }
  window.getTalk = async () => { fetchData() };

  return (
    <div className="App">
      {data.length > 0 ? (
        <div dangerouslySetInnerHTML={{ __html: data}}></div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
