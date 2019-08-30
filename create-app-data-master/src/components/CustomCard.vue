<template>
  <div class="card-container">
    <label>{{ label }}</label>
    <div class="card">
      <div class="color" :style="dataAppDColor">
        <div class="image-cropper">
          <img :src="dataSrc" alt="icon" />
        </div>
      </div>
      <div class="container">
        <p class="app-name">
          <b>{{ dataAppDName }}</b>
        </p>
        <p>{{ dataAppDCategory }}</p>
        <p><b>New App</b></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomCard",
  props: {
    appDName: String,
    appDCategory: String,
    src: String,
    appDColor: String,
    label: String
  },
  computed: {
    dataAppDName: function() {
      return this.appDName && this.appDName.length > 0
        ? this.appDName
        : "App Name";
    },
    dataAppDCategory: function() {
      return this.appDCategory && this.appDCategory.length > 0
        ? this.appDCategory
        : "App Category";
    },
    dataAppDColor: function() {
      const color =
        this.appDColor && this.appDColor.length > 0
          ? this.appDColor
          : "#000000";
      return `background-color: ${color}`;
    },
    dataSrc: function() {
      return this.src && this.src.length > 0
        ? this.src
        : "https://image.flaticon.com/icons/svg/458/458595.svg";
    }
  },
  watch: {}
};
</script>

<style>
.card {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background: white;
  width: 250px;
  margin: 16px 0px;
}

label {
  font-weight: 700;
  font-size: 14px;
}

.color {
  height: 150px;
  position: relative;
}

.image-cropper {
  background-color: #aaa;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.image-cropper img {
  position: absolute;
  bottom: 0;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.icon {
  max-height: 70%;
  max-width: 70%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
/* Add some padding inside the card container */
.container {
  padding: 8px 16px 0px 16px;
}

.container .app-name {
  font-size: 20px;
  margin: 0px;
}

.container p {
  font-size: 13px;
  margin-top: 4px;
}

@media (max-width: 1112px) {
  .card-container {
    width: 100%;
  }

  .card {
    height: 90px;
    width: 100%;
    flex-direction: row;
  }

  .color {
    width: 30%;
    height: 90px;
  }

  .image-cropper {
    width: 50px;
    height: 50px;
  }

  .container {
    width: 57%;
  }

  .container .app-name {
    margin: 4px 0;
  }

  .container p {
    margin: 8px 0px;
  }
}
</style>
