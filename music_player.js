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
  constructor(track_name_div, track_artist_div, track_art_div, seek_slider_input)
  {
		this.track_name_div = track_name_div;
		this.track_artist_div = track_artist_div;
		this.track_art_div = track_art_div;
		this.track_seek_slider_in = seek_slider_in;
		
		this.audio_elm = document.createElement('audio');
	}
	
	_initializeTrackDetails(track)
	{
		this.track_name_div.innerHTML = "<b>"+track.name+"</b";
		this.track_artist_div.innerHTML = track.artist;
		this.track_seek_slider_in.value = 0;
		this.is_playing = false;
	}
}



