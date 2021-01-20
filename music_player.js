class Track{
	constructor(name, artist, source, image_path){
		this.name = name;
		this.artist = artist;
		this.source = source;
		this.image_path = image_path;
	}
}

class MusicPlayList{
  // track_list requires obj: name, artist, source, image
  // music_list_container requires a html div element.
  constructor(tracks, music_list_container_dv){
    this.track_list = tracks;
    this.mlc_div = music_list_container_dv;
  }

  __associateDivElementForTheTrack__(track, index){
    let div_elm = document.createElement('div');
    div_elm.id = index;
    div_elm.innerText = track.artist+" - "+track.name;
    return div_elm;
  }

}


class MusicPlayer{
  constructor(track_name_div, track_artist_div, track_art)
  {
	}
}



