<template>
  <div class="input-container">
    <div class="input-group color-picker-component">
      <div class="input-group color-picker" ref="colorpicker">
        <label>{{ label }}</label>
        <div class="inline">
          <input 
            readonly
            v-bind:class="{ error: dataError }"
            :value="value"
            :placeholder="placeholder"
            :type="type"
            :required="required"
            :error="dataError"
            class="form-control" 
            @focus="showPicker()" 
            @input="updateFromInput"/>
          <span class="input-group-addon color-picker-container">
            <span class="current-color" :style="'background-color: ' + value" @click="togglePicker()"><p class="color-value" >{{value}}</p></span>
            <div class="chrome-picker">
              <chrome-picker :value="colors" @input="updateFromPicker" v-if="displayPicker" />
            </div>
          </span>
        </div>
        <span v-if="dataError" class="errorMessage">{{ dataErrorMessage }}</span>
      </div>
    </div>
  </div>
  
</template>

<script>
  import { Chrome } from 'vue-color'
  export default {
    name: 'ColorPicker',
    props: {
      type: {
        type: String,
        default: "text"
      },
      label: String,
      placeholder: String,
      value: String,
      required: Boolean,
      autovalidate: Boolean
    },
    components: {
      'chrome-picker': Chrome
    },
	  data() {
		  return {
			  colors: {
				  hex: '#000000',
			  },
			  dataValue: this.value,
        displayPicker: false,
        dataError: false
		  }
	  },
	  methods: {
		  setColor(color) {
			  this.updateColors(color);
			  this.dataValue = color;
		  },
		  updateColors(color) {
			  if(color.slice(0, 1) == '#') {
				  this.colors = {
					  hex: color
				  };
			  }
			  else if(color.slice(0, 4) == 'rgba') {
				  var rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
					  hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
				  this.colors = {
					  hex: hex,
					  a: rgba[3],
				  }
        }
		  },
		  showPicker() {
			  document.addEventListener('click', this.documentClick);
			  this.displayPicker = true;
		  },
		  hidePicker() {
			  document.removeEventListener('click', this.documentClick);
			  this.displayPicker = false;
		  },
		  togglePicker() {
			  this.displayPicker ? this.hidePicker() : this.showPicker();
		  },
		  updateFromInput(e) {
        this.dataValue = e.target.value;
		  },
		  updateFromPicker(color) {
        this.colors = color;
			  if(color.rgba.a == 1) {
          this.dataValue = color.hex;
			  }
			  else {
          this.dataValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
        }
		  },
		  documentClick(e) {
			  var el = this.$refs.colorpicker,
				  target = e.target;
			  if(el !== target && !el.contains(target)) {
				  this.hidePicker()
			  }
      },
      validate() {
        if (this.required === true && this.dataValue === '') {
          this.dataError = true;
          this.dataErrorMessage = "This field is required and must be filled";
        } else {
          this.dataError = false;
          this.dataErrorMessage = "";
        }
        return this.dataError;
      }
	  },
	  watch: {
		  dataValue(val) {
			  if(val && val !== '') {
				  this.updateColors(val);
          this.$emit('input', val);
          this.$emit("touched");
          this.dataError = false;
			  }
      },
      value(newValue) {
        if (newValue === '') {
          this.dataValue = '';
        }
      }
	  }
  }
</script>

<style scoped lang="scss">

  .inline {
    display:flex;
    flex-direction:row;
  }

  .color-picker {
    padding-top: 16px;
    display: flex;
    flex-direction: column;

    &-container {
      position: relative;
    }

    label {
      margin-bottom: 10px;
      font-weight: 700;
      font-size: 14px;
    }

    input {
      flex-grow: 2;
      padding: 15px;
      box-sizing: border-box;
      background-color: white;
      border: none;
      height: 40px;
      border-radius: 3px 0px 0px 3px;
      border: 1px solid lightgrey;
      font-size: 14px;
      &::placeholder {
        font-size: 12px;
        font-weight: 500;
        color: grey;
      }
      &:focus {
        outline: none;
      }
      &.error {
        color: red;
        border: 1px solid red;
        &::placeholder {
          color: red;
        }
      }
    }
    .errorMessage {
      margin: 5px;
      color: red;
      font-size: 12px;
    }
  }

  .current-color {
    display: inline-block;
    width: 100px;
    height: 40px;
    background-color: #000;
    border-radius: 0px 3px 3px 0px;
    cursor: pointer;
  }

  .color-value{
    margin-top: 10px;
    margin-left: 16px;
    mix-blend-mode: difference;
    color:white;

  }

  .chrome-picker {
    position: absolute;
    right: 0;
    z-index: 100;
  }

</style>