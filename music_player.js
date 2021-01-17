class MusicPlayList{
  // track_list requires obj: name, artist, source, image
  // music_list_container requires a html div element.
  constructor(track_list, music_list_container_dv){
    this.track_list = track_list;
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
  constructor()
}
