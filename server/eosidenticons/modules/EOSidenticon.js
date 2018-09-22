
EOSidenticon = {
  accountName: () => { return window.JSEidenticonsAccountName || 'test' },
  height: () => { return window.JSEidenticonsHeight || 600 },
  width: () => { return window.JSEidenticonsWidth || 600 },
  
  indenticonPartsLoaded: 0,
  canvas: {},

  imageLoader: function(src) {
    const self = this;
    const img = new Image();
    img.onload = function() { self.checkImagesLoaded(); }
    img.src = src;
    return img;
  },

  generateIdenticonFiles: function() {
    const identiconParts = {};
    identiconParts['background'] = 9;
    identiconParts['legs'] = 6;
    identiconParts['arms'] = 8;
    identiconParts['neck'] = 3;
    identiconParts['hat'] = 9;
    identiconParts['body'] = 7;
    identiconParts['head'] = 8;
    identiconParts['eyes'] = 9;
    identiconParts['logo'] = 8;
  
    const identiconFiles = {};
  
    let charCount = 0;
    Object.keys(identiconParts).forEach((key) => {
      const account = this.accountName();
      const charCode = account.charCodeAt(charCount);
      let identCode = 1;
      let tmpCode = 0;
      while (tmpCode <= charCode) {
        identCode += 1; 
        tmpCode += 1;
        if (identCode > identiconParts[key]) { identCode = 1; }
      }
      identiconFiles[key] = this.imageLoader('http://eosidenticons.com/imgages/identicons/'+key+identCode+'.png');
      charCount ++;
    });
    return identiconFiles;
  },

  updateCanvas: function() {
    const ctx = this.canvas.getContext('2d');
    Object.keys(this.identiconFiles).forEach((key) => {
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(this.identiconFiles[key], 0, 0);
    });
  },

  checkImagesLoaded: function() {
    this.indenticonPartsLoaded +=1;
    if (this.indenticonPartsLoaded === Object.keys(this.identiconFiles).length) {
      console.log('Images loaded '+ this.indenticonPartsLoaded);
      this.updateCanvas();
    } else {
      console.log('Not loaded yet '+ this.indenticonPartsLoaded);
    }
  },

  render: function() {
    if (!document.getElementById("EOS-identicon")) {
      document.write('<div id="EOS-identicon"></div>');
    }
    const div = document.getElementById("EOS-identicon");

    this.canvas = document.createElement('canvas');
    this.canvas.id = "EOS-identicon-canvas";
    this.canvas.position = 'absolute';
    this.canvas.style.top = 0;
    this.canvas.width = this.width();
    this.canvas.height = this.height();
    this.canvas.style.border = "1px solid #CCC";

    div.appendChild(this.canvas);
    this.identiconFiles = this.generateIdenticonFiles();
    this.checkImagesLoaded();
  },
}

EOSidenticon.render();