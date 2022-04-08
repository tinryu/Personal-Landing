import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Player.css';
import database from '../../firebase/firebase';
import PlayLists from '../Playlists/PlayLists';

const apiKey = process.env.REACT_APP_API_KEY_YT;
var repeat = document.getElementsByClassName('btn-repeat')[0];
var rand;
var repeatStatus = 0;

class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.changeStatusPlay = this.changeStatusPlay.bind(this);
		this.prevSong = this.prevSong.bind(this);
		this.nextSong = this.nextSong.bind(this);
		this.openList = this.openList.bind(this);
		this.openPlaylist = this.openPlaylist.bind(this);
		this.changeVolume = this.changeVolume.bind(this);
	}

	get initialState() {
		return {
			listVid: [],
			isToggle: false,
			isTogglePlay: false,
			title: '',
			imageUrl: '',
			listIdNew: this.props.stringId,
			isToggleList: false,
			volume: 80,
		};
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.stringId !== prevState.listIdNew){
		  	return { listIdNew: nextProps.stringId};
	   	}
		return null;
	}
	async componentDidUpdate(prevProps, prevState) {
		// if(prevState.listIdNew !== this.state.listIdNew){
		// 	this.setState({ 
		// 		listVid: [],
		// 		listIdNew: this.state.listIdNew
		// 	});

		// 	await this.changePlaylistId(this.state.listIdNew);
		// }	
	}
	componentDidMount = () => {
		this.getData()
	}
	componentWillUnmount = () => {
		// clearInterval(this.auto);
	}

	getData = async() => {
		await this.getPlayListItems("RDq6YmhSgPgbk").then(data => {
			if(data && data.length > 0) {
				data.forEach(item => {
					item.items.forEach(i => this.state.listVid.push({title: i.snippet.title, idVid: i.snippet.resourceId.videoId}));
				})
				rand = Math.floor(Math.random()*this.state.listVid.length);
				this.checkPrivate();
				// On mount, check to see if the API script is already loaded
				if (!window.YT) { // If not, load the script asynchronously
					const tag = document.createElement('script');
					tag.src = 'https://www.youtube.com/iframe_api';
					// onYouTubeIframeAPIReady will load the video after the script is loaded
					window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
					const firstScriptTag = document.getElementsByTagName('script')[0];
					firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
				} else { // If script is already there, load the video directly
					this.onYouTubeIframeAPIReady();
				}
			}
		})
    }

	openList = () => {
		if(this.state.isToggleList) {
			this.setState({
				isToggleList: false
			})
		} else {
			this.setState({
				isToggleList: true
			})
		}
	}
	openSongs = () => {
		if(this.state.isToggleSong) {
			this.setState({
				isToggleSong: false
			})
		} else {
			this.setState({
				isToggleSong: true
			})
		}
	}
	openPlaylist = (obj) => {
		if(obj && obj.isUpdate === 0){
			this.changePlaylistId(obj.idList);
		}
		else if(obj && obj.isUpdate === 1){
			let objRef = database.ref('lists/'+obj.idList);
			objRef.remove();
		}
	}
    
	getPlayListItems = async playlistID => {
		var token;
		var resultArr = [];
		await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
			params: {
				part: 'id,snippet',
				maxResults: 50,
				playlistId: playlistID,
				key: apiKey
			}
		}).then(function (response) {
			//Lay NextPage Token
			token = response.data.nextPageToken;
			resultArr.push(response.data);
		}).catch(function(error) {
			console.log('token', error);
		})
		
		if(token) {
			let result = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
				params: {
					part: 'id,snippet',
					maxResults: 50,
					playlistId: playlistID,
					key: apiKey,
					pageToken: token
				}
			}).catch(function(error) {
				console.log('playlist', error);
			});
			if(result && result.data && result.data.nextPageToken){
				token = result.data.nextPageToken;
				resultArr.push(result.data);
			}
		}	
		return resultArr;
	};

	onYouTubeIframeAPIReady = () => {
		this.player = new window.YT.Player('player', {
			height: '0',
			width: '0',
			videoId: this.state.listVid[rand].idVid,
			playerVars: {
			  'playsinline': 1,
			  'controls': 0
			},
			events: {
				onReady: this.onPlayerReady,
			  	onStateChange: this.onPlayerStateChange
			}
		});
	}
	
	onPlayerReady = event => {
		if(event.target) {
			this.player = event.target;
			event.target.setPlaybackQuality("small");
			this.setState({
				isToggle: true,
				isTogglePlay: false,
				title: this.state.listVid[rand] && this.state.listVid[rand].title ? this.state.listVid[rand].title : 'No Name',
				imageUrl: this.state.listVid[rand] && this.state.listVid[rand].idVid ? `https://img.youtube.com/vi/`+this.state.listVid[rand].idVid+`/0.jpg` : ''
			})
			if(event.target.getPlayerState() !== 5) {
				this.setState({
					isToggle: false,
					isTogglePlay: true
				})
			}
		} else {
			console.log('error network waiting for refesh brower');
		}
	}

	onPlayerStateChange = async event => {
		if (event.data === 0) {
			this.playButton(false); 
			this.setState({
				isTogglePlay: false
			})
		}

		if(event.target.getPlayerState() === 0) {
			await this.nextVideo();
			this.playButton(true);
		}
	}

	changeStatusPlay = () => {
		if (this.player.getPlayerState() === 1 || this.player.getPlayerState() === 3) {
			this.pauseVideo();
		} else if (this.player.getPlayerState() !== 0) {
			this.playVideo();
		}
	}

	playButton = play => {		
		if(play) {
			this.setState({
				isToggle: true,
				isTogglePlay: true
			})
		} else {
			this.setState({
				isToggle: false,
				isTogglePlay: false
			})
		}
	}

	playVideo() {
		try{
			this.player.playVideo();
			this.setState({
				isTogglePlay: true,
			})
		}
		catch(e) {
			console.log(e);
		}
	}

	pauseVideo() {
		this.player.pauseVideo();
		this.setState({
			isTogglePlay: false
		})
	}

	stopVideo() {
		this.player.stopVideo();
	}
	//prev song
	prevSong() {
		if (repeatStatus === 1) {
			repeat.style.opacity = "0.3";
			repeatStatus = 0;
		}
		this.playButton(false);
		this.stopVideo();
		if (rand - 1 < 0) {
			rand = this.state.listVid.length - 1;
		} else {
			rand -= 1;
		}
		this.checkPrivateBack();
		this.player.loadVideoById({videoId:this.state.listVid[rand].idVid});
		this.setState({
			title: this.state.listVid[rand].title,
			imageUrl: `https://img.youtube.com/vi/`+this.state.listVid[rand].idVid+`/0.jpg`
		})
		this.playButton(true);			
	}
	//next song
	nextSong() {
		if (repeatStatus === 1) {
			repeat.style.opacity = "0.3";
			repeatStatus = 0;
		}
		this.playButton(false);
		this.stopVideo();
		if (rand + 1 === this.state.listVid.length) {
			rand = 0;
		} else {
			rand += 1;
		}
		this.checkPrivate();
		this.player.loadVideoById({videoId:this.state.listVid[rand].idVid});
		this.setState({
			title: this.state.listVid[rand].title,
			imageUrl: `https://img.youtube.com/vi/`+this.state.listVid[rand].idVid+`/0.jpg`
		})
		this.playButton(true);
	
	}
	//next video
	nextVideo() {
		if (repeatStatus === 1) {
			rand = Math.round(Math.random()*this.state.listVid.length);
			this.player.loadVideoById({videoId:this.state.listVid[rand].idVid});
		} else {
			rand = Math.round(Math.random()*this.state.listVid.length);
			console.log('rand next', rand);
			this.checkPrivate();
			this.player.loadVideoById({videoId:this.state.listVid[rand].idVid});
			this.setState({
				title: this.state.listVid[rand].title,
				imageUrl: `https://img.youtube.com/vi/`+this.state.listVid[rand].idVid+`/0.jpg`
			})

		}
	}

	//repeat
	repeatVideo () {
		if (repeatStatus === 0) {
			repeat.style.opacity = "0.8";
			repeatStatus = 1;
		} else {
			repeat.style.opacity = "0.3";
			repeatStatus = 0;
		}
	}
	playSongOnList = (rand, id) => {
		this.player.loadVideoById({videoId: id});
		this.setState({
			title: this.state.listVid[rand].title,
			imageUrl: `https://img.youtube.com/vi/`+this.state.listVid[rand].idVid+`/0.jpg`
		})
		this.playButton(true);
		this.openSongs(false);
	}
	changePlaylistId = async newId => {
		if (newId === "") {
			return;
		}
		this.openList();
		this.playButton(false);
		this.setState({
			listVid: []
		})
		await this.getPlayListItems(newId)
		.then(async data => {
			if(data && data.length > 0) {
				data.forEach(item => {
					item.items.forEach(i => this.state.listVid.push({title: i.snippet.title, idVid: i.snippet.resourceId.videoId}));
				});
				
				if(this.state.listVid.length > 0) {
					rand = Math.floor(Math.random()*this.state.listVid.length);
					await this.checkPrivate();
					this.player.loadVideoById({videoId:this.state.listVid[rand].idVid});
					this.setState({
						title: this.state.listVid[rand] && this.state.listVid[rand].title ? this.state.listVid[rand].title : 'No Name',
						imageUrl: this.state.listVid[rand] && this.state.listVid[rand].idVid ? `https://img.youtube.com/vi/`+this.state.listVid[rand].idVid+`/0.jpg` : ''
					})
				}
			}
			else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Playlist not exist or problem network',
				})
			}
			this.playButton(true);
		});
	}
	checkPrivate() {
		// console.log('list', this.state.listVid);
		if(this.state.listVid) {
			if (this.state.listVid[rand].title === "Private video" || this.state.listVid[rand].title === "Deleted video") {
				if (rand === this.state.listVid.length - 1) {
					rand = 0;
				} else {
					rand += 1;
				}
				this.checkPrivate();
			}
		}
	}
	checkPrivateBack() {
		console.log('randback', rand);
		console.log('rand', this.state.listVid);
		if(this.state.listVid) {
			if (this.state.listVid[rand].title === "Private video" || this.state.listVid[rand].title === "Deleted video") {
				if (rand === 0) {
					rand = this.state.listVid.length - 1;
				} else {
					rand -= 1;
				}		
				this.checkPrivateBack();
			}
		}
		
	}
	changeVolume = event => {
		this.setState({volume: event.target.value});
		this.player.setVolume(this.state.volume);
	}

	render() {
		var divStyle = {
			backgroundImage: this.state.imageUrl !== '' ? 'url('+ this.state.imageUrl +')' : '',
			display: this.state.isToggleList ? 'none' : 'block',
			animation: this.state.isTogglePlay ? 'rotate-circle 10s linear infinite' : 'none'
		}
        return (
			<div className='radio'>
				<div className="player">
					<div id="player"></div>
					<div className="navBar">
						<img onClick={this.openSongs} src={this.state.isToggleSong ? process.env.PUBLIC_URL +"assets/icon/cancel.png" : process.env.PUBLIC_URL +"assets/icon/music.svg"} alt="open" id="open" title="music lists"/>
					</div>
					<div className="vinyl-player" style={{display: this.state.isToggleList ? 'none' : 'block'}}>
						<div className="medias" style={{display: this.state.isToggleSong ?  'none': 'block'}}>
							<div className="nametag" id="bgnametag" style={divStyle}></div>
							<img src={process.env.PUBLIC_URL +"assets/icon/kim.svg"} alt="" id="kim" style={{display: this.state.isToggleList ? 'none' : 'block'}}/>
							<img src={process.env.PUBLIC_URL +"assets/icon/circel.svg"} alt="" id="circel" style={{display: this.state.isToggleList ? 'none' : 'block'}}/>							
						</div>
					</div>
					<div className="songs" style={{display: this.state.isToggleSong ?  'block': 'none'}}>
						{/* <img onClick={this.openSongs} src={process.env.PUBLIC_URL +"assets/icon/cancel.png"} alt="open" id="close" title="close"/> */}
						<div className="containerSongs">
							{this.state.listVid.map((item, key) =>
								<div className="itemList" key={key}>
									<a href="#s" onClick={() => this.playSongOnList(key,item.idVid)}>{item.title}</a> 
								</div>
							)}
						</div>
					</div>
					<div className="feaList" style={{display: this.state.isToggleList ? 'block' : 'none'}}>
						<PlayLists openPlaylist={this.openPlaylist}/>
					</div>
					<div className="layer">
						<div className="prev">
							<button onClick={this.prevSong} className="btn-prev" aria-label="prev" style={{display: this.state.isToggle ? 'block' : 'none'}}><img src={process.env.PUBLIC_URL +"assets/icon/prev.svg"} alt=""/></button>
						</div>
						<div className="play">
							<button onClick={this.changeStatusPlay} id="btn" className={this.state.isTogglePlay ? 'pauseM' : 'playM'} aria-label="play" style={{display: this.state.isToggle ? 'block' : 'none'}}>
								<img src={this.state.isTogglePlay ? process.env.PUBLIC_URL +"assets/icon/pause.svg" : process.env.PUBLIC_URL +"assets/icon/play.svg"} alt="" id="icon"/>
							</button>
						</div>
						<div className="next">
							<button onClick={this.nextSong} className="btn-next" aria-label="next" style={{display: this.state.isToggle ? 'block' : 'none'}}><img src={process.env.PUBLIC_URL +"assets/icon/next.svg"} alt=""/></button>
						</div>
						{/* <div className="repeat">
							<button className="btn-repeat" aria-label="repeat" style={{display: this.state.isToggle ? 'block' : 'none'}}><img src={process.env.PUBLIC_URL +"assets/icon/repeat.svg"} alt=""/></button>
						</div> */}
						<div className="vol">
							<input onChange={this.changeVolume} type="range" id="volume" name="volume" value={this.state.volume} min="0" max="100" />
						</div>
					</div>
					<div className="title" id="title">{this.state.title}</div>
					<img onClick={this.openList} src={this.state.isToggleList ? process.env.PUBLIC_URL +"assets/icon/cancel.png" : process.env.PUBLIC_URL +"assets/icon/list-text.png"} alt="" id="btnList"/>
				</div>
				
				<i className="sign">made by TinTruong</i>
			</div>
			
        )
    }
}

export default Player;