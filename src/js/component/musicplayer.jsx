import { error } from "jquery";
import React, { useEffect, useState, Fragment } from "react";

const Base_URL = "https://assets.breatheco.de/apis/sound/";
//create your first component
const MusicPlayer = () => {
	const [songs, setSongs] = useState([]);

	const [listView, setListView] = useState("");
	const [myList, setMyList] = useState([]);
	//Fetch
	useEffect(() => {
		fetch(Base_URL.concat("songs"), {
			method: "GET",
			mode: "cors",
			redirect: "follow"
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("va mal");
				}
			})
			.then(responseAsJson => {
				setSongs(responseAsJson);
			})
			.catch(error => {
				//console.log(error);
			});
	}, []);
	//song = myList
	useEffect(() => {
		if (songs.length) {
			setMyList({ ...songs[0], position: 0 });
		}
	}, [songs]);
	//Next Song
	const nextSong = () => {
		let position = myList.position + 1;

		if (position < songs.length) {
			setMyList({
				...songs[position],
				position: position
			});
		} else {
			setMyList({
				...songs[0],
				position: 0
			});
		}
	};
	// Preview song
	const prevSong = () => {
		let position = myList.position - 1;

		if (position < 0) {
			setMyList({
				...songs[songs.length - 1],
				position: songs.length - 1
			});
		} else {
			setMyList({
				...songs[position],
				position: position
			});
		}
	};
	//List and onClick
	useEffect(() => {
		setListView(
			songs.map((song, index) => {
				return (
					<li
						key={index}
						onClick={() =>
							setMyList({ ...songs[index], position: index })
						}>
						{song.name}
					</li>
				);
			})
		);
	}, [myList]);

	return (
		<Fragment>
			<header className="h1"> My Spotify</header>
			<div className="container">
				<div>
					<ol>{listView}</ol>
					<div>{myList.name}</div>
					<audio
						id="musicplayer"
						src={Base_URL.concat(myList.url)}
						controls
						autoPlay
					/>
				</div>
				<div className="buttonPosition">
					<button
						type="button"
						className="bg-light border border-dark rounded-pill"
						onClick={prevSong}>
						<span>«</span>
					</button>

					<button
						type="button"
						className="bg-light border border-dark rounded-pill"
						onClick={nextSong}>
						<span>»</span>
					</button>
				</div>
			</div>
		</Fragment>
	);
};

export default MusicPlayer;
