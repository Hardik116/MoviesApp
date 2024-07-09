import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Detailitem from '../Detailitem';
import Actor from '../Actor';
import Movrev from '../Movrev';
import Tvsim from './Tvsim';

function Tvdetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [res, setAdditionalData] = useState(null);
  const [rev, setrev] = useState(null);

  useEffect(() => {
    // Fetch data and set states as before
    const fetchrevData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=972bf2f0b5a2dba4a5df2e4153bd68ec`);
        const result = await response.json();
        setrev(result);
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };
    fetchrevData();

    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=972bf2f0b5a2dba4a5df2e4153bd68ec`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const fetchAdditionalData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=972bf2f0b5a2dba4a5df2e4153bd68ec`);
        const result = await response.json();
        setAdditionalData(result);
      } catch (error) {
        console.error('Error fetching additional data:', error);
      }
    };
    fetchAdditionalData();

    // Scroll to the top when the component is mounted or when id changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [id]);

  const myurl = `https://api.themoviedb.org/3/tv/${id}/similar?api_key=972bf2f0b5a2dba4a5df2e4153bd68ec&vote_count>10`;

  return (
    <div className='container my-5'>
      {data && (
        <div style={{ backgroundColor: "#2f302f", padding: '40px', boxShadow: '0 0 20px 20px rgba(0, 0, 0, 0.3)', marginTop: '80px' }}>
          <Detailitem
            title={data.name}
            imgurl={data.backdrop_path}
            desc={data.overview}
            runtime={data.runtime}
            lang={data.spoken_languages[0].name}
            rating={data.vote_average}
            genre={data.genres.map(genre => genre.name).join(' , ')}
          />
        </div>
      )}

      <div className="container my-5" style={{ backgroundColor: "#2f302f", padding: '40px', boxShadow: '0 0 20px 20px rgba(0, 0, 0, 0.3)' }}>

        {res && res.cast&& (
          <div className="container">
            <h1 style={{ color: "#0ba3d6", fontWeight: 'bold' }}>Cast:</h1>
            <div className="row my-4">
              {res.cast.slice(0, 10).map((element) => (
                <div className='col-sm' key={element.id}>
                  <Actor
                    title={element.original_name}
                    imgurl={element.profile_path}
                    role={element.character}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {rev && rev.results&& (
        <div className="container my-5" style={{ backgroundColor: "#2f302f", padding: '40px', boxShadow: '0 0 20px 20px rgba(0, 0, 0, 0.3)' }}>
          <h2 style={{ color: '#0ba3d6' }}>Reviews</h2>
          {rev.results.map((element) => (
            <div className='col-sm' key={element.id}>
              <Movrev
                author={element.author}
                date={element.updated_at.slice(0, 10)}
                content={element.content}
              />
            </div>
          ))}
        </div>
      )}
      <div className="container my-5" style={{ backgroundColor: "#2f302f", padding: '40px', boxShadow: '0 0 20px 20px rgba(0, 0, 0, 0.3)' }}>
        <h2 style={{ color: '#0ba3d6' }}>Similar Movies</h2>
        <Tvsim
          url={myurl}
          resultsPerPage={4}
        />
      </div>
    </div>
  );
}

export default Tvdetail;
