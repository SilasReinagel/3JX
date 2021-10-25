<div class="loader">
  <div class="part">
    <div class="part">
      <div class="part">
        <div class="part">
          <div class="part"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.loader {
	 list-style: none;
	 padding: 0;
	 margin: 0;
	 color: #00d2ff;
	 position: absolute;
	 top: 50%;
	 left: 50%;
	 margin-top: -50px;
	 margin-left: -50px;
	 width: 100px;
	 height: 100px;
	 text-align: center;
	 animation: scale 3.5s ease;
}
 .loader:after {
	 content: '';
	 display: block;
	 position: absolute;
	 top: 0;
	 left: 0;
	 margin-top: -24px;
	 margin-left: -24px;
	 width: 140px;
	 height: 140px;
	 border-radius: 50%;
	 border: 2px solid;
	 animation: rotation-z 2s linear 0s infinite;
}
 .loader .part {
	 border-radius: 50%;
	 display: inline-block;
}
 .loader > .part {
	 box-sizing: border-box;
	 width: 100%;
	 height: 100%;
	 border: 5px solid transparent;
	 border-left: 5px solid;
	 animation: stop 3s cubic-bezier(.28,1.9,1,.9), rotation-left 2s linear 0s infinite forwards;
}
 .loader > .part > .part {
	 box-sizing: border-box;
	 width: 100%;
	 height: 100%;
	 border: 5px solid transparent;
	 border-left: 5px solid;
	 animation: stop 3s cubic-bezier(.28,1.9,1,.9), rotation-right 1s linear 0s infinite forwards;
}
 .loader > .part > .part > .part {
	 box-sizing: border-box;
	 width: 100%;
	 height: 100%;
	 border: 4px solid transparent;
	 border-left: 4px solid;
	 animation: stop 3s cubic-bezier(.28,1.9,1,.9), rotation-left 3s linear 0s infinite forwards;
}
 .loader > .part > .part > .part > .part {
	 box-sizing: border-box;
	 width: 100%;
	 height: 100%;
	 border: 3px solid transparent;
	 border-left: 3px solid;
	 animation: stop 3s cubic-bezier(.28,1.9,1,.9), rotation-right 10s linear 0s infinite forwards;
}
 .loader > .part > .part > .part > .part > .part {
	 box-sizing: border-box;
	 width: 100%;
	 height: 100%;
	 border: 3px solid transparent;
	 border-left: 3px solid;
	 animation: stop 3s cubic-bezier(.28,1.9,1,.9), rotation-left 1s linear 0s infinite forwards;
	 border-right: 3px solid;
}
 @keyframes scale {
	 0% {
		 transform: scale(1,1);
	}
	 50% {
		 transform: scale(1.5,1.5);
	}
	 100% {
		 transform: scale(1,1);
	}
}
 @keyframes stop {
	 from {
		 transform: rotate(360deg);
	}
	 to {
		 transform: rotate(0deg);
	}
}
 @keyframes rotation-z {
	 from {
		 transform: rotateY(0deg);
	}
	 to {
		 transform: rotateY(360deg);
	}
}
 @keyframes rotation-right {
	 from {
		 transform: rotate(0deg);
	}
	 to {
		 transform: rotate(360deg);
	}
}
 @keyframes rotation-left {
	 from {
		 transform: rotate(0deg);
	}
	 to {
		 transform: rotate(-360deg);
	}
}
</style>