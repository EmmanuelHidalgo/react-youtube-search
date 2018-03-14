import _ from 'lodash';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar'
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDjXrzUg0_luonjNBZ3pvj52Mf3CSrSUJU';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('migate no gokui')
       
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({videos: videos, selectedVideo: videos[0]})
        });
    }

    //the data that I pass to a component as a param it is calls props
    //in a class based component just like here, the props are avaible throught all the class but in functional components
    //just inside the functions itself
    render() {
        //basically debounce executes the function after 300 milisecs
        const videoSearch = _.debounce((term)=> {
            this.videoSearch(term)
        },300);
    
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}
                 />
            </div>
        );
    }
}

ReactDom.render(<App />, document.querySelector('.container'));