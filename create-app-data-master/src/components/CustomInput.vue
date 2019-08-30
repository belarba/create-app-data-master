<template>
  <div class="input-container">
    <label>{{ label }}</label>
    <input
      id="customInput"
      v-bind:class="{ error: dataError }"
      :value="value"
      @input="handleInput"
      @blur="handleBlur"
      :placeholder="placeholder"
      :type="type"
      :required="required"
      :error="dataError"
    />
    <span v-if="dataError" class="errorMessage">{{ dataErrorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: "CustomInput",
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
  data() {
    return {
      text: "",
      dataError: false,
      dataErrorMessage: ""
    };
  },
  watch: {
    error: function(newValue) {
      this.dataError = newValue;
    }
  },
  methods: {
    handleInput(e) {
      this.dataError = false;
      this.$emit("input", e.target.value);
      this.$emit("touched");
    },
    handleBlur() {
      if (this.autovalidate === true) {
        this.validate();
      }
    },
    validate() {
      if (this.required === true && this.value === "") {
        this.dataError = true;
        this.dataErrorMessage = "This field is required and must be filled";
      } else {
        this.dataError = false;
        this.dataErrorMessage = "";
      }

      return this.dataError;
    }
  }
};
</script>

<style scoped lang="scss">
.input-container {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 14px;
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
  .errorMessage {
    margin: 5px;
    color: red;
    font-size: 12px;
  }
}
</style>
