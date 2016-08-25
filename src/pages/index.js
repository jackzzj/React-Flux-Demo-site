import React from 'react';
import ImageSlide from '../components/image-slide'
import OriginSelector from '../components/origin-selector'
import CoffeeBox from '../components/coffee-box'

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 lead">
            <h1>Freshly Roasted Coffee Beans</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <p>
              It all started in a digital circuits class. It was 1996. Phil and I were both at the University of Calgary studying to become engineers. As fate would have it, we were paired as lab partners. I’d like to say there was a thunderbolt moment where we both saw our futures unfold in front of us, but it was substantially less monumental than that. We worked well together, largely because we’re both perfectionists. I never had to convince Phil to stay up late to keep working on a project and he never had to convince me to stay up even later. During our time as lab partners we became friends. We were odd ducks in the world of engineering because while most of our cohorts feasted on pizza and beer, even as scruffy students both Phil and I had a taste for the finer things and bonded over a shared love of fine food and wine.
            </p>
          </div>
        </div>

        <ImageSlide></ImageSlide>

        <div id="main" className="row">
          <div id="origin" className="col-md-3 col-xs-12">

            <OriginSelector></OriginSelector>

          </div>
          <div className="col-md-8 col-md-offset-1 col-xs-12">

            <CoffeeBox></CoffeeBox>

          </div>
        </div>
      </div>
    )
  }
}
