// A single musical track type.
class MusicalTrack{
	constructor(name, artist, source, image_source){
		this.name = name;
		this.artist = artist;
		this.source = source;
		this.image_source = image_source;
		this.playing = false;
	}

	_identifier(){
		return "MusicalTrack:: name: "+this.name+", source: "+this.source;
	}
	_not_playable(self){
		console.log(self._identifier()+" -> is not playable!");
		self.playable = false;
		self.playing = false;
	}
	_playable(self){
		console.log(self._identifier()+" -> is playable!");
	}
	_paused(self){
		console.log("Paused --> "+self._identifier());
	}
	_playing(self){
		console.log("Playing --> "+self._identifier());
	}

	__duration(){
		return this.audio_element.duration;
	}
	__currentTime(){
		return this.audio_element.currentTime;
	}
	// timeoutUntilPlayable(timeout){
	// 	let runner = ()=>{
	// 			while(!this.playable){
	// 				console.log("waiting for ", this, " to get playable for ", timeout, "ms");
	// 			}
	// 	}
	// 	setTimeout(runner, timeout);
	// }
	initializeAsPlayable(volume=0.6){
		this.audio_element = new Audio()
		this.audio_element.autoplay = false;
		this.class_name = [Date.now().toString(), this.name, this.artist].join("_");
		this.audio_element.className = this.class_name;
		this.audio_element.src = this.source;
		this.audio_element.load();
		this.playable = false;

		this.audio_element.onerror = ()=>{this._not_playable(this);};
		this.audio_element.oncanplay = ()=>{
			console.log("audio.oncanplay: ", Date());
			this.playable=true;
			this._playable(this);
		}

		this.is_playing = false;
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
		if(this.playable==true && this.playing==false){
			this.audio_element.play();
			this.playing = true;
			this._playing(this);
		}
		else
			this._not_playable(this);
	}

	pause(){
		if(this.playable==true && this.playing==true){
			this.audio_element.pause();
			this.playing = false;
			this._paused(this);
		}
		else
			this._not_playable(this);
	}

	seekAt(time){
		if(this.playable==true){
			if(time > this.__duration() || time < 0)
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
	constructor(name_div, artist_div, art_div, playpause_btn, current_time_div, seek_slider_input, duration_div, musical_track=null)
	{
		this.name = name_div;
		this.artist = artist_div;
		this.art = art_div;
		this.playpause = playpause_btn;
		this.playpause.onclick = ()=>{this._playpause_btn_controller();};

		this.seek_slider = seek_slider_input;
		this.current_time = current_time_div;
		this.duration = duration_div;
		this.musical_track = musical_track;
		if(musical_track!=null)
			this.initializeForPlay();
		this.setPrimitiveValues();
		this.setSeekUpdateInterval();
	}

	_convert_to_seek_slider_value(current_time, total_duration){
		return (current_time/total_duration)*100;
	}
	_get_representative_time_mark(time){
		let representer = (unit) => {return (unit>=0&&unit<=9) ? "0"+String(unit) : String(unit);};
		let minutes = Math.floor(time/60);
		let seconds = Math.floor(time%60);
		minutes = representer(minutes);
		seconds = representer(seconds);
		return minutes+":"+seconds;
	}
	_playpause_btn_controller(){
		if(this.musical_track == null)
			return;
		if(this.musical_track.playing==true)
			this.musical_track.pause();
		else
			this.musical_track.play();
	}
	setSeekUpdateInterval(){
		this.ui_id = setInterval(
				()=>{this.updateSeekSlider();},
		1000);
		return this.ui_id;
	}
	clearSeekUpdateInterval(){
		this.ui_id = clearInterval(this.ui_id);
		return this.ui_id;
	}
	setMusicalTrack(musical_track=null){
		if(musical_track) console.log("null");
		this.musical_track = musical_track;
		this.initializeForPlay();
	}

	setPrimitiveValues(){
		this.name.innerHTML = "";
		this.artist.innerHTML = "";
		this.art.style.backgroundImage = "url()";
		this.current_time.innerHTML = "00:00";
		this.seek_slider.value = 0;
		this.duration.innerHTML = "00:00";
	}

	initializeForPlay(){
		let musical_track = this.musical_track;
		musical_track.reset();
		this.name.innerHTML = "<b>"+musical_track.name+"</b>";
		this.artist.innerHTML = musical_track.artist;
		this.art.style.backgroundImage = "url("+musical_track.image_source+")";
		this.updateSeekSlider(musical_track);
	}

	updateSeekSlider(){
		let musical_track = this.musical_track;
		if(musical_track==null) return;

		this.current_time.innerHTML = this._get_representative_time_mark(musical_track.__currentTime());
		this.seek_slider.value = this._convert_to_seek_slider_value(musical_track.__currentTime(), musical_track.__duration());
		this.duration.innerHTML = this._get_representative_time_mark(musical_track.__duration());
	}
}
