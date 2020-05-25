import React from 'react';

function Release(props) {

   console.log(props.releaseData)

  //Render additional release information on the page with proper error handeling

  return (

    <div>
      <button onClick={() => props.showRelease(props.releaseId)}>More details</button>
      {props.loader && props.loaderId === props.releaseId && (
        <section>
          <p>Loading...</p>
        </section>
      )}
      {props.error && props.errorId === props.releaseId && (
        <section>
          <p>Something went wrong...</p>
        </section>
      )}
      {props.releaseId === props.releaseData.id && (
        <section>
        {props.realeaseData !== [] && (
          <section>
            <h3>{props.releaseData.title}</h3>
            {props.releaseData.styles && (
              <ul>
                <h4>Styles</h4>
              {props.releaseData.styles.map((style, index) =>
                <li key={index}>{style}</li>
              )}
              </ul>
            )}
            {props.releaseData.tracklist && (
              <ul>
                <h4>Tracklist</h4>
                {props.releaseData.tracklist.map((track) =>
                  <li key={track.position}>
                    <span>{track.position}</span>
                    <span>{track.title}</span>
                    <span>{track.duration}</span>
                  </li>
             )}
              </ul>
            )}
            <a href={props.releaseData.uri}>See more on discogs</a>
          </section>
        )}
        </section>
      )}
    </div>
  )
}

export default Release
