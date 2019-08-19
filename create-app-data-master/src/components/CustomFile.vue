<template>
  <div>
    <div class="file-container" v-if="!image">
      <label>{{ label }}</label>
      <div class="input-group">
        <input type="text"  
          @dragover="handleDragAndDrop" 
          @dragenter="handleDragAndDrop"  
          @dragleave="handleDragAndDrop($event, true)" 
          @drop="onFileChange" 
          v-bind:class="{ error: dataError }" 
          :placeholder="dataPlaceholder" 
          :value="dataFileName" 
          readonly>
        <span class="input-group-btn">
          <button class="file-button" type="button" @click="launchFilePicker">SELECT A FILE</button>
        </span>
      </div>
      <input type="file" :value="filePayload" @input="onFileChange" ref="file" style="display:none"/>  
      <span v-if="dataError" class="errorMessage">{{ dataErrorMessage }}</span> 
    </div>
    <div class="file-container" v-else>
      <img :src="image" />
      <button @click="removeImage">Remove image</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomFile",
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
  watch: {
    value: function(newValue) {
      this.dataFileName = newValue;
      if (newValue === '') {
        this.filePayload = '';
      }
    }
  },
  data() {
    return {
      filePayload: '',
      dataFileName: this.value,
      image: '',
      file: '',
      dataError: false,
      dataPlaceholder: this.placeholder
    };
  },
  methods: {
    async onFileChange(e) {
      e.preventDefault();
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;

      this.dataFileName = files[0].name;
      const imageAsDataURL = await this.createImage(files[0]);
      this.$emit('input', this.dataFileName);
      this.$emit('payload', imageAsDataURL);
      this.$emit("touched");
      this.dataError = false;
    },
    createImage(file) {
      return new Promise((resolve, reject) => {
        let fr = new FileReader();
        fr.onload = x=> resolve(fr.result);
        fr.readAsDataURL(file)
      });
    },
    validate() {
      if (this.required === true && this.dataFileName === "") {
        this.dataError = true;
        this.dataErrorMessage = "This field is required and must be filled";
      } else {
        this.dataError = false;
        this.dataErrorMessage = "";
      }

      return this.dataError;
    },
    launchFilePicker() {
      this.$refs.file.click();
    },
    handleDragAndDrop(event, exit = false) {
      this.dataPlaceholder = exit ? this.placeholder : 'Release the image to complete the upload';
      event.preventDefault();
    }
  }
}
</script>

<style scoped lang="scss">

  .file-container {
    padding-top: 16px;
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 10px;
      font-weight: 700;
      font-size: 14px; 
    }

    &.error {
        color: red;
        border: 1px solid red;
        &::placeholder {
          color: red;
        }
    }

    input {
      padding: 15px;
      box-sizing: border-box;
      background-color: white;
      border: none;
      height: 40px;
      border-radius: 3px;
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

  .input-group {

    position: relative;
    
    input {
      padding: 15px;
      box-sizing: border-box;
      background-color: white;
      border: none;
      height: 60px;
      border-radius: 3px;
      border: 1px solid lightgrey;
      font-size: 14px;
      width: 100%;
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

    .file-button{
      font-weight: 700;
      background-color: grey;
      color: white;
      height: 42px;
      width: 130px;
      border-radius: 4px;
      position: absolute;
      top: 10px;
      right: 10px;
    }   
  }

  @media(max-width: 600px) {
    .input-group {
      input {
        width: 58%;
        height: 40px;
      }

      .file-button{
        position: relative;
        width: 40%;
        top: 0px;
        right: -5px;
      }
    }
  }   

</style>