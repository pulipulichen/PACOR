import $ from 'jquery'

export default function (HTMLEditor) {
  HTMLEditor.methods.initEditor = function () {
    
    this.editor = $(this.$refs.editor)
    this.editor.summernote(this._summernoteOptions())

    //console.log(this.contents)
    if (typeof (this.contents) === 'string') {
      //console.log(this.contents)
      this.html(this.contents)
    }

    //$('<div class="editor-container"><div id="editor"><h1>Hello Summernote</h1></div></div>').appendTo('body')
    //$('#editor').summernote({
    //airMode: true
    //})
  }
  
  HTMLEditor.methods._summernoteOptionsToolbar = function () {
    //console.log({os: this.lib.style.detectOS})
    if (this.lib.style.detectIsIOS) {
      return []
    }
    else {
      return [
        // [groupName, [list of button]]
        ['list', ['ul', 'ol', 'indent', 'outdent']],
        ['insert', ['hr', 'link', 'picture', 'video']]
        
        /*
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['color', ['color']],
        ['para', ['ul', 'ol']],
        ['insert', ['link', 'picture', 'video']],
         */
      ]
    }
  }
  
  HTMLEditor.methods._summernoteOptionsEnableAirPopover = function () {
    if (this.lib.style.detectIsIOS) {
      return false
    }
    else {
      return true
    }
  }
  
  HTMLEditor.methods._summernoteOptions = function () {
    let options = {
      lang: this.config.locale,
      //airMode: true,
      toolbar: this._summernoteOptionsToolbar(),
      popover: {
        air: [
          ['font', ['forecolor', 'backcolor', 'bold', 'underline', 'clear']]
          //['font', ['bold', 'underline']]
        ]
      },
      enableAirPopover: this._summernoteOptionsEnableAirPopover(),
      enableStatusbar: false,
      toolbarAlign: 'center',
      toolbarCompact: true,
      //maxHeight: '5em',
      //disableDragAndDrop: true,
      callbacks: {
        onImageUpload: async (files) => {
          this._onImageUpload(files)
        },
        onChange: this._callbacksOnChange
      },
      // https://flatuicolors.com/palette/defo
      foreColors: [
        ["#2c3e50", "#7f8c8d", "#bdc3c7", "#8e44ad", "#2980b9"], 
        ["#c0392b", "#d35400", "#27ae60", "#16a085", "#f39c12"], 
      ],
      foreColorsName: [
        ["MIDNIGHT BLUE", "ASBESTOS", "SILVER", "WISTERIA", "POMERANATE"], 
        ["BELIZE HOLE", "PUMPKIN", "NEPHRITIS", "ORANGE", "GREEN SEA"], 
      ],
      backColors: [
        ["#34495e", "#95a5a6", "#ecf0f1", "#9b59b6", "#e74c3c"], 
        ["#3498db", "#e67e22", "#2ecc71", "#f1c40f", "#1abc9c"], 
      ],
      backColorsName: [
        ["WET ASPHALT", "CONCRETE", "CLOUDS", "AMETHYST", "ALIZARIN"], 
        ["PETER RIVER", "CARROT", "EMERALD", "SUN FLOWER", "TURQUOISE"], 
      ],
      enableCustomColors: false
    }
    
    if (typeof (this.placeholder) === 'string') {
      options.placeholder = this.placeholder
    }
    
    return options
  }
}