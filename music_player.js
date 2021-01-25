// A single musical track type.
class MusicalTrack{
	constructor(name, artist, source, image_source){
		this.name = name;
		this.artist = artist;
		this.source = source;
		this.image_source = image_source;
	}

	_identifier(){
		return "MusicalTrack:: name: "+this.name+", source: "+this.source;
	}
	_not_playable(self){
		console.log(self._identifier()+" -> is not playable!");
		self.playable = false;
	}
	_playable(self){
		console.log(self._identifier()+" -> is playable!");
		self.playable = true;
	}
	_paused(self){
		console.log("Paused --> "+self._identifier());
	}
	_playing(self){
		console.log("Playing --> "+self._identifier());
	}

	initializeAsPlayable(volume=0.6){
		this.audio_element = new Audio()
		this.audio_element.autoplay = false;
		this.class_name = [Date.now().toString(), this.name, this.artist].join("_");
		this.audio_element.className = this.class_name;
		this.audio_element.src = this.source;
		this.playable = false;
		this.audio_element.onerror = ()=>{this._not_playable(this);};
		this.audio_element.oncanplay = ()=>{this._playable(this);};
		this.duration = this.audio_element.duration;
		this.audio_element.volume = volume;
		return this.playable;
	}

	reset(volume=0.6){
		if(this.playable==true){
			this.audio_element.volume = volume;
			this.audio_element.currentTime = 0;
		}
		else
			this._not_playable(this);
	}

	play(){
		if(this.playable==true){
			this.audio_element.play();
			this._playing(this);
		}
		else
			this._not_playable(this);
	}

	pause(){
		if(this.playable==true){
			this.audio_element.pause();
			this._paused(this);
		}
		else
			this._not_playable(this);
	}

	seekAt(time){
		if(this.playable==true){
			if(time > this.duration || time < 0)
				console.log(this._identifier()+" --> seeking time out of duration");
			else
				this.audio_element.currentTime = time;
		}
		else
			this._not_playable(this);
	}

	setVolume(volume=60){
		if(this.playable==true){
			this.audio_element.volume = volume;
		}
		else
			this._not_playable();
	}

}

class MusicalTrackHTML{
	constructor(name_div, artist_div, art_div, seek_slider_input, current_time_div, duration_div)
	{
		this.name = name_div;
		this.artist = artist_div;
		this.art = art_div;
		this.seek_slider = seek_slider_input;
		this.current_time = current_time_div;
		this.duration = total_duration_div;
	}

	resetValues(){
		this.name.innerHTML = "";
		this.artist.innerHTML = "";
		this.art.style.backgroundImage = "url()";
		this.current_time.innerHTML = "00:00";
		this.seek_slider.value = 0;
		this.duration.innerHTML = "00:00";
	}

	setValuesFor(musical_track){

	}
}
