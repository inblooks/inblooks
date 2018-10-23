class Titlescreen{
	constructor(){
		loader.changePage("titlescreen")
		this.titleScreen = document.getElementById("title-screen")
		pageEvents.keyAdd(this, "all", "down", this.keyDown.bind(this))
		pageEvents.add(this.titleScreen, ["mousedown", "touchstart"], this.onPressed.bind(this))
		assets.sounds["title"].play()
		this.gamepad = new Gamepad({
			"13": ["a", "b", "x", "y", "start", "ls", "rs"]
		}, pressed => {
			if(pressed){
				this.onPressed()
			}
		})
	}
	keyDown(event, code){
		if(!code){
			code = event.keyCode
		}
		if(code == 13 || code == 32 || code == 70 || code == 74){
			// Enter, Space, F, J
			this.onPressed()
		}
	}
	onPressed(event){
		if(event){
			if(event.type === "touchstart"){
				event.preventDefault()
				this.touched = true
			}else if(event.type === "mousedown" && event.which !== 1){
				return
			}
		}
		this.titleScreen.style.cursor = "auto"
		this.clean()
		assets.sounds["don"].play()
		setTimeout(this.goNext.bind(this), 500)
	}
	goNext(){
		if(this.touched || localStorage.getItem("tutorial") === "true"){
			new SongSelect(false, false, this.touched)
		}else{
			new Tutorial()
		}
	}
	clean(){
		this.gamepad.clean()
		assets.sounds["title"].stop()
		pageEvents.keyRemove(this, "all")
		pageEvents.remove(this.titleScreen, ["mousedown", "touchstart"])
		delete this.titleScreen
	}
}
