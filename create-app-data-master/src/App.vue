<template>
  <div id="app">
    <div class="base-card">
      <div class="close-button">
        <button @click="handleClose">X</button>
      </div>
      <div class="left">
        <h3>Create Your App</h3>
        <CustomInput
          v-model="appName"
          label="APP NAME"
          type="text"
          placeholder="Enter App Display Name"
          required
          ref="appName"
          @touched="dirtyForm = true"
        />

        <CustomFile 
          v-model="appFile"
          label="APP ICON"
          type="text"
          :placeholder="file_placeholder"
          required
          @payload="appFilePayload = $event"
          @touched="dirtyForm = true"
          ref="appFilePayload"/>

        <CustomColor 
          v-model="appColor"
          label="ICON'S BACKGROUND COLOR"
          type="text"
          placeholder="Pick a Color"
          required
          ref="appColor"
          @touched="dirtyForm = true"
        />

        <CustomSelect 
          v-model="appCategory"
          label="CATEGORY"
          required
          ref="appCategory"
          :categories="categories"
          @touched="dirtyForm = true"
        />
      </div>
      <div class="right">
        <CustomCard 
          :appDName="appName"
          :src="appFilePayload"
          :appDColor="appColor"
          :appDCategory="dataAppCategory"
          label="APP'S CARD PREVIEW"
        />
        <button @click="submit">SAVE APP</button>
      </div>
    </div>
    <CustomModal
      :Title="modal_title"
      :Message="modal_message"
      :Option="modal_option"
      v-show="isModalVisible"
      @close="closeModal(true)"
      @back="closeModal(false)"
    />
  </div>
</template>

<script>
import CustomInput from "./components/CustomInput.vue";
import CustomSelect from "./components/CustomSelect.vue";
import CustomColor from "./components/CustomColor.vue";
import CustomFile from "./components/CustomFile.vue";
import CustomCard from "./components/CustomCard.vue";

export default {
  name: "app",
  components: {
    CustomInput,
    CustomSelect,
    CustomColor,
    CustomFile,
    CustomCard
  },
  data() {
    return {
      appName: '',
      appCategory: '',
      appColor: '',
      appFile: '',
      appFilePayload: '',
      dataFormFields: [],
      categories:[
            {value: 1, text: 'Finance'},
            {value: 2, text: 'Educational'},
            {value: 3, text: 'Finance'}
          ],
      dirtyForm: false,
      file_placeholder: window.innerWidth > 1112 ? 'Drag an Image here to upload' : 'Select a File'
    };
  },
  computed: {
    dataAppCategory: function() {
      if (this.categories && this.categories.length > 0) {
        const categ = this.categories.find(category => category.value === parseInt(this.appCategory));
        if (categ) {
          return categ.text;
        }
      } 

      return '';
    }
  },
  methods: {
    handleClose() {
      if (this.dirtyForm === true) {
        this.$swal({
          title: "Are you sure?",
          text: "You have unsaved data. If you leave all data will be lost. Are you sure you want to leave?",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes Delete it!",
          cancelButtonText: "No, Keep it!",
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            this.resetData();
          } 
        })
      } else {
        this.$swal("Canceled", "You left without create any new application", "OK");
      }
    },
    submit() {
      let validForm = true;
      const data = {};
      for (let key in this.$refs) {
        const currentFieldValid = !this.$refs[key].validate();
        validForm = validForm && currentFieldValid;
        data[key] = this[key];
      }
      if (validForm === true) {
        this.$swal({
          title: "Success!",
          text: "The App is saved!",
          type: "success", 
          showCancelButton: false,
          confirmButtonText: "U-huu!",
          showCloseButton: true,
          showLoaderOnConfirm: true});
        this.file_placeholder = window.innerWidth > 1112 ? 'Drag an Image here to upload' : 'Select a File' 
        console.log("This is the data to be sent => ", data);
        console.log("In JSON => ", JSON.stringify(data));
        this.resetData();
      } else {
        console.log("The form has errors");
      }
    },
    closeModal(reset) {
      this.isModalVisible = false;
      if (reset === true) {
        this.resetData();
      }
    },
    resetData(){
      this.appName = '';
      this.appCategory = '';
      this.appColor = '';
      this.appFile = '';
      this.appFilePayload = '';
      this.dirtyForm = false;
    }
  }
};
</script>

<style lang="scss">

  body {
    margin: 0;
    padding: 0;
    background-color: lightgray;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    h3 {
      margin: 0 0 24px 0;
    }

    .base-card {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      padding: 50px;
      width: 65%;
      background-color: whitesmoke;
      border: 1px solid rgba(0, 0, 0, 0.4);
      border-radius: 3px;
    }

    .left {
      width: 50%;
      padding-right: 90px;
    }

    .right {
      padding: 48px 0 0 20px;
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;

      button {
        border-radius: 5px;
        height: 44px;
        background: grey;
        color: white;
        font-weight: 900;
        width: 140px;
        font-size: 14px;
        outline: none;
        cursor: pointer;
      }
    }

    .close-button {
      position: absolute;
      top: 16px;
      right: 16px;

      button {
        font-weight: 900;
        color: black;
        font-size: 24px;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        &:hover {
          border-radius: 50%;
          box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  @media(max-width: 1112px) {
    body {
      background: whitesmoke;
    }

    #app {
      height: 100%;

      .base-card {
        width: 100%;
        height: 100%;
        border: none;
      }

      .left{
        width: 100%;
        padding-right: 0px;
      }

      .close-button {
        right: 36px;
      }

      .right{
        position: fixed;
        bottom: 10%;
        background: whitesmoke;
        width:83%;
        padding:0px;
        padding-top: 16px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        border-left: none;

        button {
          width: 100%;
        }
      }
    }
  }

</style>
